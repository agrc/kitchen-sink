import { User } from 'firebase/auth';
import md5 from 'md5';
import { twJoin } from 'tailwind-merge';

const size = 120;

const GravatarIcon = () => (
  <svg
    className="absolute bottom-1 right-1 h-3 w-3 fill-current text-slate-800/20 dark:text-slate-100/20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 27 27"
    role="presentation"
    aria-hidden="true"
  >
    <path d="M10.8 2.699v9.45a2.699 2.699 0 005.398 0V5.862a8.101 8.101 0 11-8.423 1.913 2.702 2.702 0 00-3.821-3.821A13.5 13.5 0 1013.499 0 2.699 2.699 0 0010.8 2.699z"></path>
  </svg>
);

export const Avatar = ({
  anonymous = true,
  user = { email: '', displayName: '' } as User,
}: {
  anonymous: Boolean;
  user: User | undefined;
}) => {
  if (anonymous || anonymous === undefined || anonymous === null) {
    return null;
  }

  return (
    <div className="flex flex-col items-end gap-6">
      <span className="relative">
        <span className="mr-2 inline-block h-16 w-16 overflow-hidden rounded-full border-2 border-primary-800 bg-primary-800">
          <Gravatar email={user.email} name={user.displayName} />
        </span>
        <GravatarIcon />
      </span>
    </div>
  );
};

const Gravatar = ({
  email,
  name,
}: {
  email: string | null;
  name: string | null;
}) => {
  email = email || '';
  name = name || 'Anonymous Coward';

  const gravatar = `https://www.gravatar.com/avatar/${md5(
    email.toLowerCase(),
  )}?size=${size}&default=blank`;

  const initials = getInitials(name);

  return (
    <>
      <div className="relative inline-flex h-full w-full items-center justify-center bg-primary-900">
        <div
          aria-hidden="true"
          className={twJoin(
            'select-none text-center text-2xl font-extralight text-white opacity-60 dark:text-black',
            initials.length < 3 && 'text-3xl',
            initials.length === 3 && 'text-2xl',
          )}
        >
          {initials}
        </div>
        <img
          src={gravatar}
          className="absolute left-0 top-0"
          alt={`${name}'s Gravatar`}
        />
      </div>
    </>
  );
};

const getInitials = (name: string) => {
  name = name.trim();

  if (name.length <= 3) {
    return name;
  }

  return name
    .split(/\s+/)
    .map((w) => [...w][0])
    .slice(0, 3)
    .join('');
};
