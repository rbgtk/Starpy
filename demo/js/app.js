"use strict";

const AJAX = (function() {
    function doGet(resource) {
        return new Promise(function (resolve, reject) {
            $.get(resource).done(resolve).fail(reject);
        });
    }

    function doPost(target, data) {
        return new Promise(function (resolve, reject) {
            $.post(target, data).done(resolve).fail(reject);
        });
    }

    return {
        get:  doGet,
        post: doPost
    }
})();

(function main() {
    Wallpaper.init("background-0.7").then(Wallpaper.start);
})();
