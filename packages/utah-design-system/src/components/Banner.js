"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
var lucide_react_1 = require("lucide-react");
var tailwind_merge_1 = require("tailwind-merge");
var Banner = function (_a) {
    var children = _a.children, className = _a.className;
    return (<div className={(0, tailwind_merge_1.twMerge)('m-6 mx-auto flex min-h-[75px] max-w-lg flex-row gap-2 rounded border border-warning-500 bg-warning-50 dark:bg-warning-900/10', className)}>
      <div className="inline-flex min-w-[75px] items-center justify-center rounded-l bg-warning-200 text-warning-500/70 dark:bg-warning-800/50">
        <lucide_react_1.TriangleAlertIcon className="h-full w-10" aria-hidden/>
      </div>
      <div className="self-center px-3 py-2 font-bold text-zinc-800 dark:text-zinc-200">
        {children}
      </div>
    </div>);
};
exports.Banner = Banner;
