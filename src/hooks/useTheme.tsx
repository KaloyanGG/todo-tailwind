import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
type Theme = "light" | "dark";

export const useTheme = (): [Theme, Dispatch<SetStateAction<Theme>>] => {

  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  useEffect(() => {
    document.startViewTransition(()=>{
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    })
    // document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return [theme, setTheme];
}