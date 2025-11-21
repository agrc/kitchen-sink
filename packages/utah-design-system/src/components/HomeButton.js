"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeButton = void 0;
require("@arcgis/core/interfaces.d.ts");
var hooks_1 = require("@ugrc/utilities/hooks");
var lucide_react_1 = require("lucide-react");
var Button_1 = require("./Button");
var HomeButton = function (_a) {
    var view = _a.view, position = _a.position, initialExtent = _a.initialExtent, actions = _a.actions;
    var goHome = (0, hooks_1.useDefaultExtent)(view, initialExtent);
    var uiPosition = (0, hooks_1.useViewUiPosition)(view, position !== null && position !== void 0 ? position : 'top-left');
    return (<div ref={uiPosition} className="group/icon flex size-[32px] items-center justify-center bg-white shadow-[0_1px_2px_#0000004d] dark:bg-zinc-800 dark:ring-white/10">
      <Button_1.Button variant="icon" className="group/button group/icon-hover:bg-[#f3f3f3] size-full stroke-[4] p-0 transition-colors duration-150 ease-in-out will-change-transform focus:min-h-0 focus:outline-offset-[-2px]" aria-label="Default extent" onPress={function () {
            goHome();
            actions === null || actions === void 0 ? void 0 : actions.forEach(function (action) { return action(); });
        }}>
        <lucide_react_1.HomeIcon className="group-enabled/button:[#6e6e6e] group-disabled/button:[#cfcfcf] size-5 stroke-[1.5] transition-colors duration-150 ease-in-out will-change-transform group-enabled/button:group-hover/button:text-[#151515] group-disabled/button:opacity-50 dark:text-[#9e9e9e] dark:group-enabled/button:group-hover/button:text-white" aria-hidden/>
        <span className="sr-only">Go Home</span>
      </Button_1.Button>
    </div>);
};
exports.HomeButton = HomeButton;
