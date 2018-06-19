define([
    'dojo/hash',
    'dojo/io-query',

    'esri/core/watchUtils',
    'esri/geometry/Point'
], (
    hash,
    ioQuery,

    watchUtils,
    Point
) => {
    const updateExtentHash = (mapView) => {
        // summary:
        //      sets the extent props in the url hash
        // mapView: esri/views/mapView
        console.log('map-tools/ExtentRouter:updateExtentHash', arguments);

        if ((!mapView.scale && !mapView.zoom) || !mapView.center) {
            return;
        }

        const center = mapView.center;
        // mixin any existing url props to allow for other routers
        const newProps = Object.assign(ioQuery.queryToObject(hash()), {
            x: Math.round(center.x),
            y: Math.round(center.y)
        });

        if (mapView.zoom) {
            newProps.zoom = mapView.zoom;
        } else {
            newProps.scale = Math.rount(mapView.scale);
        }

        return hash(ioQuery.objectToQuery(newProps), true);
    };

    return (mapView) => {
        // summary:
        //      sets up the url router for persisting the map extent
        // mapView: esri/views/mapView
        console.log('map-tools/ExtentRouter:constructor', arguments);

        const urlObj = ioQuery.queryToObject(hash());
        const options = {
            scale: parseInt(urlObj.scale, 10),
            center: new Point({
                x: parseInt(urlObj.x, 10),
                y: parseInt(urlObj.y, 10),
                spatialReference: {wkid: 3857}
            }),
            zoom: parseInt(urlObj.zoom, 10)
        };
        mapView.when(() => {
            if (options.center.x && options.center.y && (options.scale || options.zoom)) {
                if (options.zoom) {
                    mapView.zoom = options.zoom;
                } else {
                    mapView.scale = options.scale;
                }

                mapView.center = options.center;
            }
            watchUtils.whenTrue(mapView, 'stationary', updateExtentHash.bind(null, mapView));
        });

        // return for unit tests assertion
        return options;
    };
});
