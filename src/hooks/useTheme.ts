import * as React from 'react';

import { ThemeContext } from 'styled-components';

import { createTheme } from '../theme';

import { GlobalTheme } from '../theme/types';

// theme hook to get the current theme;
export const useTheme = () => {
  const theme = createTheme({}, {});

  return React.useContext<GlobalTheme>(ThemeContext) || theme;
};
