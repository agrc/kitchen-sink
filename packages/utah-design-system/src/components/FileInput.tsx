import type { DropEvent, FileDropItem } from '@react-types/shared';
import { UploadIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Button as AriaButton,
  DropZone as AriaDropZone,
  FileTrigger as AriaFileTrigger,
  type FileTriggerProps as AriaFileTriggerProps,
  GridList,
  GridListItem,
  TooltipTrigger,
  type ValidationResult,
} from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Button } from './Button';
import { Description, Label } from './Field';
import { Tooltip } from './Tooltip';
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
  base: 'group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-white p-4 text-center outline-none transition-colors hover:border-primary-900 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:border-secondary-600 dark:hover:bg-zinc-800',
  variants: {
    isDisabled: {
      true: 'cursor-not-allowed border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800',
      false: 'border-zinc-300 dark:border-zinc-600',
    },
    isInvalid: {
      true: 'border-warning-600 hover:border-warning-700 dark:border-warning-600 dark:hover:border-warning-500',
    },
    isDropTarget: {
      true: 'border-primary-900 bg-primary-50 dark:border-secondary-600 dark:bg-secondary-900/20',
    },
  },
});

const buttonStyles = tv({
  extend: focusRing,
  base: 'flex w-full flex-col items-center justify-center gap-2 rounded-md',
});

const iconStyles = tv({
  base: 'size-8',
  variants: {
    isDisabled: {
      true: 'text-gray-300 dark:text-zinc-600',
      false: 'text-zinc-400 dark:text-zinc-500',
    },
  },
});

const textStyles = tv({
  base: 'text-sm',
  variants: {
    isDisabled: {
      true: 'text-gray-400 dark:text-zinc-600',
      false: 'text-zinc-600 dark:text-zinc-400',
    },
  },
});

const fileItemStyles = tv({
  extend: focusRing,
  base: 'flex cursor-default items-center justify-between gap-2 rounded-md border bg-white px-3 py-2 text-sm outline-none dark:bg-zinc-800',
  variants: {
    isSelected: {
      true: 'border-primary-900 bg-primary-50 dark:border-secondary-600 dark:bg-secondary-900/20',
      false: 'border-zinc-200 dark:border-zinc-700',
    },
    isFocusVisible: {
      true: 'outline-2',
      false: 'outline-0',
    },
    isDisabled: {
      true: 'opacity-50',
    },
  },
});

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function matchesAcceptedType(
  fileType: string,
  acceptedTypes: readonly string[],
): boolean {
  return acceptedTypes.some((accepted) => {
    if (accepted.endsWith('/*')) {
      const prefix = accepted.slice(0, -2);
      return fileType.startsWith(prefix + '/');
    }
    return fileType === accepted;
  });
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

  const handleDrop = async (e: DropEvent) => {
    // Filter for files only
    const filePromises = e.items
      .filter((item): item is FileDropItem => item.kind === 'file')
      .map((item) => item.getFile());

    const files = await Promise.all(filePromises);

    if (files.length > 0) {
      // If not allowing multiple, only take the first file
      const filesToAdd = allowsMultiple ? files : files.slice(0, 1);

      // Filter by accepted file types if specified
      const filteredFiles = acceptedFileTypes
        ? filesToAdd.filter((file) =>
            matchesAcceptedType(file.type, acceptedFileTypes),
          )
        : filesToAdd;

      if (filteredFiles.length > 0) {
        setSelectedFiles(filteredFiles);

        // Create FileList from files
        try {
          const dataTransfer = new DataTransfer();
          filteredFiles.forEach((file) => dataTransfer.items.add(file));
          onSelect?.(dataTransfer.files);
        } catch (error) {
          console.warn('DataTransfer API not available:', error);
        }
      }
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);

    if (updated.length === 0) {
      onSelect?.(null);
      return;
    }

    // Create a new FileList-like object and notify parent
    try {
      const dataTransfer = new DataTransfer();
      updated.forEach((file) => dataTransfer.items.add(file));
      onSelect?.(dataTransfer.files);
    } catch (error) {
      // DataTransfer not available in this environment
      console.warn('DataTransfer API not available:', error);
    }
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    // Notify parent that files have been cleared
    onSelect?.(null);
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
      {description && <Description>{description}</Description>}
      <AriaDropZone
        onDrop={handleDrop}
        className={(renderProps) =>
          dropZoneStyles({
            ...renderProps,
            isDisabled,
            isInvalid,
          })
        }
      >
        <AriaFileTrigger
          {...props}
          allowsMultiple={allowsMultiple}
          acceptedFileTypes={acceptedFileTypes}
          onSelect={handleSelect}
        >
          <AriaButton isDisabled={isDisabled} className={buttonStyles}>
            <UploadIcon className={iconStyles({ isDisabled })} />
            <div className={textStyles({ isDisabled })}>{placeholder}</div>
          </AriaButton>
        </AriaFileTrigger>
      </AriaDropZone>

      {selectedFiles.length > 0 && !isDisabled && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {selectedFiles.length}{' '}
              {selectedFiles.length === 1 ? 'file' : 'files'} selected
            </div>
            <Button
              onPress={clearFiles}
              isDisabled={isDisabled}
              size="extraSmall"
              variant="secondary"
            >
              Clear all
            </Button>
          </div>
          <GridList aria-label="Selected files" className="space-y-1">
            {selectedFiles.map((file, index) => (
              <GridListItem
                key={`${file.name}-${file.size}-${file.lastModified}`}
                textValue={file.name}
                className={(renderProps) => fileItemStyles(renderProps)}
              >
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
                <TooltipTrigger>
                  <Button
                    variant="icon"
                    onPress={() => removeFile(index)}
                    isDisabled={isDisabled}
                    className="rounded"
                    aria-label={`Remove ${file.name}`}
                  >
                    <XIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </Button>
                  <Tooltip>Remove {file.name}</Tooltip>
                </TooltipTrigger>
              </GridListItem>
            ))}
          </GridList>
        </div>
      )}

      {errorMessage && (
        <div className="text-sm text-warning-600 dark:text-warning-500">
          {typeof errorMessage === 'function'
            ? errorMessage({
                isInvalid: isInvalid ?? false,
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
                  valid: !isInvalid,
                },
              })
            : errorMessage}
        </div>
      )}
    </div>
  );
}
