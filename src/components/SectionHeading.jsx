export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <p className="section-kicker text-xs font-bold uppercase text-[#b56a22]">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight text-[#1f160f] sm:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-8 text-[#625247] sm:text-lg">{description}</p> : null}
    </div>
  )
}