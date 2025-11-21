"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallScreenOverflow = exports.Example = void 0;
var Dialog_1 = require("./Dialog");
var Modal_1 = require("./Modal");
var meta = {
    component: Modal_1.Modal,
};
exports.default = meta;
exports.Example = {
    render: function () { return (<Modal_1.Modal isOpen={true}>
      <Dialog_1.Dialog>
        <p>
          This web map depicts known existing bicycle paths, lanes, and paths.
          An alternate map view conveys a comparative level of traffic stress
          (LTS) that users might experience when bicycling along major roadways.
        </p>
      </Dialog_1.Dialog>
    </Modal_1.Modal>); },
};
exports.SmallScreenOverflow = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    render: function () { return (<Modal_1.Modal isOpen={true}>
      <Dialog_1.Dialog>
        <p>
          This web map depicts known existing bicycle paths, lanes, and paths.
          An alternate map view conveys a comparative level of traffic stress
          (LTS) that users might experience when bicycling along major roadways.
        </p>
        <p>
          This dataset is updated periodically but users are advised that the
          map may not reflect current conditions on the ground, and may contain
          errors or omissions. User can click on any location on the map to
          indicate where updated data is needed.
        </p>
        <p>Use of this information is at your own risk.</p>
        <p>
          This dataset is updated periodically but users are advised that the
          map may not reflect current conditions on the ground, and may contain
          errors or omissions. User can click on any location on the map to
          indicate where updated data is needed.
        </p>
        <p>Use of this information is at your own risk.</p>
      </Dialog_1.Dialog>
    </Modal_1.Modal>); },
};
