"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseStorage = exports.FirebaseStorageProvider = void 0;
var utah_design_system_1 = require("@ugrc/utah-design-system");
var storage_1 = require("firebase/storage");
var react_1 = require("react");
var FirebaseStorageContext = (0, react_1.createContext)(null);
var FirebaseStorageProvider = function (props) {
    var app = (0, utah_design_system_1.useFirebaseApp)();
    var sdk = (0, storage_1.getStorage)(app, props.bucketUrl);
    if (app && import.meta.env.DEV) {
        console.log('Connecting to Firebase Storage emulator');
        (0, storage_1.connectStorageEmulator)(sdk, 'localhost', 9199);
    }
    if (!app) {
        throw new Error('You cannot use the FirebaseStorageProvider outside of a <FirebaseAppProvider />');
    }
    return (<FirebaseStorageContext.Provider value={{ storage: sdk }} {...props}/>);
};
exports.FirebaseStorageProvider = FirebaseStorageProvider;
var useFirebaseStorage = function () {
    var value = (0, react_1.useContext)(FirebaseStorageContext);
    if (value === null) {
        throw new Error('useFirebaseStorage must be used within a FirebaseStorageProvider');
    }
    return value;
};
exports.useFirebaseStorage = useFirebaseStorage;
