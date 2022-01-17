import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewForm from '../components/Product/ReviewForm';

describe('Review form', () => {
  it('renders review form', () => {
    render(<ReviewForm productId={1} submitCallback={() => {}} />);
    expect(screen.getByText('Submit your review')).toBeInTheDocument();
  });

  it('accepts a name', () => {
    render(<ReviewForm productId={1} submitCallback={() => {}} />);
    const name = screen.getByTestId('authorName');
    expect(name).toBeInTheDocument();
    fireEvent.change(name, {
      target: { value: 'Harry Potter' },
    });
    expect(name.value).toBe('Harry Potter');
  });

  it('accepts an email', () => {
    render(<ReviewForm productId={1} submitCallback={() => {}} />);
    const name = screen.getByTestId('authorEmail');
    expect(name).toBeInTheDocument();
    fireEvent.change(name, {
      target: { value: 'hjpotter@hogwarts.co.uk' },
    });
    expect(name.value).toBe('hjpotter@hogwarts.co.uk');
  });

  it('accepts a comment', () => {
    render(<ReviewForm productId={1} submitCallback={() => {}} />);
    const name = screen.getByTestId('comment');
    expect(name).toBeInTheDocument();
    fireEvent.change(name, {
      target: { value: 'Expelliarmus' },
    });
    expect(name.value).toBe('Expelliarmus');
  });
});
