"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseAuth = exports.FirebaseAuthProvider = void 0;
var auth_1 = require("firebase/auth");
var react_1 = require("react");
var FirebaseAppProvider_1 = require("./FirebaseAppProvider");
var FirebaseAuthContext = (0, react_1.createContext)(null);
var FirebaseAuthProvider = function (props) {
    var provider = props.provider;
    var app = (0, FirebaseAppProvider_1.useFirebaseApp)();
    var sdk = (0, auth_1.getAuth)(app);
    var _a = (0, react_1.useState)(), currentUser = _a[0], setCurrentUser = _a[1];
    var _b = (0, react_1.useState)(false), ready = _b[0], setReady = _b[1];
    if (!app) {
        throw new Error('You cannot use the FirebaseAuthProvider outside of a <FirebaseAppProvider />');
    }
    (0, react_1.useEffect)(function () {
        var unsubscribe = (0, auth_1.onAuthStateChanged)(sdk, function (user) {
            setCurrentUser(user !== null && user !== void 0 ? user : undefined);
        });
        sdk.authStateReady().finally(function () { return setReady(true); });
        return function () { return unsubscribe(); };
    }, [sdk]);
    // @see https://firebase.google.com/docs/auth/web/google-signin
    var login = function () { return (0, auth_1.signInWithPopup)(sdk, provider); };
    var logout = function () { return (0, auth_1.signOut)(sdk); };
    (0, react_1.useEffect)(function () {
        if (app && import.meta.env.DEV) {
            var auth = (0, auth_1.getAuth)(app);
            if (!auth.emulatorConfig) {
                console.log('Connecting to Firebase Authentication emulator');
                (0, auth_1.connectAuthEmulator)(auth, 'http://127.0.0.1:9099', {
                    disableWarnings: true,
                });
            }
        }
    }, [app]);
    return (<FirebaseAuthContext.Provider value={{
            currentUser: currentUser,
            login: login,
            logout: logout,
            provider: provider,
            auth: sdk,
            ready: ready,
        }} {...props}/>);
};
exports.FirebaseAuthProvider = FirebaseAuthProvider;
var useFirebaseAuth = function () {
    var value = (0, react_1.useContext)(FirebaseAuthContext);
    if (value === null) {
        throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
    }
    return value;
};
exports.useFirebaseAuth = useFirebaseAuth;
