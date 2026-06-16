import React from 'react';
import { render, screen } from '@testing-library/react';
import FloatingWhatsApp from '../../components/FloatingWhatsApp';

describe('FloatingWhatsApp', () => {
  it('renders a WhatsApp link with correct href', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/923076315295'));
  });

  it('includes a pre-filled message in the URL', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link).toHaveAttribute('href', expect.stringContaining('text='));
  });

  it('opens in a new tab', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByLabelText('Chat on WhatsApp');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
