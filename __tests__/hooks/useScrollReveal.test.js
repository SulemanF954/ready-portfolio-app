import { renderHook } from '@testing-library/react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

describe('useScrollReveal', () => {
  let observeMock;
  let unobserveMock;
  let disconnectMock;
  let observerCallback;

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    disconnectMock = jest.fn();

    window.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      };
    });
  });

  it('creates an IntersectionObserver on mount', () => {
    renderHook(() => useScrollReveal());
    expect(window.IntersectionObserver).toHaveBeenCalled();
  });

  it('disconnects observer on unmount', () => {
    const { unmount } = renderHook(() => useScrollReveal());
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('adds "visible" class to scroll-reveal elements when intersecting', () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('scroll-reveal');
    document.body.appendChild(mockElement);

    renderHook(() => useScrollReveal());

    observerCallback([
      { isIntersecting: true, target: mockElement },
    ]);

    expect(mockElement.classList.contains('visible')).toBe(true);
    expect(unobserveMock).toHaveBeenCalledWith(mockElement);

    document.body.removeChild(mockElement);
  });

  it('does not add "visible" class when not intersecting', () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('scroll-reveal');
    document.body.appendChild(mockElement);

    renderHook(() => useScrollReveal());

    observerCallback([
      { isIntersecting: false, target: mockElement },
    ]);

    expect(mockElement.classList.contains('visible')).toBe(false);
    expect(unobserveMock).not.toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });
});
