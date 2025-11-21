"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirestore = exports.FirestoreProvider = void 0;
var utah_design_system_1 = require("@ugrc/utah-design-system");
var firestore_1 = require("firebase/firestore");
var react_1 = require("react");
var FirestoreContext = (0, react_1.createContext)(null);
var FirestoreProvider = function (props) {
    var app = (0, utah_design_system_1.useFirebaseApp)();
    var sdk = (0, firestore_1.getFirestore)(app);
    if (import.meta.env.DEV) {
        console.log('Connecting to Firestore emulator');
        (0, firestore_1.connectFirestoreEmulator)(sdk, 'localhost', 8080);
    }
    if (!app) {
        throw new Error('You cannot use the FirestoreProvider outside of a <FirebaseAppProvider />');
    }
    return <FirestoreContext.Provider value={{ firestore: sdk }} {...props}/>;
};
exports.FirestoreProvider = FirestoreProvider;
var useFirestore = function () {
    var value = (0, react_1.useContext)(FirestoreContext);
    if (value === null) {
        throw new Error('useFirestore must be used within a FirestoreProvider');
    }
    return value;
};
exports.useFirestore = useFirestore;
