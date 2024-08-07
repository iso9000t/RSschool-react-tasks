import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import NotFound from '../components/NotFound/NotFound';

describe('NotFound', () => {
  it('should render the heading', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404 - Page Not Found');
  });

  it('should render the paragraph', () => {
    render(<NotFound />);
    const paragraph = screen.getByText(
      'Sorry, the page you are looking for does not exist.',
    );
    expect(paragraph).toBeInTheDocument();
  });

  it('should render the link to home', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
