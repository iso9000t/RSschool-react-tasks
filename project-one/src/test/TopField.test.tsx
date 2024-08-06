import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import TopField from '../components/TopField/TopField';

describe('TopField', () => {
  it('should render SearchInput', () => {
    render(<TopField />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render ErrorButton', () => {
    render(<TopField />);

    const errorButton = screen.getByRole('button', { name: /error/i });
    expect(errorButton).toBeInTheDocument();
  });
});
