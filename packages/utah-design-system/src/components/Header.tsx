import type { User } from 'firebase/auth';
import {
  GripIcon,
  LockIcon,
  ShieldCheckIcon,
  SquareArrowOutUpRightIcon,
  XIcon,
} from 'lucide-react';
import { type KeyboardEvent, type ReactNode, useRef } from 'react';
import { useModalOverlay, useOverlayTrigger } from 'react-aria';
import { Button, MenuTrigger } from 'react-aria-components';
import {
  type OverlayTriggerState,
  useOverlayTriggerState,
} from 'react-stately';
import { Avatar } from './Avatar';
import { Menu, MenuItem, MenuSeparator } from './Menu';

const dismiss = (e: KeyboardEvent, action: Function): void => {
  if (e.key !== 'Escape') {
    return;
  }

  action();
};

export type HeaderLink = {
  key: string;
  action: {
    url: string;
  };
};
export type HeaderProps = {
  children: ReactNode;
  links?: HeaderLink[];
  currentUser?: User;
  logout?: () => void;
};

export const Header = ({ children, links, ...props }: HeaderProps) => {
  let state = useOverlayTriggerState(props as OverlayTriggerState);
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
  );
  const { currentUser, logout } = props;

  return (
    <header className="w-full">
      <div className="pointer-events-none absolute z-50 flex w-full items-center justify-center overflow-hidden bg-transparent">
        <div className="pointer-events-none translate-y-[-150%] rounded-b border border-t-0 bg-zinc-200 leading-6 transition-all duration-500 ease-in-out focus-within:translate-y-0 focus-within:border-black/30 focus-within:shadow-lg dark:bg-zinc-700">
          <a
            href="#main-content"
            className="relative mx-6 my-2 flex cursor-pointer items-center justify-center rounded-full border-2 border-primary-800 bg-primary-800 px-8 py-2 text-white"
          >
            skip to main content
          </a>
        </div>
      </div>
      <div className="flex items-center border-b border-b-primary-900/30 bg-white py-2 pr-3 dark:border-black/30 dark:bg-zinc-700/20">
        <div className="flex h-16 grow space-x-4 divide-x divide-primary-950 pl-3 dark:divide-zinc-600 sm:space-x-6">
          <div className="flex items-center rounded-md px-3 transition-shadow ease-in-out focus-within:ring-2 focus-within:ring-primary-900 focus-within:ring-offset-2 dark:ring-offset-transparent dark:focus-within:ring-secondary-600">
            <Button
              {...triggerProps}
              onKeyDown={(event) => dismiss(event, state.close)}
              className="cursor-default focus:outline-none"
            >
              <span className="sr-only">
                An official website of the State of Utah. Click to learn more.
              </span>
              <UtahLogo className="h-[53px] w-[118px] fill-primary-900 font-utah text-sm dark:fill-white" />
            </Button>
          </div>
          <div className="flex flex-1 basis-full justify-start pl-4 text-zinc-900 dark:text-zinc-100 sm:pl-5 md:pl-8">
            {children}
          </div>
        </div>
        <div className="flex shrink items-center justify-end gap-6 lg:mr-10">
          {links && (
            <MenuTrigger>
              <div className="flex items-center justify-self-end">
                <Button
                  aria-label="user menu"
                  className="cursor-default rounded-md outline-none transition-shadow ease-in-out focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 dark:ring-offset-transparent dark:focus:ring-secondary-600"
                >
                  <GripIcon className="h-full w-8 text-primary-900 dark:text-zinc-300" />
                </Button>
                <Menu items={links}>
                  {(link) => (
                    <MenuItem
                      href={link.action.url}
                      target={
                        link.action.url.toLowerCase().startsWith('https')
                          ? '_blank'
                          : undefined
                      }
                    >
                      <span className="flex items-center justify-between rounded-md p-1 text-sm">
                        {link.key}
                        {link.action.url.toLowerCase().startsWith('https') ? (
                          <>
                            <SquareArrowOutUpRightIcon className="ml-1 h-full w-4" />
                          </>
                        ) : null}
                      </span>
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </MenuTrigger>
          )}
          {currentUser && (
            <MenuTrigger>
              <Button
                aria-label="secondary menu"
                className="cursor-default rounded-md outline-none transition-shadow ease-in-out focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 dark:ring-offset-transparent dark:focus:ring-secondary-600"
              >
                <Avatar
                  anonymous={!(currentUser ?? false)}
                  user={currentUser}
                />
              </Button>
              <Menu>
                <MenuItem href="https://id.utah.gov">
                  <span className="flex items-center justify-between">
                    Utahid account
                    <SquareArrowOutUpRightIcon className="ml-1 h-full w-4" />
                  </span>
                </MenuItem>
                <MenuItem href="https://gravatar.com">
                  <span className="flex items-center justify-between">
                    Gravatar account
                    <SquareArrowOutUpRightIcon className="ml-1 h-full w-4" />
                  </span>
                </MenuItem>
                <MenuSeparator />
                <MenuItem onAction={logout}>Sign out</MenuItem>
              </Menu>
            </MenuTrigger>
          )}
        </div>
      </div>
      {state.isOpen && <Flyout {...props} {...overlayProps} state={state} />}
    </header>
  );
};

const Flyout = ({ state, ...props }: { state: OverlayTriggerState }) => {
  let ref = useRef(null);
  let { modalProps } = useModalOverlay(
    { ...props, isKeyboardDismissDisabled: false, isDismissable: true },
    state,
    ref,
  );

  return (
    <>
      <div
        {...modalProps}
        ref={ref}
        className="relative z-10 bg-zinc-700 px-6 pb-6 pt-2 shadow-lg"
      >
        <p className="mb-8 text-xl font-bold text-zinc-50 md:text-2xl lg:mb-4">
          This is an official website of the State of Utah. Here&apos;s how you
          know:
        </p>
        <div className="mx-auto flex max-w-screen-lg flex-col justify-around gap-10 lg:flex-row">
          <div className="flex items-center gap-2 lg:w-96 lg:items-start">
            <ShieldCheckIcon className="w-16 text-zinc-50" />
            <p className="text-zinc-50">
              <span className="block font-bold">
                Official Utah websites use utah.gov in the browser&apos;s
                address bar.
              </span>
              A Utah.gov website belongs to an official government organization
              in the State of Utah.
            </p>
          </div>
          <div className="flex items-center gap-2 lg:w-96 lg:items-start">
            <LockIcon className="w-16 text-zinc-50" />
            <div className="text-zinc-50">
              <span className="block font-bold">
                Be careful when sharing sensitive information.
              </span>
              Share sensitive information only on secure official Utah.gov
              websites.
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-50 sm:flex-col sm:gap-0">
            <UtahLogo className="w-36 fill-current font-utah text-sm" />
            <div className="text-sm">© State of Utah</div>
          </div>
        </div>
        <Button
          onPress={state.close}
          className="absolute right-2 top-2 cursor-default rounded-full p-1 text-zinc-50 outline-none ring-offset-transparent transition-shadow ease-in-out hover:bg-black/10 focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2"
        >
          <XIcon className="w-7" />
          <span className="sr-only">Close official website popup</span>
        </Button>
      </div>
    </>
  );
};

export const UgrcLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="hidden h-full max-w-52 text-zinc-600 sm:block sm:max-w-none"
    viewBox="0 0 64 64"
  >
    <defs>
      <clipPath id="a">
        <circle cx={32.49} cy={32.16} r={29.34} fill="none" strokeWidth={0} />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        fill="#f7ea99"
        d="M58.59 36.88c-2.46 1.69-3.3 3.5-2.72 5.85.55 2.26 2.44 3.83 3.92 4.75.69.43 1.42.79 2.15 1.11V35.04c-1.17.52-2.3 1.11-3.35 1.84Z"
      />
      <path
        fill="#eaca00"
        d="M58.08 50.25c-2.87-1.77-4.73-4.1-5.37-6.74-.9-3.7.45-6.83 4.03-9.3a26.67 26.67 0 0 1 5.19-2.69v-4.21l-.79.25c-3.56 1.13-6.92 2.21-9.61 4.89l-.07.07a9.1 9.1 0 0 0-1.13 1.4c-1.57 2.4-2.18 5.75-1.66 9.18a15.5 15.5 0 0 0 1.93 5.45c3.07 5.11 8.85 6.99 11.32 7.58v-4.04a22.3 22.3 0 0 1-3.86-1.85Z"
      />
      <path
        fill="#bd9955"
        d="M47.83 50.24a18.69 18.69 0 0 1-2.36-6.65c-.64-4.22.15-8.39 2.16-11.45.45-.69.97-1.32 1.53-1.9l.09-.09c3.25-3.25 7.14-4.49 10.92-5.69l1.78-.58V13.6c-.67.17-1.34.36-1.99.58a30.98 30.98 0 0 0-8.67 4.9c-9.85 7.75-15.17 23.33-7.37 34.16 2.82 3.92 6.72 6.57 9.58 8.15h5.48c1.28 0 2.37-.82 2.78-1.96-2.59-.54-9.94-2.59-13.92-9.2Z"
      />
      <path
        fill="#386b7d"
        d="M37.04 5.5a30.61 30.61 0 0 1 1.35 6.93c.51 6.15-1.52 10.85-3.68 15.83-.56 1.29-1.14 2.63-1.67 3.99a38.2 38.2 0 0 0-1.36 4.17 32.17 32.17 0 0 0-.95 5.24 24.4 24.4 0 0 0 6.69 19.73H47.5a29.25 29.25 0 0 1-6.22-6.25c-8.89-12.35-3.04-29.94 7.99-38.62a34.18 34.18 0 0 1 9.64-5.42c1-.34 2.01-.62 3.04-.84V5.52a2.98 2.98 0 0 0-2.97-2.97H41.27A2.98 2.98 0 0 1 38.3-.42v-11.99a2.98 2.98 0 0 0-2.97-2.97H6.06c-.64 0-1.23.21-1.71.55 21.57 1.3 29.78 11.2 32.69 20.32Z"
      />
      <path
        fill="#2a515e"
        d="M27.28 41.34a36 36 0 0 1 1.05-5.8c.4-1.51.9-3.04 1.48-4.54.56-1.43 1.15-2.79 1.72-4.11 2.06-4.77 3.84-8.88 3.4-14.17a29.68 29.68 0 0 0-1.19-6.17C30.19-4.57 19.71-10.65 3.09-11.42V2.47a41.16 41.16 0 0 1 8.6-1.27c.96-.02 1.9.02 2.78.11.9.1 1.78.26 2.6.48 4.95 1.32 8.06 5.09 8.3 10.08.09 1.87-.12 3.61-.31 4.75-.46 2.73-1.22 5.48-1.94 8.13-1.32 4.81-2.68 9.78-2.33 14.78.62 8.79 4.29 16.34 8 21.87h4.12a27.94 27.94 0 0 1-5.64-20.06Z"
      />
      <path
        fill="#4d2a54"
        d="M17.34 39.77c-.4-5.58 1.05-10.85 2.45-15.94.74-2.69 1.44-5.23 1.87-7.79.16-.97.34-2.45.26-4-.17-3.51-2.21-5.96-5.74-6.9a14.5 14.5 0 0 0-2.08-.38c-.74-.08-1.53-.11-2.34-.1a41.1 41.1 0 0 0-8.67 1.37v7.53c4.27-.37 10.25.15 12.3 5.44.44 1.12.65 2.41.65 3.83 0 .85-.09 1.76-.25 2.71-.48 2.87-1.42 5.57-2.32 8.18-1.11 3.21-2.16 6.24-2.41 9.5a34.37 34.37 0 0 0 .07 5.96 36.67 36.67 0 0 0 3.51 12.21h9.99c-3.5-5.69-6.69-13.07-7.3-21.63Z"
      />
      <path
        fill="#331c38"
        d="M7.69 49.53a37.2 37.2 0 0 1-.08-6.58c.29-3.7 1.45-7.09 2.59-10.36.9-2.59 1.74-5.04 2.18-7.63.13-.77.2-1.49.2-2.15 0-.98-.14-1.85-.41-2.56-1.28-3.3-5.78-3.52-9.06-3.19v41.36a2.98 2.98 0 0 0 2.97 2.97h4.76A39.65 39.65 0 0 1 7.7 49.52Z"
      />
    </g>
    <path
      fill="gray"
      stroke="gray"
      strokeMiterlimit={10}
      d="M32.65 63.46a31.29 31.29 0 0 1-22.25-9.21A31.23 31.23 0 0 1 1.19 32 31.29 31.29 0 0 1 10.4 9.75 31.23 31.23 0 0 1 32.65.54 31.29 31.29 0 0 1 54.9 9.75 31.23 31.23 0 0 1 64.11 32a31.29 31.29 0 0 1-9.21 22.25 31.23 31.23 0 0 1-22.25 9.21Zm0-62.87a31.22 31.22 0 0 0-22.21 9.2A31.28 31.28 0 0 0 1.24 32a31.22 31.22 0 0 0 9.2 22.21 31.28 31.28 0 0 0 22.21 9.2 31.22 31.22 0 0 0 22.21-9.2A31.28 31.28 0 0 0 64.06 32a31.22 31.22 0 0 0-9.2-22.21A31.28 31.28 0 0 0 32.65.59Z"
    />
  </svg>
);

const UtahLogo = ({ className }: { className: string }) => (
  <svg viewBox="0 0 105.9496 47.6226" role="img" className={className}>
    <g>
      <g>
        <path d="M12.2714,30.0877c-4.1489,0-7.2318-1.2037-9.2489-3.611C1.0055,24.0693-.002,20.334,0,15.2709V0H7.8175V16.1806c0,2.6363,.356,4.4923,1.0679,5.5679,.7613,1.1018,2.0506,1.7162,3.3859,1.6134,1.3465,.0953,2.6458-.5157,3.4313-1.6134,.7422-1.0756,1.1133-2.9316,1.1133-5.5679V0h7.5448V15.2709c0,5.0601-.9847,8.7946-2.9541,11.2035-1.9694,2.4089-5.0145,3.6133-9.1352,3.6133Zm24.0887-.5463V6.5444h-7.8175V0h23.4526V6.5444h-7.8175V29.5414h-7.8175Zm25.8151-14.362l-.5002,2.0452h5.455l-.5002-2.0452c-.3637-1.4239-.7273-2.9693-1.091-4.636-.3637-1.6667-.7261-3.242-1.0871-4.7259h-.1821c-.3334,1.5151-.6743,3.0983-1.0226,4.7497s-.7053,3.189-1.071,4.6129l-.0008-.0008Zm-11.3617,14.362L59.8127,0h9.4502l9.0023,29.5414h-8.2724l-1.4544-6.2709h-8.2716l-1.4544,6.2709h-7.9988Zm30.2713,0V0h7.8175V10.9991h8.8171V0h7.8175V29.5414h-7.8175v-11.7251h-8.8194v11.7251h-7.8152Z"></path>
      </g>
      <text transform="translate(.0419 43.5205)" aria-hidden="true">
        <tspan x="0" y="0">
          An official website
        </tspan>
      </text>
    </g>
  </svg>
);
