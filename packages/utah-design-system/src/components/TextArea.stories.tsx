import type { Meta } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './Button';
import { TextArea as Component } from './TextArea';

const meta: Meta<typeof Component> = {
  component: Component,
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

export const Example = {};

export const HtmlValidation = (args: any) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
    }}
    className="flex flex-col items-start gap-2"
  >
    <Component {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </form>
);

export const ReactHookFormValidation = (args: any) => {
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
          <Component
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
};

HtmlValidation.args = {
  isRequired: true,
};
