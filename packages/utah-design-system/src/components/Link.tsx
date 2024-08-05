import { ReactNode } from 'react';
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
  console.log(
    'link props',
    styles({ variant: props.variant, quiet: props.quiet }),
  );

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
        ></path>
      </svg>
    </span>
    <span className="sr-only">opens in a new window</span>
  </Link>
);
