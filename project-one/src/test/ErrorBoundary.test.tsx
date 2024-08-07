// ErrorBoundary.test.tsx
import { render, screen } from './test-utils';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { vi } from 'vitest';

// A helper component to trigger an error inside ErrorBoundary
const ErrorThrowingComponent = () => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', () => {
  // Suppress console.error output
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('catches an error and displays the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'An error occurred while loading this page. Please try reloading the page.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });
});
