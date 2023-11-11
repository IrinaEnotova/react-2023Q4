import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock';
import { BrowserRouter } from 'react-router-dom';

describe('ErrorBlock component', () => {
  test('contains specific content', () => {
    render(
      <BrowserRouter>
        <ErrorBlock />
      </BrowserRouter>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('To first page')).toBeInTheDocument();
  });
});
