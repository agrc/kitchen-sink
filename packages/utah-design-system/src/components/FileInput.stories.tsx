import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './Button';
import { FileInput } from './FileInput';

const meta: Meta<typeof FileInput> = {
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Upload file',
  },
};

export default meta;

type Story = StoryObj<typeof FileInput>;

export const Example: Story = {
  args: {
    placeholder: 'Drag a file here or click to upload',
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Select a file to upload. Maximum file size: 10MB',
    placeholder: 'Drag a file here or click to upload',
  },
};

export const Required: Story = {
  args: {
    isRequired: true,
    placeholder: 'Drag a file here or click to upload',
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload files',
    allowsMultiple: true,
    placeholder: 'Drag multiple files here or click to upload',
  },
};

export const ImageOnly: Story = {
  args: {
    label: 'Upload image',
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
    placeholder: 'Drag an image here or click to upload',
    description: 'Only PNG, JPEG, and GIF images are accepted',
  },
};

export const PDFOnly: Story = {
  args: {
    label: 'Upload PDF',
    acceptedFileTypes: ['application/pdf'],
    placeholder: 'Drag a PDF here or click to upload',
    description: 'Only PDF files are accepted',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    placeholder: 'File upload is disabled',
  },
};

export const WithError: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Please select a file',
    placeholder: 'Drag a file here or click to upload',
  },
};

export const WithoutFileSize: Story = {
  args: {
    showFileSize: false,
    placeholder: 'Drag a file here or click to upload',
  },
};

export const ReactHookFormValidation: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { control, handleSubmit } = useForm({
      defaultValues: {
        files: null as File[] | null,
      },
    });

    return (
      <form
        className="flex flex-col items-start gap-4"
        onSubmit={handleSubmit((data) => {
          console.log('Form data:', data);
        })}
      >
        <Controller
          control={control}
          name="files"
          rules={{ required: 'Please select at least one file' }}
          render={({ field: { onChange, value, ...field }, fieldState }) => (
            <FileInput
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              value={value}
              onChange={onChange}
              {...field}
              {...args}
            />
          )}
        />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </form>
    );
  },
  args: {
    label: 'Upload document',
    placeholder: 'Drag a file here or click to upload',
  },
};

export const MultipleFilesWithTypeRestriction: Story = {
  args: {
    label: 'Upload images',
    allowsMultiple: true,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
    placeholder: 'Drag multiple images here or click to upload',
    description: 'Only PNG, JPEG, and WebP images are accepted',
  },
};

export const HtmlValidation: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState<string>();
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setError('test error');
        }}
        className="flex flex-col items-start gap-2"
      >
        <FileInput {...args} isInvalid={!!error} errorMessage={error} />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </form>
    );
  },
  args: {
    label: 'Upload document',
    placeholder: 'Drag a file here or click to upload',
    isRequired: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [files, setFiles] = useState<File[] | null>(null);

    return (
      <div className="flex flex-col items-start gap-4">
        <FileInput {...args} value={files} onChange={setFiles} />
        <div className="flex gap-2">
          <Button
            onPress={() => setFiles(null)}
            variant="secondary"
            isDisabled={!files || files.length === 0}
          >
            Reset
          </Button>
        </div>
        {files && files.length > 0 && (
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Parent state: {files.map((f) => f.name).join(', ')}
          </div>
        )}
      </div>
    );
  },
  args: {
    label: 'Upload document (controlled)',
    placeholder: 'Drag a file here or click to upload',
    description:
      'This input is controlled. Click Reset to clear files from parent state.',
  },
};
