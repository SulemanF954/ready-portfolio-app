import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ScrollToTop from '../../components/ScrollToTop';

describe('ScrollToTop', () => {
  let scrollToMock;

  beforeEach(() => {
    scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('does not render when scroll position is below threshold', () => {
    const { container } = render(<ScrollToTop />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when scroll position exceeds 300', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      fireEvent.scroll(window);
    });

    const button = screen.getByLabelText('Scroll to top');
    expect(button).toBeInTheDocument();
  });

  it('calls window.scrollTo when button is clicked', () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      fireEvent.scroll(window);
    });

    const button = screen.getByLabelText('Scroll to top');
    fireEvent.click(button);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('hides when scrolled back to top', () => {
    const { container } = render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
    });

    expect(container.firstChild).toBeNull();
  });
});
