define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',

    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/text!./resources/templates/loader.html',
    'dojo/_base/declare'
], (
    _TemplatedMixin,
    _WidgetBase,

    domClass,
    domConstruct,
    query,
    loaderTemplate,
    declare
) => {
    return declare(null, {
        // loader: DomNode
        //      the widget containing the loader animation
        loader: null,

        constructor(mapView) {
            // summary:
            //      Customizes the esri map view in the following ways:
            //          - sets the extent to be the state of utah
            //          - "Powered by ESRI" -> "Powered by AGRC"
            //          - adds a loader
            // mapView: esri/views/MapView
            console.log('map-tools/MapView:constructor', arguments);

            mapView.extent = {
                xmax: -11762120.612131765,
                xmin: -13074391.513731329,
                ymax: 5225035.106177688,
                ymin: 4373832.359194187,
                spatialReference: 3857
            }

            // wait until dom has been built
            mapView.when(() => {
                // AGRC attribution
                let poweredByDiv = query('.esri-attribution__powered-by', mapView.container)[0]
                domConstruct.empty(poweredByDiv);
                poweredByDiv.innerHTML = 'Built by ';
                domConstruct.create('a', {
                    href: 'https://gis.utah.gov',
                    innerHTML: 'AGRC',
                    target: '_blank',
                    'class': 'esri-attribution__link'
                }, poweredByDiv);

                // loader - required to be a widget so as to retain a reference to the dom node for use in toggleLoader
                this.loader = new (declare([_WidgetBase, _TemplatedMixin], {
                    templateString: loaderTemplate,
                    baseClass: 'hidden sk-double-bounce'
                }))();
                mapView.ui.add(this.loader, 'bottom-left');
            });
        },
        toggleLoader(show) {
            // summary:
            //      toggles the visibility of the loader on the map
            console.log('map-tools/Mapview:toggleLoader', arguments);

            domClass.toggle(this.loader.domNode, 'hidden', !show);
        }
    });
});
