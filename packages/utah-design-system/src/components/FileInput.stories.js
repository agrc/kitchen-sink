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
exports.MultipleFilesWithTypeRestriction = exports.ReactHookFormValidation = exports.HtmlValidation = exports.WithoutFileSize = exports.WithError = exports.Disabled = exports.PDFOnly = exports.ImageOnly = exports.MultipleFiles = exports.Required = exports.WithDescription = exports.Example = void 0;
var react_hook_form_1 = require("react-hook-form");
var Button_1 = require("./Button");
var FileInput_1 = require("./FileInput");
var meta = {
    component: FileInput_1.FileInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        label: 'Upload file',
    },
};
exports.default = meta;
exports.Example = {
    args: {
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.WithDescription = {
    args: {
        description: 'Select a file to upload. Maximum file size: 10MB',
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.Required = {
    args: {
        isRequired: true,
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.MultipleFiles = {
    args: {
        label: 'Upload files',
        allowsMultiple: true,
        placeholder: 'Drag multiple files here or click to upload',
    },
};
exports.ImageOnly = {
    args: {
        label: 'Upload image',
        acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
        placeholder: 'Drag an image here or click to upload',
        description: 'Only PNG, JPEG, and GIF images are accepted',
    },
};
exports.PDFOnly = {
    args: {
        label: 'Upload PDF',
        acceptedFileTypes: ['application/pdf'],
        placeholder: 'Drag a PDF here or click to upload',
        description: 'Only PDF files are accepted',
    },
};
exports.Disabled = {
    args: {
        isDisabled: true,
        placeholder: 'File upload is disabled',
    },
};
exports.WithError = {
    args: {
        isInvalid: true,
        errorMessage: 'Please select a file',
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.WithoutFileSize = {
    args: {
        showFileSize: false,
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.HtmlValidation = {
    render: function (args) { return (<form onSubmit={function (event) {
            event.preventDefault();
            console.log('Form submitted');
        }} className="flex flex-col items-start gap-2">
      <FileInput_1.FileInput {...args}/>
      <Button_1.Button type="submit" variant="secondary">
        Submit
      </Button_1.Button>
    </form>); },
    args: {
        isRequired: true,
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.ReactHookFormValidation = {
    render: function (args) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var _a = (0, react_hook_form_1.useForm)({
            defaultValues: {
                files: null,
            },
        }), control = _a.control, handleSubmit = _a.handleSubmit;
        return (<form className="flex flex-col items-start gap-4" onSubmit={handleSubmit(function (data) {
                console.log('Form data:', data);
            })}>
        <react_hook_form_1.Controller control={control} name="files" rules={{ required: 'Please select at least one file' }} render={function (_a) {
                var _b;
                var _c = _a.field, onChange = _c.onChange, field = __rest(_c, ["onChange"]), fieldState = _a.fieldState;
                return (<FileInput_1.FileInput errorMessage={(_b = fieldState.error) === null || _b === void 0 ? void 0 : _b.message} isInvalid={fieldState.invalid} onSelect={function (fileList) {
                        onChange(fileList);
                    }} {...field} {...args}/>);
            }}/>
        <Button_1.Button type="submit" variant="secondary">
          Submit
        </Button_1.Button>
      </form>);
    },
    args: {
        label: 'Upload document',
        placeholder: 'Drag a file here or click to upload',
    },
};
exports.MultipleFilesWithTypeRestriction = {
    args: {
        label: 'Upload images',
        allowsMultiple: true,
        acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
        placeholder: 'Drag multiple images here or click to upload',
        description: 'Only PNG, JPEG, and WebP images are accepted',
    },
};
