type SectionHeadingProps = {
  kicker?: string;
  title: React.ReactNode;
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
  titleClassName?: string;
};

/** Kicker label + serif headline pattern repeated at the top of nearly every section. */
export function SectionHeading({ kicker, title, action, dark = false, className = "", titleClassName = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-9 flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div>
        {kicker ? (
          <div className="mb-3 text-[13px] font-bold tracking-[.08em] text-accent-500 uppercase">{kicker}</div>
        ) : null}
        <h2
          className={`font-display text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-normal ${dark ? "text-white" : "text-neutral-900"} ${titleClassName}`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
