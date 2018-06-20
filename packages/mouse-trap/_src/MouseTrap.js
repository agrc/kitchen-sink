define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',

    'dojo/debounce',

    'dojo/_base/declare',

    'esri/geometry/projection'
], (
    _TemplatedMixin,
    _WidgetBase,

    debounce,

    declare,

    projection
) => {
    return declare([_WidgetBase, _TemplatedMixin], {
        // description:
        //      shows the x,y value of the mouse on the screen
        templateString: '<div><div data-dojo-attach-point="coords"></div></div>',
        baseClass: 'mouse-trap',
        decimals: 3,
        wait: 25,

        // Properties to be sent into constructor

        mapView: null,
        projectToWkid: 26912,

        postCreate() {
            // summary:
            //      Overrides method of same name in dijit._Widget.
            console.log('app/mouse-trap:postCreate', arguments);

            this.inherited(arguments);

            if (!this.mapView) {
                console.error('app/mouse-trap::A MapView is required for this widget.');

                return;
            }

            if (!projection.isSupported()) {
                console.error('app/mouse-trap::Geometry projection is not supported.');

                return;
            }

            projection.load().then(() => {
                this.setupConnections();
            });
        },
        setupConnections() {
            // summary:
            //      wire events, and such
            console.log('app/mouse-trap:setupConnections', arguments);

            this.own(
                this.mapView.on('pointer-move', debounce((evt) => this._updateCoordinates(evt), this.wait))
            );
        },
        _updateCoordinates(evt) {
            // summary:
            //      converts the screen coords to utm coords and displays them
            // mouse move events
            console.debug('app/mouse-trap:updateCoordinates', arguments);

            if (!projection.isLoaded()) {
                projection.load();

                return;
            }

            const viewPoint = this.mapView.toMap(evt);
            const projected = projection.project(viewPoint, { wkid: this.projectToWkid });

            if (!projected) {
                console.log('app/mouse-trap::Projected point is null. Possibly outside of spatial reference area.');

                return;
            }

            this.coords.innerHTML = `${projected.x.toFixed(this.decimals)}, ${projected.y.toFixed(this.decimals)}`;
        }
    });
});
