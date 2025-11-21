"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusyBar = exports.Spinner = void 0;
var react_aria_1 = require("react-aria");
var tailwind_merge_1 = require("tailwind-merge");
var Spinner = function () {
    var progressBarProps = (0, react_aria_1.useProgressBar)({
        'aria-label': 'Loading…',
        isIndeterminate: true,
    }).progressBarProps;
    return (<svg {...progressBarProps} className="size-full shrink-0 motion-safe:animate-spin" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>);
};
exports.Spinner = Spinner;
exports.Spinner.sleep = function (ms) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
}); }); };
exports.Spinner.minDelay = function minDelay(promise_1) {
    return __awaiter(this, arguments, void 0, function (promise, ms) {
        if (ms === void 0) { ms = 700; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.allSettled([promise, exports.Spinner.sleep(ms)])];
                case 1:
                    _a.sent();
                    return [2 /*return*/, promise];
            }
        });
    });
};
var BusyBar = function (_a) {
    var busy = _a.busy;
    var progressBarProps = (0, react_aria_1.useProgressBar)({
        'aria-label': 'Loading…',
        isIndeterminate: true,
    }).progressBarProps;
    return (<div {...progressBarProps} className={(0, tailwind_merge_1.twJoin)([busy ? 'opacity-100' : 'opacity-0'], 'will-change absolute inset-x-0 top-0 z-[1] h-2 w-full min-w-full animate-gradient-x bg-gradient-to-r from-secondary-700/90 from-30% via-accent-400/90 to-primary-800/90 to-70% transition-all duration-700 ease-in-out')}></div>);
};
exports.BusyBar = BusyBar;
