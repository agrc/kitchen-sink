"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = void 0;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_aria_1 = require("react-aria");
var tailwind_merge_1 = require("tailwind-merge");
var tailwind_variants_1 = require("tailwind-variants");
var Button_1 = require("./Button");
/*
Getting Started

`npm install react-aria react-stately`

const drawerState = useOverlayTriggerState({});
const drawerTriggerProps = useOverlayTrigger(
  {
    type: 'dialog',
  },
  drawerState,
);

<Drawer state={drawerState} {...drawerTriggerProps}>
  <div className='p-4'>Drawer Content</div>
</Drawer>

*/
/* default to open
  const drawerState = useOverlayTrigger({ defaultOpen: true });
  <Drawer state={drawerState} />
*/
var drawer = (0, tailwind_variants_1.tv)({
    slots: {
        container: 'duration-[time:525ms] shrink-0 ease-in-out',
        content: 'relative bg-white duration-500 ease-in-out dark:bg-zinc-800',
        triggerButton: 'absolute z-10 flex justify-center overflow-hidden rounded border border-zinc-200 bg-white p-1 hover:border-zinc-300 hover:bg-slate-200 pressed:bg-slate-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:pressed:bg-slate-100',
    },
    variants: {
        type: {
            sidebar: {
                container: 'relative h-full transition-[width] data-[open="false"]:w-0',
                content: "h-full overflow-y-auto data-[open='false']:-translate-x-full data-[open='true']:translate-x-0",
                triggerButton: '-right-[25px] top-[calc(50%-24px)] h-10 flex-col rounded-l-none border-l-0 !p-1 dark:border-zinc-700 dark:bg-zinc-800',
            },
            tray: {
                container: 'absolute inset-x-0 bottom-0 transition-[height] data-[open="false"]:h-0',
                content: "overflow-x-auto border-t bg-zinc-50 data-[open='false']:h-0 data-[open='true']:translate-y-0 data-[open='false']:overflow-hidden data-[open='false']:border-0 dark:bg-zinc-700",
                triggerButton: '-top-6 bottom-[calc(100%)] left-[calc(50%-24px)] min-h-[25px] w-10 rounded-b-none border-b-0 bg-zinc-50 py-0 dark:border-zinc-800 dark:bg-zinc-700',
            },
        },
        size: {
            extraSmall: null,
            small: null,
            medium: null,
            large: null,
            extraLarge: null,
            fullscreen: null,
        },
    },
    defaultVariants: {
        type: 'sidebar',
        size: 'medium',
    },
    compoundVariants: [
        // Sidebar sizes
        {
            type: 'sidebar',
            size: 'extraSmall',
            class: {
                container: 'w-48',
                content: 'w-48',
            },
        },
        {
            type: 'sidebar',
            size: 'small',
            class: {
                container: 'w-64',
                content: 'w-64',
            },
        },
        {
            type: 'sidebar',
            size: 'medium',
            class: {
                container: 'w-80',
                content: 'w-80',
            },
        },
        {
            type: 'sidebar',
            size: 'large',
            class: {
                container: 'w-96',
                content: 'w-96',
            },
        },
        {
            type: 'sidebar',
            size: 'extraLarge',
            class: {
                container: 'w-[28rem]',
                content: 'w-[28rem]',
            },
        },
        {
            type: 'sidebar',
            size: 'fullscreen',
            class: {
                container: 'data-[open="true"]:w-full',
                content: 'data-[open="true"]:w-full',
            },
        },
        // Tray sizes
        {
            type: 'tray',
            size: 'extraSmall',
            class: {
                container: 'data-[open="true"]:h-48',
                content: 'data-[open="true"]:h-48',
            },
        },
        {
            type: 'tray',
            size: 'small',
            class: {
                container: 'data-[open="true"]:h-64',
                content: 'data-[open="true"]:h-64',
            },
        },
        {
            type: 'tray',
            size: 'medium',
            class: {
                container: 'data-[open="true"]:h-80',
                content: 'data-[open="true"]:h-80',
            },
        },
        {
            type: 'tray',
            size: 'large',
            class: {
                container: 'data-[open="true"]:h-96',
                content: 'data-[open="true"]:h-96',
            },
        },
        {
            type: 'tray',
            size: 'extraLarge',
            class: {
                container: 'data-[open="true"]:h-[28rem]',
                content: 'data-[open="true"]:h-[28rem]',
            },
        },
        {
            type: 'tray',
            size: 'fullscreen',
            class: {
                container: 'data-[open="true"]:fixed data-[open="true"]:z-30 data-[open="true"]:h-full',
                content: 'duration-0 data-[open="true"]:h-full',
            },
        },
    ],
});
var Drawer = function (_a) {
    var children = _a.children, className = _a.className, overlayProps = _a.overlayProps, state = _a.state, triggerProps = _a.triggerProps, _b = _a.allowFullScreen, allowFullScreen = _b === void 0 ? false : _b, _c = _a.main, main = _c === void 0 ? false : _c, _d = _a.type, type = _d === void 0 ? 'sidebar' : _d, _e = _a.size, propSize = _e === void 0 ? 'medium' : _e;
    var _f = (0, react_1.useState)(false), isFullscreen = _f[0], setIsFullscreen = _f[1];
    if (!triggerProps || !overlayProps) {
        throw new Error('You must provide both triggerProps and overlayProps');
    }
    var _g = (0, react_aria_1.useOverlayTrigger)({ type: 'dialog' }, state), internalTriggerProps = _g.triggerProps, internalOverlayProps = _g.overlayProps;
    var size = isFullscreen ? 'fullscreen' : propSize;
    var css = drawer({ type: type, size: size });
    return (<div data-open={state.isOpen} className={(0, tailwind_merge_1.twMerge)(css.container(), className)} id={main ? 'main-content' : undefined}>
      <react_aria_1.FocusScope contain={isFullscreen} restoreFocus>
        <aside data-open={state.isOpen} className={css.content()} {...(overlayProps || internalOverlayProps)}>
          {allowFullScreen && (<Button_1.Button aria-label="Toggle full-screen" className="absolute right-0 top-0 p-2" variant="icon" onPress={function () { return setIsFullscreen(!isFullscreen); }}>
              <lucide_react_1.FullscreenIcon className="h-full w-6 shrink-0 text-zinc-900 dark:text-white"/>
            </Button_1.Button>)}
          {children}
        </aside>
      </react_aria_1.FocusScope>
      <DefaultDrawerTrigger triggerProps={triggerProps || internalTriggerProps} state={state} Icon={type === 'sidebar' ? lucide_react_1.ChevronLeftIcon : lucide_react_1.ChevronDownIcon} buttonClassName={css.triggerButton()}/>
    </div>);
};
exports.Drawer = Drawer;
var DefaultDrawerTrigger = function (_a) {
    var triggerProps = _a.triggerProps, Icon = _a.Icon, state = _a.state, buttonClassName = _a.buttonClassName;
    return (<Button_1.Button className={buttonClassName} {...triggerProps} variant="icon" onPress={state.toggle} aria-label="Close the drawer">
      <Icon className={(0, tailwind_merge_1.twJoin)('w-4 text-zinc-900 transition-transform duration-500 dark:text-white', !state.isOpen ? '-rotate-180' : '')}/>
    </Button_1.Button>);
};
