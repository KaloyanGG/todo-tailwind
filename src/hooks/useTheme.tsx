import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
type Theme = "light" | "dark";

export const useTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {

  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    // root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}