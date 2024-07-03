// import { twMerge } from 'tailwind-merge';

// const SIZES = {
//   xs: 'h-3 w-3',
//   sm: 'h-3.5 w-3.5',
//   base: 'h-4 w-4',
//   lg: 'h-[1.125rem] w-[1.125rem]',
//   xl: 'h-5 w-5',
//   custom: null,
// };

/**
 * @returns {JSX.Element}
 */
export default function Spinner() {
  return (
    <svg
      className="h-full w-6 motion-safe:animate-spin"
      fill="none"
      role="progressbar"
      aria-live="polite"
      aria-hidden="false"
      aria-valuetext="loading"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
