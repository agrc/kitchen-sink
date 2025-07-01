import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './Button';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Name',
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Example: Story = {};

export const HtmlValidation: Story = {
  render: (args) => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="flex flex-col items-start gap-2"
    >
      <TextArea {...args} />
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </form>
  ),
};

export const ReactHookFormValidation: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { control, handleSubmit } = useForm({
      defaultValues: {
        name: '',
      },
    });

    return (
      <form
        className="flex flex-col items-start gap-4"
        onSubmit={handleSubmit(console.log)}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState }) => (
            <TextArea
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              validationBehavior="aria"
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
};

HtmlValidation.args = {
  isRequired: true,
};
