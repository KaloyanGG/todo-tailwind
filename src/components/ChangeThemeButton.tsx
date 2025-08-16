import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type SizeToken = "small" | "medium" | "large" | number;
type ChangeThemeButtonProps = {
  size?: "small" | "medium" | "large" | number;
}

const TOKEN_PX: Record<Exclude<SizeToken, number>, number> = {
  small: 32,   // 2rem
  medium: 48,  // 3rem
  large: 64,   // 4rem
};

const toPx = (size: SizeToken | undefined): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  if (!size) return `${TOKEN_PX.medium}px`;
  return `${TOKEN_PX[size]}px`;
}

const ChangeThemeButton = ({ size = "medium" }: ChangeThemeButtonProps) => {

  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    // root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme])

  const handleChangeTheme = () => {
    setTheme((oldTheme) => oldTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button id="change-theme"
      style={{ ["--size" as any]: toPx(size) }}
      className="w-[var(--size)] h-[var(--size)] text-[calc(var(--size)*0.5)] rounded-full hover:bg-orange-200"
      onClick={handleChangeTheme}
    >
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  )
}
export default ChangeThemeButton