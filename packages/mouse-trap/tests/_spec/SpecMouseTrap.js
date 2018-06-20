require([
    'dojo/dom-construct',

    'esri/Map',
    'esri/views/MapView',

    'mouse-trap'
], (
    domConstruct,

    Map,
    MapView,

    MouseTrap
) => {
    describe('mouse-trap', () => {
        let mouseTrap;
        let mapView;

        beforeEach(() => {
            let map = new Map({
                basemap: 'streets'
            });

            mapView = new MapView({
                map,
                container: domConstruct.create('div', null, document.body)
            });
            mouseTrap = new MouseTrap({
                mapView
            });
        });

        afterEach(() => {
            domConstruct.empty(mapView.container);
        });

        it('sanity', () => {
            expect(mouseTrap).toEqual(jasmine.any(MouseTrap));
        });
    });
});
