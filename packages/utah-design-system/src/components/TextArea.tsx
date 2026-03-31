import { forwardRef, type ForwardedRef } from 'react';
import type { ValidationResult } from 'react-aria-components';
import { type TextAreaProps as AriaTextAreaProps } from 'react-aria-components/TextArea';
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components/TextField';
import { tv } from 'tailwind-variants';
import {
  Description,
  fieldBorderStyles,
  FieldError,
  Label,
  TextAreaInput,
} from './Field';
import { composeTailwindRenderProps, focusRing } from './utils';

const inputStyles = tv({
  extend: focusRing,
  base: 'rounded-md border',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    ...fieldBorderStyles.variants,
  },
});

export interface TextAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  inputProps?: AriaTextAreaProps;
}

export const TextArea = forwardRef(function TextField(
  { label, description, errorMessage, inputProps, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex flex-col gap-1',
      )}
    >
      {label && <Label>{label}</Label>}
      <TextAreaInput ref={ref} {...inputProps} className={inputStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
});
