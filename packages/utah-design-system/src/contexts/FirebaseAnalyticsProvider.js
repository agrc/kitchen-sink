"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAnalyticsProvider = FirebaseAnalyticsProvider;
exports.useFirebaseAnalytics = useFirebaseAnalytics;
var analytics_1 = require("firebase/analytics");
var react_1 = require("react");
var FirebaseAppProvider_1 = require("./FirebaseAppProvider");
var FirebaseAnalyticsContext = (0, react_1.createContext)(null);
function FirebaseAnalyticsProvider(props) {
    var app = (0, FirebaseAppProvider_1.useFirebaseApp)();
    var sdk = (0, analytics_1.getAnalytics)(app);
    // is this causing unnecessary re-renders?
    var logEvent = function (event, eventParams) {
        (0, analytics_1.logEvent)(sdk, event, eventParams);
    };
    return <FirebaseAnalyticsContext.Provider value={logEvent} {...props}/>;
}
function useFirebaseAnalytics() {
    var value = (0, react_1.useContext)(FirebaseAnalyticsContext);
    if (value === null) {
        throw new Error('useAnalytics must be used within a AnalyticsProvider');
    }
    return value;
}
