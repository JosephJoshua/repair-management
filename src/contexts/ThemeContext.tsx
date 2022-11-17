import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import React, { FC, useContext, useState } from 'react';

const SUPPORTED_THEMES = Object.freeze({
  light: 'winter',
  dark: 'night',
});

type SupportedTheme = keyof typeof SUPPORTED_THEMES;

const LS_THEME_KEY = 'selectedTheme';
const DEFAULT_THEME: SupportedTheme = 'light';

export const isSupportedTheme = (theme: string): theme is SupportedTheme => {
  return theme in SUPPORTED_THEMES;
};

export type ThemeContextProps = {
  theme: SupportedTheme;
  setTheme: (theme: SupportedTheme) => void;
};

export type ThemeContextProviderProps = {
  value?: SupportedTheme;
  children: React.ReactNode;
};

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  setTheme: () => null,
});

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  value = DEFAULT_THEME,
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<SupportedTheme>(value);

  useIsomorphicLayoutEffect(() => {
    const savedTheme = localStorage.getItem(LS_THEME_KEY);

    if (savedTheme != null && isSupportedTheme(savedTheme)) {
      handleThemeChange(savedTheme);
      return;
    }

    // If the user hasn't explicitly changed the theme before,
    // use their system preferred color scheme as the default.
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    handleThemeChange(prefersDark ? 'dark' : 'light');
  }, []);

  // Applies the new theme to the DOM html tag and saves it to local storage.
  const applyTheme = (theme: SupportedTheme = DEFAULT_THEME) => {
    const htmlTag = document.getElementsByTagName('html')[0];
    localStorage.setItem(LS_THEME_KEY, theme);
    htmlTag.setAttribute('data-theme', SUPPORTED_THEMES[theme]);
  };

  const handleThemeChange = (theme: SupportedTheme) => {
    setTheme(theme);
    applyTheme(theme);
  };

  const contextValue = {
    theme,
    setTheme: handleThemeChange,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
