import React, { useState, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { CopyButton } from './SeedGenerator';

const styles = {
  container: {
    padding: '1rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  codeHint: {
    margin: '0.25rem 0 0.5rem',
    fontSize: '0.875rem',
    color: 'var(--ifm-color-emphasis-600)',
    fontFamily: 'monospace',
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid var(--ifm-color-emphasis-300)',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  error: {
    color: 'var(--ifm-color-danger)',
    fontSize: '0.875rem',
    margin: '0.5rem 0',
  },
  resultRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  codeBlock: {
    flex: 1,
    display: 'block',
    padding: '0.75rem',
    backgroundColor: 'var(--ifm-color-emphasis-100)',
    borderRadius: '4px',
    wordBreak: 'break-all' as const,
  },
} as const;

function AddressConverterInner() {
  const [publicKeyInput, setPublicKeyInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [publicKeyResult, setPublicKeyResult] = useState<string | null>(null);
  const [addressResult, setAddressResult] = useState<string | null>(null);
  const [publicKeyError, setPublicKeyError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  const convertPublicKeyToAddress = useCallback(async () => {
    setPublicKeyError(null);
    setAddressResult(null);
    try {
      const { AttoAddress, AttoAlgorithm, AttoPublicKey, fromHexToByteArray } = await import('@attocash/commons-js');
      const bytes = fromHexToByteArray(publicKeyInput.trim());
      const publicKey = new AttoPublicKey(bytes);
      const address = new AttoAddress(AttoAlgorithm.V1, publicKey);
      setAddressResult(address.toString());
    } catch (error) {
      setPublicKeyError(`Invalid public key: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [publicKeyInput]);

  const convertAddressToPublicKey = useCallback(async () => {
    setAddressError(null);
    setPublicKeyResult(null);
    try {
      const { AttoAddress, toHex } = await import('@attocash/commons-js');
      const address = AttoAddress.parse(addressInput.trim());
      setPublicKeyResult(toHex(address.publicKey.value));
    } catch (error) {
      setAddressError(`Invalid address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [addressInput]);

  const isPublicKeyValid = publicKeyInput.trim().length > 0;
  const isAddressValid = addressInput.trim().length > 0;

  return (
    <div style={styles.container}>
      {/* Public Key to Address */}
      <div style={styles.section}>
        <h4>Public Key → Address</h4>
        <p style={styles.codeHint}>
          new AttoAddress(AttoAlgorithm.V1, new AttoPublicKey(fromHexToByteArray(publicKey))).toString()
        </p>
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Enter public key (hex)"
            value={publicKeyInput}
            onChange={(e) => setPublicKeyInput(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={convertPublicKeyToAddress}
            disabled={!isPublicKeyValid}
            style={{
              ...styles.button,
              cursor: isPublicKeyValid ? 'pointer' : 'not-allowed',
              opacity: isPublicKeyValid ? 1 : 0.7,
            }}
          >
            Convert
          </button>
        </div>
        {publicKeyError && <p style={styles.error}>{publicKeyError}</p>}
        {addressResult && (
          <div style={styles.resultRow}>
            <code style={styles.codeBlock}>{addressResult}</code>
            <CopyButton text={addressResult} />
          </div>
        )}
      </div>

      {/* Address to Public Key */}
      <div>
        <h4>Address → Public Key</h4>
        <p style={styles.codeHint}>toHex(AttoAddress.parse(address).publicKey)</p>
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Enter address (atto://...)"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            style={styles.input}
          />
          <button
            onClick={convertAddressToPublicKey}
            disabled={!isAddressValid}
            style={{
              ...styles.button,
              cursor: isAddressValid ? 'pointer' : 'not-allowed',
              opacity: isAddressValid ? 1 : 0.7,
            }}
          >
            Convert
          </button>
        </div>
        {addressError && <p style={styles.error}>{addressError}</p>}
        {publicKeyResult && (
          <div style={styles.resultRow}>
            <code style={styles.codeBlock}>{publicKeyResult}</code>
            <CopyButton text={publicKeyResult} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AddressConverter() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <AddressConverterInner />}
    </BrowserOnly>
  );
}
