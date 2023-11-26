import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { useState } from 'react';

const ThrowError = (): JSX.Element => {
  const [isError, setIsError] = useState(false);

  const throwError = (): void => {
    setIsError(true);
  };
  if (isError) {
    throw new Error('Test');
  }

  return <button onClick={throwError}>This is error block</button>;
};

describe('Error Boundary', () => {
  test('contains specific content', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByText(/This is error block/i));
    expect(screen.queryByText(/This is error block/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ErrorBoundary worked!/i)).toBeInTheDocument();
  });
});
