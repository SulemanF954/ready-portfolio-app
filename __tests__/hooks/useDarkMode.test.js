import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '../../hooks/useDarkMode';

describe('useDarkMode', () => {
  let originalMatchMedia;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('initializes with darkMode false when no saved preference and no OS preference', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('initializes with darkMode true when localStorage is "true"', () => {
    localStorage.setItem('darkMode', 'true');
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('initializes with darkMode false when localStorage is "false"', () => {
    localStorage.setItem('darkMode', 'false');
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(false);
  });

  it('respects OS dark mode preference when no localStorage value', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    const { result } = renderHook(() => useDarkMode());
    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggleDarkMode toggles state and updates DOM and localStorage', () => {
    const { result } = renderHook(() => useDarkMode());

    act(() => {
      result.current.toggleDarkMode();
    });
    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('darkMode')).toBe('true');

    act(() => {
      result.current.toggleDarkMode();
    });
    expect(result.current.darkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});
