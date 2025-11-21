"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = void 0;
var tailwind_merge_1 = require("tailwind-merge");
var ts_md5_1 = require("ts-md5");
var size = 120;
var GravatarIcon = function () { return (<svg className="absolute bottom-1 right-1 size-3 fill-current text-slate-800/20 dark:text-slate-100/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27" role="presentation" aria-hidden="true">
    <path d="M10.8 2.699v9.45a2.699 2.699 0 005.398 0V5.862a8.101 8.101 0 11-8.423 1.913 2.702 2.702 0 00-3.821-3.821A13.5 13.5 0 1013.499 0 2.699 2.699 0 0010.8 2.699z"></path>
  </svg>); };
var Avatar = function (_a) {
    var _b, _c;
    var _d = _a.user, user = _d === void 0 ? { email: '', displayName: '' } : _d;
    if (((_c = (_b = user === null || user === void 0 ? void 0 : user.email) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) < 2) {
        return null;
    }
    return (<div className="flex flex-col items-end gap-6">
      <span className="relative">
        <span className="mr-2 inline-block size-14 overflow-hidden rounded-full border-2 border-primary-800 bg-primary-800">
          <Gravatar email={user.email} name={user.displayName}/>
        </span>
        <GravatarIcon />
      </span>
    </div>);
};
exports.Avatar = Avatar;
var Gravatar = function (_a) {
    var email = _a.email, name = _a.name;
    email = email || '';
    name = name || 'Anonymous Coward';
    var gravatar = "https://www.gravatar.com/avatar/".concat(ts_md5_1.Md5.hashAsciiStr(email.toLowerCase()), "?size=").concat(size, "&default=blank");
    var initials = getInitials(name);
    return (<>
      <div className="relative inline-flex h-full w-full items-center justify-center bg-primary-900">
        <div aria-hidden="true" className={(0, tailwind_merge_1.twJoin)('select-none text-center text-2xl font-extralight text-white opacity-60 dark:text-black', initials.length < 3 && 'text-3xl', initials.length === 3 && 'text-2xl')}>
          {initials}
        </div>
        <img src={gravatar} className="absolute left-0 top-0" alt={"".concat(name, "'s Gravatar")}/>
      </div>
    </>);
};
var getInitials = function (name) {
    name = name.trim();
    if (name.length <= 3) {
        return name;
    }
    return name
        .split(/\s+/)
        .map(function (w) { return __spreadArray([], w, true)[0]; })
        .slice(0, 3)
        .join('');
};
