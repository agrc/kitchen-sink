"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseFunctions = exports.FirebaseFunctionsProvider = void 0;
var utah_design_system_1 = require("@ugrc/utah-design-system");
var functions_1 = require("firebase/functions");
var react_1 = require("react");
var FunctionsContext = (0, react_1.createContext)(null);
var FirebaseFunctionsProvider = function (props) {
    var app = (0, utah_design_system_1.useFirebaseApp)();
    var sdk = (0, functions_1.getFunctions)(app);
    if (import.meta.env.DEV) {
        console.log('Connecting to Firebase Functions emulator');
        (0, functions_1.connectFunctionsEmulator)(sdk, 'localhost', 5001);
    }
    if (!app) {
        throw new Error('You cannot use the FirebaseFunctionsProvider outside of a <FirebaseAppProvider />');
    }
    return <FunctionsContext.Provider value={{ functions: sdk }} {...props}/>;
};
exports.FirebaseFunctionsProvider = FirebaseFunctionsProvider;
var useFirebaseFunctions = function () {
    var value = (0, react_1.useContext)(FunctionsContext);
    if (value === null) {
        throw new Error('useFirebaseFunctions must be used within a FirebaseFunctionsProvider');
    }
    return value;
};
exports.useFirebaseFunctions = useFirebaseFunctions;
