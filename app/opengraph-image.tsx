import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Kevin Eka Pratama — Fullstack Developer (React • TypeScript • Go)';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 70px',
          backgroundColor: '#020617',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.18), transparent 45%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              color: '#34d399',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            Fullstack Developer • Portfolio
          </div>
          <div style={{ fontSize: '18px', color: '#94a3b8', fontWeight: '600' }}>
            mazkev.vercel.app
          </div>
        </div>

        {/* Main hero content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
          <div style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2px', color: '#ffffff', lineHeight: 1.1 }}>
            Kevin Eka Pratama
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#38bdf8', letterSpacing: '-0.5px' }}>
            React • TypeScript • Go (Golang)
          </div>
          <div style={{ fontSize: '22px', color: '#cbd5e1', maxWidth: '900px', lineHeight: 1.4 }}>
            3 years of professional experience in Application Support, transitioning into Software Development. Building reliable web applications and clean backend APIs.
          </div>
        </div>

        {/* Bottom tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
            Next.js & React
          </div>
          <div style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
            Go Clean Architecture
          </div>
          <div style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', fontSize: '16px', fontWeight: '700', color: '#f1f5f9' }}>
            PostgreSQL & REST APIs
          </div>
          <div style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', fontSize: '16px', fontWeight: '700', color: '#6ee7b7' }}>
            3 Yrs App Support
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
