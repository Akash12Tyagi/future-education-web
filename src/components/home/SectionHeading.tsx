// Shared minimal section header: grey eyebrow, large black title, optional
// light subtitle and a short grey intro line.
export function SectionHeading({
  eyebrow,
  title,
  sub,
  intro,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div>
      {eyebrow && (
        <p className={`m-0 text-lg font-medium md:text-xl ${dark ? "text-white/60" : "text-neutral-500"}`}>{eyebrow}</p>
      )}
      <h2
        className={`m-0 mt-2 text-[clamp(28px,4vw,46px)] leading-tight font-bold tracking-tight ${
          dark ? "text-white" : "text-primary-900"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`m-0 mt-2 text-[clamp(20px,2.4vw,30px)] leading-tight font-light ${dark ? "text-white" : "text-neutral-900"}`}>
          {sub}
        </p>
      )}
      {intro && (
        <p className={`m-0 mt-5 max-w-3xl text-[15px] leading-relaxed md:text-base ${dark ? "text-white/70" : "text-neutral-500"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
