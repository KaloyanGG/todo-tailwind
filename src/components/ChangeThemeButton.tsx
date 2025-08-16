type SizeToken = "small" | "medium" | "large" | number;
type ChangeThemeButtonProps = {
  size?: "small" | "medium" | "large" | number;
  onClick?: () => void;
}

const TOKEN_PX: Record<Exclude<SizeToken, number>, number> = {
  small: 32,   // 2rem
  medium: 48,  // 3rem
  large: 64,   // 4rem
};

const toPx = (size: SizeToken | undefined): string => {
  if (typeof size ==='number'){
    return `${size}px`;
  }
  if(!size) return `${TOKEN_PX.medium}px`;
  return `${TOKEN_PX[size]}px`;
}

const ChangeThemeButton = ({ size = "medium", onClick }: ChangeThemeButtonProps) => {



  return (
    <button id="change-theme"
      style={{ ["--size" as any]: toPx(size) }}
      className="w-[var(--size)] h-[var(--size)] text-[calc(var(--size)*0.5)] rounded-full hover:bg-orange-200"
      onClick={onClick}
      >
      🌙
    </button>
  )
}
export default ChangeThemeButton