import React from 'react';
import { render, screen } from '@testing-library/react';
import Services from '../../components/Services';

describe('Services', () => {
  it('renders the section heading', () => {
    render(<Services />);
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<Services />);
    expect(screen.getByText(/Empowering digital experiences/)).toBeInTheDocument();
  });

  it('renders all 6 service cards', () => {
    render(<Services />);
    const titles = [
      'Web Design',
      'Frontend Development',
      'QA Testing',
      'UI/UX Design',
      'Responsive Design',
      'Bug Tracking',
    ];
    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders service descriptions', () => {
    render(<Services />);
    expect(screen.getByText(/Modern, responsive websites/)).toBeInTheDocument();
    expect(screen.getByText(/React, Next.js/)).toBeInTheDocument();
  });
});
