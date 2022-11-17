import { useThemeContext } from '@/contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useThemeContext();
  const isLightTheme = theme === 'light';

  const handleSwitchTheme = () => {
    setTheme(isLightTheme ? 'dark' : 'light');
  };

  return (
    <button onClick={handleSwitchTheme}>
      <div className={`swap swap-rotate ${isLightTheme ? 'swap-active' : ''}`}>
        <SunIcon className="w-[20px] h-[20px] swap-on" />
        <MoonIcon className="w-[20px] h-[20px] swap-off" />
      </div>

      <span>Mode {isLightTheme ? 'Terang' : 'Gelap'}</span>
    </button>
  );
};

export default ThemeSwitcher;
