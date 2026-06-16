import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar', () => {
  const defaultProps = {
    darkMode: false,
    toggleDarkMode: jest.fn(),
  };

  it('renders the brand name', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByText('SF')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<Navbar {...defaultProps} />);
    ['Home', 'Services', 'About', 'Experience', 'Portfolio', 'Testimonials', 'Contact'].forEach((item) => {
      expect(screen.getAllByText(item).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders Hire Me button', () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getAllByText('Hire Me').length).toBeGreaterThanOrEqual(1);
  });

  it('toggles mobile menu on hamburger click', () => {
    render(<Navbar {...defaultProps} />);

    const menuBar = document.querySelector('.fa-bars');
    expect(menuBar).toBeInTheDocument();

    fireEvent.click(menuBar.closest('div'));

    const mobileLinks = screen.getAllByText('Home');
    expect(mobileLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('calls toggleDarkMode when dark mode button is clicked', () => {
    const toggleMock = jest.fn();
    render(<Navbar {...defaultProps} toggleDarkMode={toggleMock} />);

    const darkModeButtons = document.querySelectorAll('.fa-moon, .fa-sun');
    expect(darkModeButtons.length).toBeGreaterThan(0);

    fireEvent.click(darkModeButtons[0].closest('button'));
    expect(toggleMock).toHaveBeenCalled();
  });

  it('shows moon icon in light mode and sun icon in dark mode', () => {
    const { rerender } = render(<Navbar {...defaultProps} darkMode={false} />);
    expect(document.querySelector('.fa-moon')).toBeInTheDocument();

    rerender(<Navbar {...defaultProps} darkMode={true} />);
    expect(document.querySelector('.fa-sun')).toBeInTheDocument();
  });
});
