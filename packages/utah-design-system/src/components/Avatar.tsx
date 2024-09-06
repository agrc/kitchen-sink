import { User } from 'firebase/auth';
import md5 from 'md5';
import { Button } from './Button';
import { twJoin } from 'tailwind-merge';

const size = 120;

const gravatarIcon = (
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
  user = { email: '', displayName: '' },
  logout,
}: {
  anonymous: Boolean;
  user: User;
  logout: () => Promise<void>;
}) => {
  if (anonymous || anonymous === undefined || anonymous === null) {
    return null;
  }

  return (
    // <Popover
    //   trigger={
    <div className="flex flex-col items-end gap-6">
      <span className="relative">
        <span className="border-wavy-500 bg-wavy-500 mr-2 inline-block h-16 w-16 overflow-hidden rounded-full border-2 shadow-lg">
          <Gravatar email={user.email} name={user.displayName} />
        </span>
        {/* <Popover trigger={gravatarIcon} delayDuration={300}>
              Update your profile image on{' '}
              <a href="https://gravatar.com">Gravatar</a>.
            </Popover> */}
      </span>
    </div>
    //   }
    // >
    // <div className="grid grid-cols-1 divide-y whitespace-nowrap">
    //   <a
    //     href="https://id.utah.gov"
    //     className="flex items-center justify-between p-1 text-sm text-slate-500 hover:text-slate-600 dark:text-slate-300"
    //   >
    //     UtahID Profile
    //   </a>
    //   <Button
    //     className="flex items-center justify-between p-1 text-sm text-slate-500 hover:text-slate-600 dark:text-slate-300"
    //     onPress={logout}
    //   >
    //     Sign out
    //   </Button>
    // </div>
    // </Popover>
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
