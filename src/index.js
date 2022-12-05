import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import variables from './styles/variable';
import { ThemeProvider } from 'styled-components';

import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={{ style: theme, variables }}>
    <GlobalStyle />
    <Router />
  </ThemeProvider>
);
