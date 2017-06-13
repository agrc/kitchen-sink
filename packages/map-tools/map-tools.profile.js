/*eslint-disable no-unused-vars, no-undef */
var profile = (function () {
    var testResourceRe = /.*\/tests\//;
    var copyOnly = function (filename, mid) {
        var list = {
            'map-tools/map-tools.profile': true,
            'map-tools/package.json': true
        };
        return (mid in list) ||
            (/^resources\//.test(mid) && !/\.css$/.test(filename)) ||
            /(png|jpg|jpeg|gif|tiff)$/.test(filename);
    };
    var ignores = {
        'map-tools/Gruntfile': true
    };

    return {
        resourceTags: {
            test: function (filename, mid) {
                return testResourceRe.test(mid);
            },
            copyOnly: function (filename, mid) {
                return copyOnly(filename, mid);
            },
            amd: function (filename, mid) {
                return (/\.js$/).test(filename);
            },
            ignore: function (filename, mid) {
                return mid in ignores || /.*\/[node_modules|bower_components]\//.test(mid);
            }
        }
    };
}());
