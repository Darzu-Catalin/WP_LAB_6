import React, { useEffect, useState } from 'react';
import { ShieldCheck, KeyRound, RefreshCw, Play, Copy, Check, AlertTriangle, Clock } from 'lucide-react';
import {
  decodeToken,
  getRawToken,
  getTokenRemainingMs,
  getRole,
  getPermissions,
  requestDemoToken,
  switchRole,
  probeEndpoint,
  onAuthChange,
} from '../services/configService';

const ROLES = ['ADMIN', 'WRITER', 'VISITOR'];

const ROLE_COLORS = {
  ADMIN: { bg: 'rgba(239,68,68,0.12)', fg: 'var(--red)', border: 'var(--red)' },
  WRITER: { bg: 'rgba(79,70,229,0.12)', fg: 'var(--accent)', border: 'var(--accent)' },
  VISITOR: { bg: 'rgba(16,185,129,0.12)', fg: 'var(--green)', border: 'var(--green)' },
};

const ENDPOINTS = [
  { id: 'list', label: 'GET /configs', method: 'GET', path: '/configs?skip=0&limit=5', requires: 'READ' },
  { id: 'create', label: 'POST /configs', method: 'POST', path: '/configs', body: { name: 'demo-config', components: [] }, requires: 'WRITE' },
  { id: 'delete', label: 'DELETE /configs/{id}', method: 'DELETE', path: '/configs/demo-id-does-not-exist', requires: 'DELETE' },
  { id: 'me', label: 'GET /me', method: 'GET', path: '/me', requires: 'auth' },
];

function formatRemaining(ms) {
  if (ms <= 0) return '0:00';
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function JsonBlock({ value }) {
  return (
    <pre style={{
      margin: 0,
      padding: '12px 14px',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      fontSize: '12px',
      lineHeight: 1.55,
      color: 'var(--text)',
      overflow: 'auto',
      maxHeight: '280px',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}>
      {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
    </pre>
  );
}

function Pill({ children, color = 'var(--accent)', bg = 'var(--accent-faint)' }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color,
      background: bg,
      border: `1px solid ${color}`,
      borderRadius: '999px',
    }}>
      {children}
    </span>
  );
}

export default function Permissions() {
  const [, setTick] = useState(0);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({});
  const [copied, setCopied] = useState(false);

  // Re-render when auth state changes or token ticks down.
  useEffect(() => {
    const unsub = onAuthChange(() => setTick((n) => n + 1));
    const interval = setInterval(() => setTick((n) => n + 1), 1000);
    return () => { unsub(); clearInterval(interval); };
  }, []);

  const decoded = decodeToken();
  const role = getRole();
  const perms = getPermissions();
  const remaining = getTokenRemainingMs();
  const raw = getRawToken();

  const handleDemoToken = async (r) => {
    setBusy(`demo-${r}`); setError(null);
    try { await requestDemoToken(r); } catch (e) { setError(e.message); }
    finally { setBusy(null); }
  };
  const handleSwitchRole = async (r) => {
    setBusy(`switch-${r}`); setError(null);
    try { await switchRole(r); } catch (e) { setError(e.message); }
    finally { setBusy(null); }
  };
  const handleProbe = async (ep) => {
    setBusy(`probe-${ep.id}`); setError(null);
    const res = await probeEndpoint(ep.method, ep.path, ep.body);
    setResults((prev) => ({ ...prev, [ep.id]: res }));
    setBusy(null);
  };
  const handleCopy = () => {
    if (!raw) return;
    navigator.clipboard.writeText(raw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const tokenExpired = remaining <= 0;
  const roleColor = role ? ROLE_COLORS[role] : null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 64px' }}>
      <header style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <ShieldCheck size={22} strokeWidth={2} style={{ color: 'var(--accent)' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
            Permissions & JWT Demo
          </h1>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
          Inspect the live JWT, switch roles, and exercise the backend so you can see permission checks fire in real time.
        </p>
      </header>

      {error && (
        <div style={{
          padding: '10px 14px', marginBottom: '16px',
          background: 'var(--red-faint)', border: '1px solid var(--red)',
          borderRadius: 'var(--radius)', color: 'var(--red)', fontSize: '13px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <AlertTriangle size={15} /> {error}
        </div>
      )}

      {/* Current identity */}
      <section style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <KeyRound size={18} style={{ color: 'var(--text-secondary)' }} />
            <strong style={{ fontSize: '14px', color: 'var(--text)' }}>Current identity</strong>
            {role && roleColor && (
              <Pill color={roleColor.fg} bg={roleColor.bg}>{role}</Pill>
            )}
            {decoded?.demo && <Pill color="var(--amber)" bg="rgba(245,158,11,0.12)">demo token</Pill>}
            {!role && <Pill color="var(--text-muted)" bg="var(--surface-2)">no token</Pill>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokenExpired ? 'var(--red)' : 'var(--text-secondary)', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }}>
            <Clock size={14} />
            <span>{tokenExpired ? 'expired' : `expires in ${formatRemaining(remaining)}`}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Permissions in JWT</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {perms.length ? perms.map((p) => (
                <Pill key={p}>{p}</Pill>
              )) : <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>None</span>}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Subject</p>
            <p style={{ fontSize: '13px', color: 'var(--text)', margin: 0, fontFamily: 'ui-monospace, monospace' }}>
              {decoded?.username || decoded?.userId || '—'}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>Token lifetime</p>
            <div style={{ height: '8px', background: 'var(--surface-2)', borderRadius: '999px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{
                height: '100%',
                width: `${Math.max(0, Math.min(100, (remaining / 60000) * 100))}%`,
                background: tokenExpired ? 'var(--red)' : 'var(--accent)',
                transition: 'width 0.4s ease',
              }} />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '6px 0 0' }}>1 minute total (assignment requirement)</p>
          </div>
        </div>
      </section>

      {/* Role controls */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Swap role on this account</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
            Calls <code>POST /demo/switch-role</code> — keeps your userId, replaces role &amp; permissions in a fresh JWT.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => handleSwitchRole(r)}
                disabled={busy === `switch-${r}` || !raw}
                style={{
                  padding: '8px 14px', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  background: role === r ? 'var(--accent)' : 'var(--btn)',
                  color: role === r ? '#fff' : 'var(--text)',
                  border: `1px solid ${role === r ? 'var(--accent)' : 'var(--border)'}`,
                  opacity: !raw ? 0.5 : 1,
                }}
              >
                {busy === `switch-${r}` ? '…' : r}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 4px', color: 'var(--text)' }}>Issue a demo token (anonymous)</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 14px' }}>
            Calls <code>POST /token</code> — replaces your session with a shared "demo-&lt;role&gt;" identity. Useful for testing unauthenticated flow.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => handleDemoToken(r)}
                disabled={busy === `demo-${r}`}
                style={{
                  padding: '8px 14px', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  background: 'var(--btn)', color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
              >
                {busy === `demo-${r}` ? '…' : `Get ${r} token`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoint tester */}
      <section style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 2px', color: 'var(--text)' }}>Try the API</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
              Each button fires a real request with the current JWT. Watch status codes change as you swap roles.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {ENDPOINTS.map((ep) => {
            const r = results[ep.id];
            const requiredOk = ep.requires === 'auth' ? !!raw : (role === 'ADMIN' || perms.includes(ep.requires));
            return (
              <div key={ep.id} style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '12px',
                background: 'var(--surface-2)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <code style={{ fontSize: '12px', color: 'var(--text)' }}>{ep.label}</code>
                  <Pill color={requiredOk ? 'var(--green)' : 'var(--red)'} bg={requiredOk ? 'var(--green-faint)' : 'var(--red-faint)'}>
                    needs {ep.requires}
                  </Pill>
                </div>
                <button
                  onClick={() => handleProbe(ep)}
                  disabled={busy === `probe-${ep.id}`}
                  style={{
                    padding: '6px 12px', borderRadius: 'var(--radius)', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    background: 'var(--accent)', color: '#fff', border: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  {busy === `probe-${ep.id}` ? <RefreshCw size={12} className="spin" /> : <Play size={12} />}
                  Send
                </button>
                {r && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{
                      fontSize: '11px', fontWeight: 700, marginBottom: '4px',
                      color: r.ok ? 'var(--green)' : 'var(--red)',
                    }}>
                      {r.status === 0 ? 'NETWORK ERROR' : `HTTP ${r.status}`}
                    </div>
                    <JsonBlock value={r.body ?? '(empty)'} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Raw token + decoded payload */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0, color: 'var(--text)' }}>Raw JWT</h3>
            <button
              onClick={handleCopy}
              disabled={!raw}
              style={{
                padding: '4px 10px', borderRadius: 'var(--radius)', fontSize: '11px', fontWeight: 600,
                cursor: raw ? 'pointer' : 'not-allowed', background: 'var(--btn)', color: 'var(--text)',
                border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <JsonBlock value={raw || '(none)'} />
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 10px', color: 'var(--text)' }}>Decoded payload</h3>
          <JsonBlock value={decoded || '(none)'} />
        </div>
      </section>

      <p style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
        Swagger UI: <a href="http://localhost:5001/api-docs" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>http://localhost:5001/api-docs</a>
      </p>
    </div>
  );
}
