import React, { useState, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const styles = {
  container: {
    padding: '1rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  codeBlock: {
    display: 'block',
    padding: '0.75rem',
    backgroundColor: 'var(--ifm-color-emphasis-100)',
    borderRadius: '4px',
    wordBreak: 'break-all' as const,
  },
  codeHint: {
    margin: '0.25rem 0 0.5rem',
    fontSize: '0.875rem',
    color: 'var(--ifm-color-emphasis-600)',
    fontFamily: 'monospace',
  },
  indexInput: {
    width: '80px',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    border: '1px solid var(--ifm-color-emphasis-300)',
  },
} as const;

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      style={{
        marginLeft: '0.5rem',
        padding: '0.25rem 0.5rem',
        fontSize: '0.75rem',
        backgroundColor: copied ? 'var(--ifm-color-success)' : 'var(--ifm-color-emphasis-200)',
        color: copied ? 'white' : 'var(--ifm-color-content)',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function SeedGeneratorInner() {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [keyIndex, setKeyIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentSeed, setCurrentSeed] = useState<Uint8Array | null>(null);

  const generateSeed = useCallback(async () => {
    setLoading(true);
    try {
      const { AttoMnemonic, AttoAddress, AttoAlgorithm, toSeedAsync, toAttoIndex, toPrivateKey, toPublicKey, toHex } = await import('@attocash/commons-js');

      const newMnemonic = AttoMnemonic.generate();
      setMnemonic(newMnemonic.phrase);

      const parsedMnemonic = AttoMnemonic.fromPhrase(newMnemonic.phrase);
      const newSeed = await toSeedAsync(parsedMnemonic);
      setSeed(toHex(newSeed.value));
      setCurrentSeed(newSeed.value);

      const index = toAttoIndex(keyIndex);
      const generatedPrivateKey = toPrivateKey(newSeed, index);
      setPrivateKey(toHex(generatedPrivateKey.value));

      const generatedPublicKey = toPublicKey(generatedPrivateKey);
      setPublicKey(toHex(generatedPublicKey.value));

      const generatedAddress = new AttoAddress(AttoAlgorithm.V1, generatedPublicKey);
      setAddress(generatedAddress.toString());
    } catch (error) {
      console.error('Error generating seed:', error);
    } finally {
      setLoading(false);
    }
  }, [keyIndex]);

  const updatePrivateKey = useCallback(async (newIndex: number) => {
    if (!currentSeed) return;
    try {
      const { AttoSeed, AttoAddress, AttoAlgorithm, toAttoIndex, toPrivateKey, toPublicKey, toHex } = await import('@attocash/commons-js');
      const seedObj = new AttoSeed(currentSeed);
      const index = toAttoIndex(newIndex);
      const generatedPrivateKey = toPrivateKey(seedObj, index);
      setPrivateKey(toHex(generatedPrivateKey.value));

      const generatedPublicKey = toPublicKey(generatedPrivateKey);
      setPublicKey(toHex(generatedPublicKey.value));

      const generatedAddress = new AttoAddress(AttoAlgorithm.V1, generatedPublicKey);
      setAddress(generatedAddress.toString());

      setKeyIndex(newIndex);
    } catch (error) {
      console.error('Error updating private key:', error);
    }
  }, [currentSeed]);

  const handleIndexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updatePrivateKey(Math.max(0, parseInt(e.target.value) || 0));
  }, [updatePrivateKey]);

  return (
    <div style={styles.container}>
      <button
        onClick={generateSeed}
        disabled={loading}
        style={{
          ...styles.button,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Generating...' : 'Generate Seed'}
      </button>

      {mnemonic && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center' }}>
            Mnemonic Phrase
            <CopyButton text={mnemonic} />
          </h4>
          <p style={styles.codeHint}>AttoMnemonic.generate().phrase</p>
          <code style={styles.codeBlock}>{mnemonic}</code>
        </div>
      )}

      {seed && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center' }}>
            Seed
            <CopyButton text={seed} />
          </h4>
          <p style={styles.codeHint}>toHex(toSeedAsync(mnemonic).value)</p>
          <code style={styles.codeBlock}>{seed}</code>
        </div>
      )}

      {privateKey && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center' }}>
            Private Key
            <CopyButton text={privateKey} />
          </h4>
          <p style={styles.codeHint}>toHex(toPrivateKey(seed, toAttoIndex({keyIndex})).value)</p>
          <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="keyIndex">Index:</label>
            <input
              id="keyIndex"
              type="number"
              min="0"
              value={keyIndex}
              onChange={handleIndexChange}
              style={styles.indexInput}
            />
          </div>
          <code style={styles.codeBlock}>{privateKey}</code>
        </div>
      )}

      {publicKey && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center' }}>
            Public Key
            <CopyButton text={publicKey} />
          </h4>
          <p style={styles.codeHint}>toHex(toPublicKey(privateKey).value)</p>
          <code style={styles.codeBlock}>{publicKey}</code>
        </div>
      )}

      {address && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center' }}>
            Address
            <CopyButton text={address} />
          </h4>
          <p style={styles.codeHint}>new AttoAddress(AttoAlgorithm.V1, publicKey).toString()</p>
          <code style={styles.codeBlock}>{address}</code>
        </div>
      )}
    </div>
  );
}

export default function SeedGenerator() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <SeedGeneratorInner />}
    </BrowserOnly>
  );
}
