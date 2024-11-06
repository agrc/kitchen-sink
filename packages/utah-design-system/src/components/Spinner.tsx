export const Spinner = () => {
  return (
    <svg
      className="h-full shrink-0 motion-safe:animate-spin"
      fill="none"
      role="progressbar"
      aria-live="polite"
      aria-hidden="false"
      aria-valuetext="loading"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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
};

Spinner.sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

Spinner.minDelay = async (promise: Promise<any>, ms = 2500) => {
  await Promise.allSettled([promise, Spinner.sleep(ms)]);

  return promise;
};
