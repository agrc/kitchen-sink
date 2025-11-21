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
exports.FileInput = FileInput;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var react_aria_components_1 = require("react-aria-components");
var tailwind_merge_1 = require("tailwind-merge");
var tailwind_variants_1 = require("tailwind-variants");
var Field_1 = require("./Field");
var utils_1 = require("./utils");
var dropZoneStyles = (0, tailwind_variants_1.tv)({
    extend: utils_1.focusRing,
    base: 'group flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-white p-6 text-center transition-colors hover:border-primary-900 hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:border-secondary-600 dark:hover:bg-zinc-800',
    variants: {
        isDisabled: {
            true: 'cursor-not-allowed border-gray-200 bg-gray-50 hover:border-gray-200 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800',
            false: 'border-zinc-300 dark:border-zinc-600',
        },
        isInvalid: {
            true: 'border-warning-600 hover:border-warning-700 dark:border-warning-600 dark:hover:border-warning-500',
        },
    },
});
var fileListStyles = (0, tailwind_variants_1.tv)({
    base: 'mt-2 space-y-2',
});
var fileItemStyles = (0, tailwind_variants_1.tv)({
    base: 'flex items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800',
});
function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
function FileInput(_a) {
    var label = _a.label, description = _a.description, errorMessage = _a.errorMessage, isRequired = _a.isRequired, isDisabled = _a.isDisabled, isInvalid = _a.isInvalid, _b = _a.placeholder, placeholder = _b === void 0 ? 'Drag a file here or click to upload' : _b, _c = _a.showFileSize, showFileSize = _c === void 0 ? true : _c, className = _a.className, allowsMultiple = _a.allowsMultiple, acceptedFileTypes = _a.acceptedFileTypes, onSelect = _a.onSelect, props = __rest(_a, ["label", "description", "errorMessage", "isRequired", "isDisabled", "isInvalid", "placeholder", "showFileSize", "className", "allowsMultiple", "acceptedFileTypes", "onSelect"]);
    var _d = (0, react_1.useState)([]), selectedFiles = _d[0], setSelectedFiles = _d[1];
    var handleSelect = function (fileList) {
        if (fileList) {
            var files = Array.from(fileList);
            setSelectedFiles(files);
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(fileList);
        }
    };
    var removeFile = function (index) {
        var updated = selectedFiles.filter(function (_, i) { return i !== index; });
        setSelectedFiles(updated);
        // Create a new FileList-like object and notify parent
        try {
            var dataTransfer_1 = new DataTransfer();
            updated.forEach(function (file) { return dataTransfer_1.items.add(file); });
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(dataTransfer_1.files);
        }
        catch (error) {
            // DataTransfer not available in this environment
            console.warn('DataTransfer API not available:', error);
        }
    };
    var clearFiles = function () {
        setSelectedFiles([]);
        // Notify parent that files have been cleared
        onSelect === null || onSelect === void 0 ? void 0 : onSelect(null);
    };
    return (<div className={(0, tailwind_merge_1.twMerge)('flex flex-col gap-1', className)}>
      {label && (<Field_1.Label className={(0, tailwind_merge_1.twJoin)(isRequired &&
                "after:ml-0.5 after:text-warning-500 after:content-['*'] after:dark:text-warning-300")}>
          {label}
        </Field_1.Label>)}

      <react_aria_components_1.FileTrigger {...props} allowsMultiple={allowsMultiple} acceptedFileTypes={acceptedFileTypes} onSelect={handleSelect}>
        <react_aria_components_1.Button isDisabled={isDisabled} className={dropZoneStyles({
            isDisabled: isDisabled,
            isInvalid: isInvalid,
        })}>
          <lucide_react_1.UploadIcon className={(0, tailwind_merge_1.twJoin)('h-8 w-8', isDisabled
            ? 'text-gray-300 dark:text-zinc-600'
            : 'text-zinc-400 dark:text-zinc-500')}/>
          <div className={(0, tailwind_merge_1.twJoin)('text-sm', isDisabled
            ? 'text-gray-400 dark:text-zinc-600'
            : 'text-zinc-600 dark:text-zinc-400')}>
            {placeholder}
          </div>
          {acceptedFileTypes && acceptedFileTypes.length > 0 && (<div className="text-xs text-zinc-500 dark:text-zinc-500">
              Accepted types: {acceptedFileTypes.join(', ')}
            </div>)}
        </react_aria_components_1.Button>
      </react_aria_components_1.FileTrigger>

      {selectedFiles.length > 0 && (<div className={fileListStyles()}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {selectedFiles.length}{' '}
              {selectedFiles.length === 1 ? 'file' : 'files'} selected
            </div>
            <button type="button" onClick={clearFiles} disabled={isDisabled} className="rounded px-2 py-1 text-sm text-primary-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-secondary-600 dark:hover:bg-zinc-800">
              Clear all
            </button>
          </div>
          <div className="space-y-1">
            {selectedFiles.map(function (file, index) { return (<div key={"".concat(file.name, "-").concat(file.size, "-").concat(file.lastModified)} className={fileItemStyles()}>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="truncate font-medium text-zinc-800 dark:text-zinc-200">
                    {file.name}
                  </div>
                  {showFileSize && (<div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatFileSize(file.size)}
                    </div>)}
                </div>
                <button type="button" onClick={function () { return removeFile(index); }} disabled={isDisabled} className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-700" aria-label={"Remove ".concat(file.name)}>
                  <lucide_react_1.XIcon className="h-4 w-4 text-zinc-600 dark:text-zinc-400"/>
                </button>
              </div>); })}
          </div>
        </div>)}

      {description && <Field_1.Description>{description}</Field_1.Description>}
      {isInvalid && errorMessage && <Field_1.FieldError>{errorMessage}</Field_1.FieldError>}
    </div>);
}
