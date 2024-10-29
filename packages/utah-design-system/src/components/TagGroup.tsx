import { XIcon } from 'lucide-react';
import { createContext, useContext } from 'react';
import {
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagGroupProps as AriaTagGroupProps,
  TagProps as AriaTagProps,
  Button,
  TagList,
  TagListProps,
  Text,
  composeRenderProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Description, Label } from './Field';
import { focusRing } from './utils';

const colors = {
  gray: 'bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-300 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500',
  primary:
    'bg-primary-100 text-primary-700 border-primary-200 hover:border-primary-300 dark:bg-primary-300/20 dark:text-primary-400 dark:border-primary-300/10 dark:hover:border-primary-300/20',
  secondary:
    'bg-secondary-100 text-secondary-700 border-secondary-200 hover:border-secondary-300 dark:bg-secondary-300/20 dark:text-secondary-400 dark:border-secondary-300/10 dark:hover:border-secondary-300/20',
  accent:
    'bg-accent-100 text-accent-700 border-accent-200 hover:border-accent-300 dark:bg-accent-400/20 dark:text-accent-300 dark:border-accent-400/10 dark:hover:border-accent-400/20',
};

type Color = keyof typeof colors;
const ColorContext = createContext<Color>('gray');

const tagStyles = tv({
  extend: focusRing,
  base: 'flex max-w-fit cursor-default items-center gap-1 rounded-md border px-3 py-0.5 text-xs transition',
  variants: {
    color: {
      gray: '',
      primary: '',
      secondary: '',
      accent: '',
    },
    allowsRemoving: {
      true: 'pr-1',
    },
    isSelected: {
      true: 'border-transparent bg-primary-800 text-white forced-color-adjust-none forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
    isDisabled: {
      true: 'bg-gray-100 text-gray-400 dark:border-white/20 dark:bg-transparent dark:text-zinc-400 forced-colors:text-[GrayText]',
    },
  },
  compoundVariants: (Object.keys(colors) as Color[]).map((color) => ({
    isSelected: false,
    isDisabled: false,
    color,
    class: colors[color],
  })),
});

export interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, 'children'>,
    Pick<TagListProps<T>, 'items' | 'children' | 'renderEmptyState'> {
  color?: Color;
  label?: string;
  description?: string;
  errorMessage?: string;
}

export interface TagProps extends AriaTagProps {
  color?: Color;
}

export function TagGroup<T extends object>({
  label,
  description,
  errorMessage,
  items,
  children,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) {
  return (
    <AriaTagGroup
      {...props}
      className={twMerge('flex flex-col gap-1', props.className)}
    >
      <Label>{label}</Label>
      <ColorContext.Provider value={props.color || 'gray'}>
        <TagList
          items={items}
          renderEmptyState={renderEmptyState}
          className="flex flex-wrap gap-1"
        >
          {children}
        </TagList>
      </ColorContext.Provider>
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-rose-600">
          {errorMessage}
        </Text>
      )}
    </AriaTagGroup>
  );
}

const removeButtonStyles = tv({
  extend: focusRing,
  base: 'flex cursor-default items-center justify-center rounded-full p-0.5 transition-[background-color] hover:bg-black/10 pressed:bg-black/20 dark:hover:bg-white/10 dark:pressed:bg-white/20',
});

export function Tag({ children, color, ...props }: TagProps) {
  let textValue = typeof children === 'string' ? children : undefined;
  let groupColor = useContext(ColorContext);
  return (
    <AriaTag
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tagStyles({ ...renderProps, className, color: color || groupColor }),
      )}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button slot="remove" className={removeButtonStyles}>
              <XIcon aria-hidden className="h-auto w-3" />
            </Button>
          )}
        </>
      )}
    </AriaTag>
  );
}
