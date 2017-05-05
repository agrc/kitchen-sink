// TODO:
// initRouter: function () {
//     // summary:
//     //      sets up the url router for persisting the map extent
//     console.log('agrc.widgets.map.BaseMap::initRouter', arguments);
//
//     var that = this;
//     var urlObj = ioQuery.queryToObject(hash());
//     var options = {
//         scale: parseInt(urlObj.scale, 10),
//         center: new Point({
//             x: parseInt(urlObj.x, 10),
//             y: parseInt(urlObj.y, 10),
//             spatialReference: {wkid: 3857}
//         })
//     };
//     this.on('load', function () {
//         if (urlObj.x && urlObj.y && urlObj.scale) {
//             that.setScale(options.scale);
//             that.centerAt(options.center);
//         }
//         that.on('extent-change', lang.hitch(that, 'updateExtentHash'));
//     });
//
//     return (options.scale && options.center.x && options.center.y) ? options : {};
// },
// updateExtentHash: function () {
//     // summary:
//     //      sets the extent props in the url hash
//     console.log('agrc.widgets.map.BaseMap::updateExtentHash', arguments);
//
//     var center = this.extent.getCenter();
//     if (center.x && center.y) {
//         // mixin any existing url props to allow for other routers
//         var newProps = lang.mixin(ioQuery.queryToObject(hash()), {
//             x: Math.round(center.x),
//             y: Math.round(center.y),
//             scale: Math.round(this.getScale())
//         });
//
//         return hash(ioQuery.objectToQuery(newProps), true);
//     }
// }
