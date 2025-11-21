import { UploadIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import {
  FileTrigger as AriaFileTrigger,
  type FileTriggerProps as AriaFileTriggerProps,
  type ValidationResult,
} from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Button } from './Button';
import { Description, FieldError, Label } from './Field';
import { focusRing } from './utils';

export interface FileInputProps extends Omit<AriaFileTriggerProps, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  /**
   * Text to display in the drop zone when no files are selected
   */
  placeholder?: string;
  /**
   * Show file size in the selected files list
   */
  showFileSize?: boolean;
  /**
   * Custom class for the drop zone container
   */
  className?: string;
}

const dropZoneStyles = tv({
  extend: focusRing,
  base: 'group flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-white p-6 text-center transition-colors hover:border-primary-900 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:border-secondary-600 dark:hover:bg-zinc-800',
  variants: {
    isDisabled: {
      true: 'cursor-not-allowed border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800',
      false: 'border-zinc-300 dark:border-zinc-600',
    },
    isInvalid: {
      true: 'border-warning-600 hover:border-warning-700 dark:border-warning-600 dark:hover:border-warning-500',
    },
  },
});

const fileListStyles = tv({
  base: 'mt-2 space-y-2',
});

const fileItemStyles = tv({
  base: 'flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800',
});

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function FileInput({
  label,
  description,
  errorMessage,
  isRequired,
  isDisabled,
  isInvalid,
  placeholder = 'Drag a file here or click to upload',
  showFileSize = true,
  className,
  allowsMultiple,
  acceptedFileTypes,
  onSelect,
  ...props
}: FileInputProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSelect = (fileList: FileList | null) => {
    if (fileList) {
      const files = Array.from(fileList);
      setSelectedFiles(files);
      onSelect?.(fileList);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setSelectedFiles([]);
  };

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {label && (
        <Label
          className={twJoin(
            isRequired &&
              "after:ml-0.5 after:text-warning-500 after:content-['*'] after:dark:text-warning-300",
          )}
        >
          {label}
        </Label>
      )}

      <AriaFileTrigger
        {...props}
        allowsMultiple={allowsMultiple}
        acceptedFileTypes={acceptedFileTypes}
        onSelect={handleSelect}
      >
        <Button
          isDisabled={isDisabled}
          className={dropZoneStyles({
            isDisabled,
            isInvalid,
          })}
        >
          <UploadIcon
            className={twJoin(
              'h-8 w-8',
              isDisabled
                ? 'text-gray-300 dark:text-zinc-600'
                : 'text-zinc-400 dark:text-zinc-500',
            )}
          />
          <div
            className={twJoin(
              'text-sm',
              isDisabled
                ? 'text-gray-400 dark:text-zinc-600'
                : 'text-zinc-600 dark:text-zinc-400',
            )}
          >
            {placeholder}
          </div>
          {acceptedFileTypes && acceptedFileTypes.length > 0 && (
            <div className="text-xs text-zinc-500 dark:text-zinc-500">
              Accepted types: {acceptedFileTypes.join(', ')}
            </div>
          )}
        </Button>
      </AriaFileTrigger>

      {selectedFiles.length > 0 && (
        <div className={fileListStyles()}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {selectedFiles.length}{' '}
              {selectedFiles.length === 1 ? 'file' : 'files'} selected
            </div>
            <button
              type="button"
              onClick={clearFiles}
              disabled={isDisabled}
              className="rounded px-2 py-1 text-sm text-primary-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-secondary-600 dark:hover:bg-zinc-800"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-1">
            {selectedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className={fileItemStyles()}>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="truncate font-medium text-zinc-800 dark:text-zinc-200">
                    {file.name}
                  </div>
                  {showFileSize && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatFileSize(file.size)}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={isDisabled}
                  className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-700"
                  aria-label={`Remove ${file.name}`}
                >
                  <XIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {description && <Description>{description}</Description>}
      {isInvalid && errorMessage && (
        <FieldError>
          {typeof errorMessage === 'string'
            ? errorMessage
            : errorMessage({
                isInvalid: true,
                validationErrors: [],
                validationDetails: {
                  badInput: false,
                  customError: false,
                  patternMismatch: false,
                  rangeOverflow: false,
                  rangeUnderflow: false,
                  stepMismatch: false,
                  tooLong: false,
                  tooShort: false,
                  typeMismatch: false,
                  valueMissing: false,
                  valid: false,
                },
              })}
        </FieldError>
      )}
    </div>
  );
}
