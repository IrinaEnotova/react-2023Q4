import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';

describe('ErrorBlock component', () => {
  test('contains specific content', () => {
    render(<ErrorBlock />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('To app')).toBeInTheDocument();
  });
});
