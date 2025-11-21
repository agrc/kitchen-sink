"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = AlertDialog;
var lucide_react_1 = require("lucide-react");
var react_aria_1 = require("react-aria");
var react_aria_components_1 = require("react-aria-components");
var Button_1 = require("./Button");
var Dialog_1 = require("./Dialog");
function AlertDialog(_a) {
    var title = _a.title, variant = _a.variant, _b = _a.includeCancel, includeCancel = _b === void 0 ? true : _b, cancelLabel = _a.cancelLabel, actionLabel = _a.actionLabel, onAction = _a.onAction, children = _a.children, props = __rest(_a, ["title", "variant", "includeCancel", "cancelLabel", "actionLabel", "onAction", "children"]);
    return (<Dialog_1.Dialog role="alertdialog" {...props}>
      {function (_a) {
            var close = _a.close;
            return (<>
          <react_aria_components_1.Heading level={2} slot="title">
            {title}
          </react_aria_components_1.Heading>
          <div className={"absolute right-6 top-6 size-6 stroke-2 ".concat(variant === 'destructive' ? 'text-warning-500' : 'text-sky-500')}>
            {variant === 'destructive' ? (<lucide_react_1.AlertCircleIcon aria-hidden/>) : (<lucide_react_1.InfoIcon aria-hidden/>)}
          </div>
          <div className="mt-3 text-slate-500 dark:text-zinc-400">
            {children}
          </div>
          <div className="mt-6 flex justify-end gap-2">
            {includeCancel && (<Button_1.Button variant="secondary" onPress={close}>
                {cancelLabel || 'Cancel'}
              </Button_1.Button>)}
            <Button_1.Button variant={variant === 'destructive' ? 'destructive' : 'primary'} 
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus onPress={(0, react_aria_1.chain)(onAction, close)}>
              {actionLabel}
            </Button_1.Button>
          </div>
        </>);
        }}
    </Dialog_1.Dialog>);
}
