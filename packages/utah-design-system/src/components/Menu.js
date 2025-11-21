"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = Menu;
exports.MenuItem = MenuItem;
exports.MenuSeparator = MenuSeparator;
exports.MenuSection = MenuSection;
var lucide_react_1 = require("lucide-react");
var react_aria_components_1 = require("react-aria-components");
var ListBox_1 = require("./ListBox");
var Popover_1 = require("./Popover");
function Menu(props) {
    return (<Popover_1.Popover placement={props.placement} className="min-w-36">
      <react_aria_components_1.Menu {...props} className="max-h-[inherit] overflow-auto p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"/>
    </Popover_1.Popover>);
}
function MenuItem(props) {
    return (<react_aria_components_1.MenuItem {...props} className={ListBox_1.dropdownItemStyles}>
      {(0, react_aria_components_1.composeRenderProps)(props.children, function (children, _a) {
            var selectionMode = _a.selectionMode, isSelected = _a.isSelected, hasSubmenu = _a.hasSubmenu;
            return (<>
            {selectionMode !== 'none' && (<span className="flex w-4 items-center">
                {isSelected && <lucide_react_1.Check aria-hidden className="h-auto w-4"/>}
              </span>)}
            <span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
              {children}
            </span>
            {hasSubmenu && (<lucide_react_1.ChevronRight aria-hidden className="absolute right-2 h-auto w-4"/>)}
          </>);
        })}
    </react_aria_components_1.MenuItem>);
}
function MenuSeparator(props) {
    return (<react_aria_components_1.Separator {...props} className="mx-3 my-1 border-b border-gray-300 dark:border-zinc-700"/>);
}
function MenuSection(props) {
    return <ListBox_1.DropdownSection {...props}/>;
}
