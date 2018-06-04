require([
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/query',

    'esri/Map',
    'esri/views/MapView',

    'map-tools/MapView'
], function (
    domClass,
    domConstruct,
    query,

    Map,
    MapView,

    AGRCMapView
) {
    describe('map-tools/MapView', function () {
        let mapView;
        let esriView;

        beforeEach(function () {
            let map = new Map({basemap: 'streets'});
            esriView = new MapView({
                map,
                container: domConstruct.create('div', null, document.body)
            });
            mapView = new AGRCMapView(esriView);
        });

        afterEach(function () {
            domConstruct.empty(esriView.container);
        });

        it('sanity', function () {
            expect(mapView).toEqual(jasmine.any(AGRCMapView));
        });

        describe('constructor', function () {
            it('sets the default extent', function () {
                expect(esriView.extent).not.toBeNull();
            });

            it('switches out ESRI for AGRC attribution', function (done) {
                esriView.when(() => {
                    let link = query('.esri-attribution__link', esriView.container)[0];
                    expect(link.innerHTML).toBe('AGRC');
                    done();
                });
            });

            it('adds the loader to the ui', function (done) {
                esriView.when(() => {
                    expect(mapView.loader).toBeDefined();
                    let loaderNode = query('.sk-double-bounce', mapView.container)[0];
                    expect(loaderNode).toBeDefined();
                    done();
                });
            });
        });

        describe('toggleLoader', function () {
            it('toggles the hidden class', function (done) {
                esriView.when(() => {
                    expect(domClass.contains(mapView.loader.domNode, 'hidden')).toBe(true);

                    mapView.toggleLoader(true);

                    expect(domClass.contains(mapView.loader.domNode, 'hidden')).toBe(false);

                    mapView.toggleLoader(false);

                    expect(domClass.contains(mapView.loader.domNode, 'hidden')).toBe(true);
                    done();
                });
            });
        });
    });
});
