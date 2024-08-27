import type { Meta } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from './Button';
import { TextField } from './TextField';
import { Controller, useForm } from 'react-hook-form';

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Name',
  },
};

export default meta;

export const Example = (args: any) => <TextField {...args} />;

export const HtmlValidation = (args: any) => (
  <Form className="flex flex-col items-start gap-4">
    <TextField {...args} />
    <Button type="submit" variant="secondary">
      Submit
    </Button>
  </Form>
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
          <TextField
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
