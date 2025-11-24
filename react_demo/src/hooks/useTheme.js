import { useState } from 'react';
import { themes } from '../constants/themes';
import { DEFAULT_THEME } from '../constants/config';

export const useTheme = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const currentTheme = themes[theme];
  const c = currentTheme.colors;

  return {
    theme,
    setTheme,
    currentTheme,
    c
  };
};
