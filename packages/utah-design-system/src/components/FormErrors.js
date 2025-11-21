"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormError = exports.FormErrors = void 0;
var Banner_tsx_1 = require("./Banner.tsx");
var FormErrors = function (_a) {
    var errors = _a.errors;
    var entries = Object.entries(errors);
    if (entries.length === 0) {
        return null;
    }
    return (<Banner_tsx_1.Banner>
      <div className="px-3 py-2">
        <span className="inline-block font-bold">
          Some errors have been found:
        </span>
        <ul className="list-inside">
          {entries.map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<li className="ml-2 list-disc text-sm" key={key}>
                {value.message}
              </li>);
        })}
        </ul>
      </div>
    </Banner_tsx_1.Banner>);
};
exports.FormErrors = FormErrors;
var FormError = function (_a) {
    var children = _a.children;
    if (!children) {
        return null;
    }
    return (<Banner_tsx_1.Banner>
      <div className="self-center px-3 py-2 font-bold">{children}</div>
    </Banner_tsx_1.Banner>);
};
exports.FormError = FormError;
