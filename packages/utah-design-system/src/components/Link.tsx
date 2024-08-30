import { ReactNode } from 'react';
import { SquareArrowOutUpRightIcon } from 'lucide-react';
import {
  Link as AriaLink,
  LinkProps as AriaLinkProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' | 'secondary';
  quiet?: boolean;
  children: ReactNode;
}

const styles = tv({
  extend: focusRing,
  base: 'underline disabled:no-underline disabled:cursor-default transition rounded',
  variants: {
    variant: {
      primary:
        'text-secondary-800 dark:text-accent-500 decoration-secondary-800/60 hover:decoration-secondary-800 dark:decoration-accent-500/60 dark:hover:decoration-accent-500',
      secondary:
        'text-primary-900 dark:text-primary-500 decoration-primary-900/50 hover:decoration-primary-900 dark:decoration-primary-500/60 dark:hover:decoration-primary-500',
    },
    quiet: {
      true: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    quiet: false,
  },
  compoundVariants: [
    {
      variant: ['primary', 'secondary'],
      quiet: true,
      className:
        'text-zinc-100 dark:text-zinc-100 dark:decoration-zinc-100/50 decoration-zinc-100/50 hover:decoration-zinc-100',
    },
  ],
});

export function Link(props: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        styles({
          ...renderProps,
          className,
          variant: props.variant,
          quiet: props.quiet,
        }),
      )}
    />
  );
}

export const ExternalLink = (props: LinkProps) => (
  <Link
    {...props}
    target="_blank"
    rel="noopener noreferrer nofollow"
    className="m-0 inline-flex cursor-pointer flex-wrap items-center gap-x-1"
  >
    {props.children}
    <span aria-hidden="true">
      <SquareArrowOutUpRightIcon className="h-full w-4" />
    </span>
    <span className="sr-only">opens in a new window</span>
  </Link>
);
