import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../../components/Contact';

describe('Contact', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the section heading', () => {
    render(<Contact />);
    expect(screen.getByText('Contact me')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<Contact />);
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Timeline')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Project Details...')).toBeInTheDocument();
  });

  it('renders contact info card', () => {
    render(<Contact />);
    expect(screen.getByText('Suleman Farooq')).toBeInTheDocument();
    expect(screen.getByText('sulemanfarooq954@gmail.com')).toBeInTheDocument();
  });

  it('renders service select dropdown', () => {
    render(<Contact />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.value).toBe('Web Development');
  });

  it('updates form fields on user input', () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText('Your Name');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Test User' } });
    expect(nameInput.value).toBe('Test User');
  });

  it('submits form via API and shows success message', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Email sent!' }),
    });

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { name: 'name', value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { name: 'email', value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Project Details...'), { target: { name: 'message', value: 'Hello' } });

    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Message sent/)).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Something went wrong.' }),
    });

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { name: 'name', value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { name: 'email', value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Project Details...'), { target: { name: 'message', value: 'Hello' } });

    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });

  it('shows network error on fetch rejection', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { name: 'name', value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { name: 'email', value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Project Details...'), { target: { name: 'message', value: 'Hello' } });

    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });
});
