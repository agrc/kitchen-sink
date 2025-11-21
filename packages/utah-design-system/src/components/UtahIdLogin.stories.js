"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
var auth_1 = require("firebase/auth");
var firebase_1 = require("../../tests/firebase");
var contexts_1 = require("../contexts");
var UtahIdLogin_1 = require("./UtahIdLogin");
var provider = new auth_1.OAuthProvider('oidc.utah-id');
var meta = {
    component: UtahIdLogin_1.UtahIdLogin,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        function (Story) { return (<contexts_1.FirebaseAppProvider config={firebase_1.firebaseConfig}>
        <contexts_1.FirebaseAuthProvider provider={provider}>
          <Story />
        </contexts_1.FirebaseAuthProvider>
      </contexts_1.FirebaseAppProvider>); },
    ],
    argTypes: {},
    args: {},
};
exports.default = meta;
exports.Example = {};
