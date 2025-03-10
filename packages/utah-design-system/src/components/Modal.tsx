import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const overlayStyles = tv({
  base: 'fixed left-0 top-0 isolate z-20 flex h-[--visual-viewport-height] w-full items-center justify-center bg-black/[15%] p-4 text-center backdrop-blur-lg',
  variants: {
    isEntering: {
      true: 'duration-200 ease-out animate-in fade-in',
    },
    isExiting: {
      true: 'duration-200 ease-in animate-out fade-out',
    },
  },
});

const modalStyles = tv({
  base: 'max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border border-black/10 bg-white bg-clip-padding text-left align-middle text-slate-700 shadow-2xl dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-300 dark:backdrop-blur-2xl dark:backdrop-saturate-200 forced-colors:bg-[Canvas]',
  variants: {
    isEntering: {
      true: 'duration-200 ease-out animate-in zoom-in-105',
    },
    isExiting: {
      true: 'duration-200 ease-in animate-out zoom-out-95',
    },
  },
});

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <RACModal {...props} className={modalStyles} />
    </ModalOverlay>
  );
}
