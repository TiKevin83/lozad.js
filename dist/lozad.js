/*! lozad.js - v1.6.0 - 2018-08-11
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2018 Apoorv Saxena; Licensed MIT */


(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.lozad = factory());
}(this, (function () {
    'use strict';

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    var defaultConfig = {
        rootMargin: '0px',
        threshold: 0,
        load: function load(element) {
            if (element.nodeName.toLowerCase() === 'picture') {
                var img = document.createElement('img');

                if (element.hasAttribute('data-iesrc'))
                    img.src = element.getAttribute('data-iesrc');

                if (element.hasAttribute('data-alt'))
                    img.alt = element.getAttribute('data-alt');

                element.appendChild(img);
            }
            if (element.hasAttribute('data-src'))
                element.src = element.getAttribute('data-src');

            if (element.hasAttribute('data-srcset'))
                element.srcset = element.getAttribute('data-srcset');

            if (element.hasAttribute('data-background-image'))
                element.style.backgroundImage = 'url(\'' + element.getAttribute('data-background-image') + '\')';

            if (element.hasAttribute('data-toggle-class'))
                element.classList.toggle(element.getAttribute('data-toggle-class'));
        },
        loaded: function loaded() { }
    };

    function markAsLoaded(element) {
        element.setAttribute('data-loaded', true);
    }

    var isLoaded = function isLoaded(element) {
        return element.getAttribute('data-loaded') === 'true';
    };

    var onIntersection = function onIntersection() {
        return function (entries) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    lozad().triggerLoad(entry.target);
                }
            });
        };
    };

    var getElements = function getElements(selector) {
        if (selector instanceof Element) {
            return [selector];
        }
        if (selector instanceof NodeList) {
            return selector;
        }
        return document.querySelectorAll(selector);
    };

    function lozad() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _defaultConfig$option = _extends({}, defaultConfig, options),
            root = _defaultConfig$option.root,
            rootMargin = _defaultConfig$option.rootMargin,
            threshold = _defaultConfig$option.threshold,
            load = _defaultConfig$option.load,
            loaded = _defaultConfig$option.loaded;

        var observer = void 0;

        if (window.IntersectionObserver) {
            observer = new IntersectionObserver(onIntersection(), {
                root: root,
                rootMargin: rootMargin,
                threshold: threshold
            });
        }

        return {
            observe: function observe() {
                var elements = getElements(selector);

                for (var i = 0; i < elements.length; i++) {
                    if (observer) {
                        observer.observe(elements[i]);
                        continue;
                    }
                    lozad().triggerLoad(elements[i]);
                }
            },
            triggerLoad: function triggerLoad(element) {
                if (isLoaded(element)) {
                    return;
                }
                if (observer) observer.unobserve(element);

                load(element);
                markAsLoaded(element);
                loaded(element);
            }
        };
    }

    return lozad;

})));
