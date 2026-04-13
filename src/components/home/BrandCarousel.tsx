import { brands } from '@/lib/constants'

export default function BrandCarousel() {
  const items = [...brands, ...brands]

  return (
    <section className="py-24 border-y border-brand-border bg-brand-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <span className="text-brand-hint font-medium normal-case tracking-[2px] text-[10px]">
          Verified partners
        </span>
      </div>

      <div style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            animation: 'marquee 40s linear infinite',
            willChange: 'transform',
          }}
        >
          {items.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '250px',
                height: '96px',
                padding: '0 3rem',
                background: 'white',
                border: '1px solid var(--brand-border)',
                transition: 'background 0.3s',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  letterSpacing: '4px',
                  textTransform: 'none',
                  userSelect: 'none',
                  color: 'var(--brand-ghost)',
                  transition: 'color 0.3s',
                }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}