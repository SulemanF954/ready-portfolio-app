import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the brand logo text', () => {
    render(<Footer />);
    expect(screen.getByText('Sulemanfarooq')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    const navItems = ['Home', 'Services', 'About', 'Portfolio', 'Contact'];
    navItems.forEach((item) => {
      const link = screen.getByText(item);
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', `#${item.toLowerCase()}`);
    });
  });

  it('renders social media links', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('target') === '_blank'
    );
    expect(socialLinks.length).toBeGreaterThanOrEqual(4);
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/sulemanfarooq954@gmail.com/)).toBeInTheDocument();
    expect(screen.getByText(/\+92307-6315295/)).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Designed by @Suleman Farooq/)).toBeInTheDocument();
  });
});
