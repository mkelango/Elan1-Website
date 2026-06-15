// components/Logo.tsx — the elan1 wordmark. The "1" carries a clay ring (the brand motif).
export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const ink = dark ? "#fbfaf7" : "#0b1220";
  return (
    <span className={`inline-flex items-baseline font-display font-extrabold tracking-[-0.03em] ${className}`} style={{ color: ink }}>
      <span className="text-[1.35rem] leading-none">elan</span>
      <span className="relative ml-[1px] text-[1.35rem] leading-none">
        1
        <span
          aria-hidden
          className="absolute -right-[5px] -top-[3px] h-[7px] w-[7px] rounded-full"
          style={{ background: "#df8c64" }}
        />
      </span>
    </span>
  );
}
