import React, {createContext, useContext} from 'react';
import mono from '../theme/mono';

export type ExpandTheme = {
  bottomTabBar: number;
};

type ThemeContextType = {
  theme: typeof mono;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<any> = ({children}) => {
  const currentTheme = React.useRef(mono);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme.current,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
