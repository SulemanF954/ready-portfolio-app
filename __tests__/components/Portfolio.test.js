import React from 'react';
import { render, screen } from '@testing-library/react';
import Portfolio from '../../components/Portfolio';

describe('Portfolio', () => {
  it('renders the section heading', () => {
    render(<Portfolio />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders the section subtitle', () => {
    render(<Portfolio />);
    expect(screen.getByText('Creative Projects, Real Impact')).toBeInTheDocument();
  });

  it('renders all project cards', () => {
    render(<Portfolio />);
    const projectNames = [
      'Bug Tracking Dashboard',
      'E-commerce Platform',
      'Test Case Manager',
      'Portfolio 2025',
      'Analytics Dashboard',
      'Mobile App UI',
    ];
    projectNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('renders project categories', () => {
    render(<Portfolio />);
    expect(screen.getByText('QA Tool')).toBeInTheDocument();
    expect(screen.getByText('React / Next.js')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });
});
