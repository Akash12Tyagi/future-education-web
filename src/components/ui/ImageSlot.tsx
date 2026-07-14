interface ImageSlotProps {
  placeholder: string;
  className?: string;
  radius?: number;
}

/**
 * Stand-in for real photography. The design bundle ships no usable source
 * images for these slots — swap for real `<Image>` once photos are supplied.
 */
export function ImageSlot({ placeholder, className = "", radius }: ImageSlotProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-[#F1F1EF] text-center ${className}`}
      style={{
        borderRadius: radius,
        backgroundImage:
          "repeating-linear-gradient(135deg, #EEEEEA, #EEEEEA 10px, #F5F5F1 10px, #F5F5F1 20px)",
      }}
    >
      <span className="px-3 font-mono text-[11px] text-[#8A897F]">{placeholder}</span>
    </div>
  );
}
