import { render } from '@testing-library/react';
import { Provider } from 'react-redux';


import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import { store } from '../store/store';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>{children}</Router>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
