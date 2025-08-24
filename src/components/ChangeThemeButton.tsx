import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

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
  const [theme, setTheme] = useTheme();

  const handleChangeTheme = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const root = document.documentElement;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;

    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);

    setTheme((oldTheme) => oldTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <button id="change-theme"
      style={{ ["--size" as any]: toPx(size) }}
      className="w-[var(--size)] sm:top-2 sm:left-2 absolute h-[var(--size)] text-[calc(var(--size)*0.5)] rounded-full hover:bg-orange-200"
      onClick={handleChangeTheme}
    >
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  )
}
export default ChangeThemeButton