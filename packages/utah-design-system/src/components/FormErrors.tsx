import { Banner } from './Banner.tsx';

export const FormErrors = ({ errors }: { errors: Record<string, Error> }) => {
  const entries = Object.entries(errors);

  if (entries.length === 0) {
    return null;
  }

  return (
    <Banner>
      <div className="px-3 py-2">
        <span className="inline-block font-bold">
          Some errors have been found:
        </span>
        <ul className="list-inside">
          {entries.map(([key, value]) => {
            return (
              <li className="ml-2 list-disc text-sm" key={key}>
                {value.message}
              </li>
            );
          })}
        </ul>
      </div>
    </Banner>
  );
};

export const FormError = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    return null;
  }

  return (
    <Banner>
      <div className="self-center px-3 py-2 font-bold">{children}</div>
    </Banner>
  );
};
