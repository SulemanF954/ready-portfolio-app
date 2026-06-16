import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../../components/About';

describe('About', () => {
  const defaultProps = {
    cvLoading: false,
    generateCV: jest.fn(),
    darkMode: false,
  };

  it('renders the section heading', () => {
    render(<About {...defaultProps} />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders about text content', () => {
    render(<About {...defaultProps} />);
    expect(screen.getByText(/QA Tester with 1.5 years/)).toBeInTheDocument();
  });

  it('renders Download CV button', () => {
    render(<About {...defaultProps} />);
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });

  it('calls generateCV when button is clicked', () => {
    const generateMock = jest.fn();
    render(<About {...defaultProps} generateCV={generateMock} />);

    fireEvent.click(screen.getByText('Download CV'));
    expect(generateMock).toHaveBeenCalled();
  });

  it('shows loading text when cvLoading is true', () => {
    render(<About {...defaultProps} cvLoading={true} />);
    expect(screen.getByText('Generating...')).toBeInTheDocument();
  });

  it('disables button when cvLoading is true', () => {
    render(<About {...defaultProps} cvLoading={true} />);
    expect(screen.getByText('Generating...')).toBeDisabled();
  });

  it('shows light profile image when darkMode is false', () => {
    render(<About {...defaultProps} darkMode={false} />);
    const img = screen.getByAltText('About me');
    expect(img.getAttribute('src')).toContain('profile-light.png');
  });

  it('shows dark profile image when darkMode is true', () => {
    render(<About {...defaultProps} darkMode={true} />);
    const img = screen.getByAltText('About me');
    expect(img.getAttribute('src')).toContain('profile-dark.png');
  });
});
