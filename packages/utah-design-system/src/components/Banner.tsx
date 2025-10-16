import { TriangleAlertIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BannerProps = {
  children: ReactNode;
  className?: string;
};

export const Banner = ({ children, className }: BannerProps) => {
  return (
    <div
      className={twMerge(
        'm-6 mx-auto flex min-h-[75px] max-w-lg flex-row gap-2 rounded border border-warning-500 bg-warning-50 dark:bg-warning-900/10',
        className,
      )}
    >
      <div className="inline-flex min-w-[75px] items-center justify-center rounded-l bg-warning-200 text-warning-500/70 dark:bg-warning-800/50">
        <TriangleAlertIcon className="h-full w-10" aria-hidden />
      </div>
      <div className="self-center px-3 py-2 font-bold text-zinc-800 dark:text-zinc-200">
        {children}
      </div>
    </div>
  );
};
