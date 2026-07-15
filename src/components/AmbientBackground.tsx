export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -left-24 -top-32 h-[28rem] w-[28rem] rounded-full opacity-50 float-orb"
        style={{
          background:
            'radial-gradient(circle, rgba(15,122,102,0.22) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute -right-16 top-24 h-[22rem] w-[22rem] rounded-full opacity-40 float-orb-delay"
        style={{
          background:
            'radial-gradient(circle, rgba(61,214,181,0.16) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(10,15,28,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse 70% 55% at 50% 20%, black 20%, transparent 75%)',
        }}
      />
    </div>
  )
}
