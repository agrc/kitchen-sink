import { TriangleAlertIcon } from 'lucide-react';

import PropTypes from 'prop-types';

export const Banner = ({ children }) => {
  return (
    <div className="m-6 mx-auto flex min-h-[75px] max-w-lg flex-row gap-2 rounded border border-rose-500 bg-rose-50 dark:bg-rose-900/10">
      <div className="inline-flex min-w-[75px] items-center justify-center rounded-l bg-rose-200 text-rose-500/70 dark:bg-rose-800/50">
        <TriangleAlertIcon className="h-full w-10" aria-hidden />
      </div>
      <div className="self-center px-3 py-2 font-bold text-zinc-800 dark:text-zinc-200">
        {children}
      </div>
    </div>
  );
};
Banner.propTypes = {
  children: PropTypes.node,
};
