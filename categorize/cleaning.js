/* jshint node: true */
"use strict";

module.exports = {
    fixDates: function(data) {
        var isDate = /^[1-9][0-9]*\-[0-9]+\-[0-9]+$/;
        function fix(obj) {
            if (obj) {
                Object.keys(obj).forEach(function (key) {
                    var current = obj[key];
                    if ('object' == typeof current) {
                        fix(current);
                    }
                    else if (isDate.test(current)) {
                        obj[key] = new Date(current);
                    }
                });
            }
        }
        fix(data);
    }
};
