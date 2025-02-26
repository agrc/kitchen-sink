import { AlertCircleIcon, InfoIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { chain } from 'react-aria';
import { type DialogProps, Heading } from 'react-aria-components';
import { Button } from './Button';
import { Dialog } from './Dialog';

interface AlertDialogProps extends Omit<DialogProps, 'children'> {
  title: string;
  children: ReactNode;
  variant?: 'info' | 'destructive';
  actionLabel: string;
  includeCancel?: boolean;
  cancelLabel?: string;
  onAction?: () => void;
}

export function AlertDialog({
  title,
  variant,
  includeCancel = true,
  cancelLabel,
  actionLabel,
  onAction,
  children,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog role="alertdialog" {...props}>
      {({ close }) => (
        <>
          <Heading level={2} slot="title">
            {title}
          </Heading>
          <div
            className={`absolute right-6 top-6 size-6 stroke-2 ${variant === 'destructive' ? 'text-warning-500' : 'text-sky-500'}`}
          >
            {variant === 'destructive' ? (
              <AlertCircleIcon aria-hidden />
            ) : (
              <InfoIcon aria-hidden />
            )}
          </div>
          <div className="mt-3 text-slate-500 dark:text-zinc-400">
            {children}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            {includeCancel && (
              <Button variant="secondary" onPress={close}>
                {cancelLabel || 'Cancel'}
              </Button>
            )}
            <Button
              variant={variant === 'destructive' ? 'destructive' : 'primary'}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onPress={chain(onAction, close)}
            >
              {actionLabel}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
