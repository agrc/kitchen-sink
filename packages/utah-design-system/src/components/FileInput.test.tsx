import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileInput } from './FileInput';

// Helper function to create mock File objects
function createMockFile(name: string, _size: number, type: string): File {
  const blob = new Blob([''], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
}

// Helper function to get the hidden file input element
// Note: File inputs are typically hidden and controlled via file trigger UI
function getFileInput(): HTMLInputElement {
  const input = document.querySelector('input[type="file"]');
  if (!input) {
    throw new Error('File input not found');
  }
  return input as HTMLInputElement;
}

describe('FileInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('uncontrolled mode', () => {
    it('should manage files internally when value prop is not provided', async () => {
      const onChange = vi.fn();
      render(<FileInput onChange={onChange} label="Upload file" />);

      const file = createMockFile('test.txt', 1024, 'text/plain');
      const input = getFileInput();

      // Simulate file selection
      fireEvent.change(input, { target: { files: [file] } });

      // In uncontrolled mode, onChange should still be called
      expect(onChange).toHaveBeenCalledWith([file]);

      // The file should be displayed
      expect(screen.getByText('test.txt')).toBeTruthy();
    });

    it('should clear files internally when clear button is clicked in uncontrolled mode', async () => {
      const onChange = vi.fn();
      render(<FileInput onChange={onChange} label="Upload file" />);

      const file = createMockFile('test.txt', 1024, 'text/plain');
      const input = getFileInput();

      fireEvent.change(input, { target: { files: [file] } });

      expect(screen.getByText('test.txt')).toBeTruthy();

      // Click clear button
      const clearButton = screen.getByText('Clear all');
      await userEvent.click(clearButton);

      // onChange should be called with null
      expect(onChange).toHaveBeenCalledWith(null);

      // File should no longer be displayed
      expect(screen.queryByText('test.txt')).toBeNull();
    });
  });

  describe('controlled mode', () => {
    it('should display files from value prop in controlled mode', () => {
      const file1 = createMockFile('document.pdf', 2048, 'application/pdf');
      const file2 = createMockFile('image.png', 4096, 'image/png');

      render(
        <FileInput
          value={[file1, file2]}
          label="Upload files"
          allowsMultiple
        />,
      );

      expect(screen.getByText('document.pdf')).toBeTruthy();
      expect(screen.getByText('image.png')).toBeTruthy();
      expect(screen.getByText('2 files selected')).toBeTruthy();
    });

    it('should display no files when value is null in controlled mode', () => {
      render(<FileInput value={null} label="Upload file" />);

      expect(screen.queryByText(/files? selected/)).toBeNull();
    });

    it('should display no files when value is empty array in controlled mode', () => {
      render(<FileInput value={[]} label="Upload file" />);

      expect(screen.queryByText(/files? selected/)).toBeNull();
    });

    it('should call onChange with new files when files are selected in controlled mode', async () => {
      const onChange = vi.fn();

      render(<FileInput value={[]} onChange={onChange} label="Upload file" />);

      const file = createMockFile('new-file.txt', 1024, 'text/plain');
      const input = getFileInput();

      fireEvent.change(input, { target: { files: [file] } });

      expect(onChange).toHaveBeenCalledWith([file]);
    });

    it('should not update internal state when in controlled mode (parent controls value)', async () => {
      const onChange = vi.fn();
      const initialFile = createMockFile('initial.txt', 1024, 'text/plain');

      // Render with initial value
      const { rerender } = render(
        <FileInput
          value={[initialFile]}
          onChange={onChange}
          label="Upload file"
        />,
      );

      expect(screen.getByText('initial.txt')).toBeTruthy();

      // Simulate file selection
      const newFile = createMockFile('new-file.txt', 2048, 'text/plain');
      const input = getFileInput();
      fireEvent.change(input, { target: { files: [newFile] } });

      // onChange should be called, but in controlled mode the displayed file
      // should still be the initial file until parent updates the value prop
      expect(onChange).toHaveBeenCalledWith([newFile]);

      // Without parent updating value, the display should still show original file
      expect(screen.getByText('initial.txt')).toBeTruthy();
      expect(screen.queryByText('new-file.txt')).toBeNull();

      // Now parent updates the value
      rerender(
        <FileInput value={[newFile]} onChange={onChange} label="Upload file" />,
      );

      // Now the new file should be displayed
      expect(screen.getByText('new-file.txt')).toBeTruthy();
      expect(screen.queryByText('initial.txt')).toBeNull();
    });

    it('should call onChange with null when clear button is clicked in controlled mode', async () => {
      const onChange = vi.fn();
      const file = createMockFile('test.pdf', 1024, 'application/pdf');

      render(
        <FileInput value={[file]} onChange={onChange} label="Upload file" />,
      );

      expect(screen.getByText('test.pdf')).toBeTruthy();

      const clearButton = screen.getByText('Clear all');
      await userEvent.click(clearButton);

      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('should call onChange when individual file is removed in controlled mode', async () => {
      const onChange = vi.fn();
      const file1 = createMockFile('file1.txt', 1024, 'text/plain');
      const file2 = createMockFile('file2.txt', 2048, 'text/plain');

      render(
        <FileInput
          value={[file1, file2]}
          onChange={onChange}
          label="Upload files"
          allowsMultiple
        />,
      );

      // Find and click the remove button for the first file
      const removeButtons = screen.getAllByRole('button', { name: /Remove/ });
      const firstRemoveButton = removeButtons[0];
      expect(firstRemoveButton).toBeTruthy();
      await userEvent.click(firstRemoveButton!);

      // Should be called with remaining file
      expect(onChange).toHaveBeenCalledWith([file2]);
    });

    it('should call onChange with null when last file is removed in controlled mode', async () => {
      const onChange = vi.fn();
      const file = createMockFile('only-file.txt', 1024, 'text/plain');

      render(
        <FileInput value={[file]} onChange={onChange} label="Upload file" />,
      );

      const removeButton = screen.getByRole('button', { name: /Remove/ });
      await userEvent.click(removeButton);

      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('controlled vs uncontrolled detection', () => {
    it('should be controlled when value prop is provided (including null)', () => {
      const onChange = vi.fn();

      // With value={null}, component is controlled
      render(
        <FileInput value={null} onChange={onChange} label="Upload file" />,
      );

      const file = createMockFile('test.txt', 1024, 'text/plain');
      const input = getFileInput();
      fireEvent.change(input, { target: { files: [file] } });

      // onChange should be called but file should not be displayed (controlled mode)
      expect(onChange).toHaveBeenCalledWith([file]);
      // In controlled mode with value={null}, the file won't show until parent updates
      expect(screen.queryByText('test.txt')).toBeNull();
    });

    it('should be uncontrolled when value prop is undefined', async () => {
      const onChange = vi.fn();

      render(<FileInput onChange={onChange} label="Upload file" />);

      const file = createMockFile('test.txt', 1024, 'text/plain');
      const input = getFileInput();
      fireEvent.change(input, { target: { files: [file] } });

      // In uncontrolled mode, file should be displayed immediately
      expect(onChange).toHaveBeenCalledWith([file]);
      expect(screen.getByText('test.txt')).toBeTruthy();
    });
  });

  describe('onChange callback', () => {
    it('should receive File[] when files are selected', () => {
      const onChange = vi.fn();

      render(<FileInput onChange={onChange} label="Upload file" />);

      const file = createMockFile('test.txt', 1024, 'text/plain');
      const input = getFileInput();
      fireEvent.change(input, { target: { files: [file] } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([file]);
      expect(Array.isArray(onChange.mock.calls[0]?.[0])).toBe(true);
    });

    it('should receive null when files are cleared', async () => {
      const onChange = vi.fn();

      render(<FileInput onChange={onChange} label="Upload file" />);

      // First add a file
      const file = createMockFile('test.txt', 1024, 'text/plain');
      const input = getFileInput();
      fireEvent.change(input, { target: { files: [file] } });

      // Clear files
      const clearButton = screen.getByText('Clear all');
      await userEvent.click(clearButton);

      expect(onChange).toHaveBeenLastCalledWith(null);
    });

    it('should handle multiple files when allowsMultiple is true', () => {
      const onChange = vi.fn();

      render(
        <FileInput onChange={onChange} label="Upload files" allowsMultiple />,
      );

      const file1 = createMockFile('file1.txt', 1024, 'text/plain');
      const file2 = createMockFile('file2.txt', 2048, 'text/plain');
      const input = getFileInput();

      fireEvent.change(input, { target: { files: [file1, file2] } });

      expect(onChange).toHaveBeenCalledWith([file1, file2]);
    });
  });
});
