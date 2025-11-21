"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = Modal;
var react_aria_components_1 = require("react-aria-components");
var tailwind_variants_1 = require("tailwind-variants");
var overlayStyles = (0, tailwind_variants_1.tv)({
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
var modalStyles = (0, tailwind_variants_1.tv)({
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
function Modal(props) {
    return (<react_aria_components_1.ModalOverlay {...props} className={overlayStyles}>
      <react_aria_components_1.Modal {...props} className={modalStyles}/>
    </react_aria_components_1.ModalOverlay>);
}
