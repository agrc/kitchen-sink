"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAppProvider = FirebaseAppProvider;
exports.useFirebaseApp = useFirebaseApp;
var app_1 = require("firebase/app");
var react_1 = require("react");
var FirebaseAppContext = (0, react_1.createContext)(null);
var appVersion = import.meta.env.PACKAGE_VERSION;
function FirebaseAppProvider(props) {
    var config = props.config;
    var initializedApp = (0, react_1.useMemo)(function () {
        (0, app_1.registerVersion)('react', react_1.version || 'unknown');
        (0, app_1.registerVersion)('app', appVersion || 'unknown');
        return (0, app_1.initializeApp)(config);
    }, [config]);
    return <FirebaseAppContext.Provider value={initializedApp} {...props}/>;
}
function useFirebaseApp() {
    var app = (0, react_1.useContext)(FirebaseAppContext);
    if (!app) {
        throw new Error('You cannot use the useFirebaseApp hook outside of a <FirebaseAppProvider />');
    }
    return app;
}
