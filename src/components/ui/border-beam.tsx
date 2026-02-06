import { cn } from "@/lib/utils"

interface BorderBeamProps {
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
  reverse?: boolean
  borderWidth?: number
  /** When true, center is transparent so content underneath shows (use when beam is on top) */
  transparentCenter?: boolean
}

export const BorderBeam = ({
  className,
  duration = 6,
  delay = 0,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  reverse = false,
  borderWidth = 4,
  transparentCenter = false,
}: BorderBeamProps) => {
  const bw = borderWidth
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 rounded-[inherit]",
        className
      )}
      style={{
        ["--beam-duration" as string]: `${duration}s`,
        ["--beam-delay" as string]: `${delay}s`,
        ["--beam-direction" as string]: reverse ? "reverse" : "normal",
      } as React.CSSProperties}
    >
      {/* Rotating gradient - extends bw pixels outside so border ring is visible */}
      <div
        aria-hidden
        className="border-beam-rotator"
        style={{
          position: "absolute",
          left: -bw,
          top: -bw,
          width: `calc(100% + ${bw * 2}px)`,
          height: `calc(100% + ${bw * 2}px)`,
          zIndex: 0,
          background: `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        }}
      />
      {/* Inner mask - card background so only the border ring shows gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: bw,
          top: bw,
          right: bw,
          bottom: bw,
          zIndex: 1,
          borderRadius: Math.max(0, 20 - bw),
          background: transparentCenter ? "transparent" : "var(--card-bg, #2D3748)",
        }}
      />
    </div>
  )
}
