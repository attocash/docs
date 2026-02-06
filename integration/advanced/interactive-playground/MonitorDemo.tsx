import React, { useState, useCallback, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { CopyButton } from './SeedGenerator';

const styles = {
  container: {
    padding: '1rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  codeHint: {
    margin: '0.25rem 0 0.5rem',
    fontSize: '0.875rem',
    color: 'var(--ifm-color-emphasis-600)',
    fontFamily: 'monospace',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '0.75rem',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    borderRadius: '4px',
    border: '1px solid var(--ifm-color-emphasis-300)',
    resize: 'vertical' as const,
  },
  buttonRow: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem',
  },
  primaryButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  dangerButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--ifm-color-danger)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--ifm-color-emphasis-200)',
    color: 'var(--ifm-color-content)',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorBox: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: 'var(--ifm-color-danger-lightest)',
    color: 'var(--ifm-color-danger-darkest)',
    borderRadius: '4px',
    fontSize: '0.875rem',
  },
  logsContainer: {
    maxHeight: '300px',
    overflowY: 'auto' as const,
    padding: '0.75rem',
    backgroundColor: 'var(--ifm-color-emphasis-100)',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.75rem',
  },
} as const;

interface MonitorRefs {
  accountMonitor: { close?: () => void };
  transactionMonitor: { close?: () => void };
  accountEntryMonitor: { close?: () => void };
}

function MonitorDemoInner() {
  const [addresses, setAddresses] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const monitorRefs = useRef<MonitorRefs | null>(null);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 100));
  }, []);

  const startMonitoring = useCallback(async () => {
    setError(null);
    setLogs([]);

    const addressList = addresses
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    if (addressList.length === 0) {
      setError('Please enter at least one address');
      return;
    }

    try {
      const {
        AttoAccountMonitorAsyncBuilder,
        AttoAccountEntryMonitorAsyncBuilder,
        AttoTransactionMonitorAsyncBuilder,
        AttoNodeClientAsyncBuilder,
        AttoAddress,
        AttoHeight,
        transactionToJson,
        accountEntryToJson,
      } = await import('@attocash/commons-js');

      // Validate addresses
      const parsedAddresses: InstanceType<typeof AttoAddress>[] = [];
      for (const addr of addressList) {
        try {
          parsedAddresses.push(AttoAddress.parse(addr));
        } catch {
          setError(`Invalid address: ${addr}`);
          return;
        }
      }

      addLog(`Starting monitors for ${parsedAddresses.length} address(es)...`);

      // Create node client
      const nodeClient = new AttoNodeClientAsyncBuilder('https://gatekeeper.live.application.atto.cash').build();

      // Create account monitor
      const accountMonitor = new AttoAccountMonitorAsyncBuilder(nodeClient).build();

      // Create transaction monitor
      const transactionMonitor = new AttoTransactionMonitorAsyncBuilder(nodeClient, accountMonitor)
        .heightProvider(async () => AttoHeight.MIN)
        .build();

      // Create account entry monitor
      const accountEntryMonitor = new AttoAccountEntryMonitorAsyncBuilder(nodeClient, accountMonitor)
        .heightProvider(async () => AttoHeight.MIN)
        .build();

      // Register callbacks
      transactionMonitor.onTransaction(
        async (transaction: unknown) => {
          addLog(`📤 Transaction: ${transactionToJson(transaction)}`);
        },
        async (err: Error | null) => {
          if (err) addLog(`❌ Transaction error: ${err.message}`);
        }
      );

      accountEntryMonitor.onAccountEntry(
        async (entry: unknown) => {
          addLog(`📊 Account Entry: ${accountEntryToJson(entry)}`);
        },
        async (err: Error | null) => {
          if (err) addLog(`❌ Account entry error: ${err.message}`);
        }
      );

      // Start monitoring addresses
      for (const addr of parsedAddresses) {
        accountMonitor.monitorAddress(addr);
        addLog(`👁️ Monitoring: ${addr.toString()}`);
      }

      monitorRefs.current = { accountMonitor, transactionMonitor, accountEntryMonitor };
      setIsMonitoring(true);
      addLog('✅ Monitors started successfully');

    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(`Failed to start monitors: ${message}`);
      console.error(e);
    }
  }, [addresses, addLog]);

  const stopMonitoring = useCallback(() => {
    if (monitorRefs.current) {
      try {
        monitorRefs.current.accountMonitor?.close?.();
        monitorRefs.current.transactionMonitor?.close?.();
        monitorRefs.current.accountEntryMonitor?.close?.();
      } catch (e) {
        console.error('Error closing monitors:', e);
      }
    }
    monitorRefs.current = null;
    setIsMonitoring(false);
    addLog('🛑 Monitors stopped');
  }, [addLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddresses(e.target.value);
  }, []);

  return (
    <div style={styles.container}>
      <h4 style={{ marginTop: 0 }}>Addresses to Monitor</h4>
      <p style={styles.codeHint}>accountMonitor.monitorAddress(AttoAddress.parse(address))</p>
      <textarea
        value={addresses}
        onChange={handleAddressChange}
        placeholder={'Enter Atto addresses (one per line)\natto://...'}
        disabled={isMonitoring}
        style={{
          ...styles.textarea,
          backgroundColor: isMonitoring ? 'var(--ifm-color-emphasis-100)' : 'var(--ifm-background-color)',
        }}
      />

      {error && <div style={styles.errorBox}>{error}</div>}

      <div style={styles.buttonRow}>
        {!isMonitoring ? (
          <button onClick={startMonitoring} style={styles.primaryButton}>
            Start Monitoring
          </button>
        ) : (
          <button onClick={stopMonitoring} style={styles.dangerButton}>
            Stop Monitoring
          </button>
        )}
        <button onClick={clearLogs} style={styles.secondaryButton}>
          Clear Logs
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h4 style={{ display: 'flex', alignItems: 'center' }}>
          Monitor Logs
          {logs.length > 0 && <CopyButton text={logs.join('\n')} />}
        </h4>
        <div style={styles.logsContainer}>
          {logs.length === 0 ? (
            <span style={{ color: 'var(--ifm-color-emphasis-500)' }}>
              No logs yet. Enter addresses and click "Start Monitoring" to begin.
            </span>
          ) : (
            logs.map((log, i) => (
              <div key={i} style={{ marginBottom: '0.25rem', wordBreak: 'break-all' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function MonitorDemo() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <MonitorDemoInner />}
    </BrowserOnly>
  );
}
