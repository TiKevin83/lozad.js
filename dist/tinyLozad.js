var lozad = (function () {
    var observer = window.IntersectionObserver ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                lozad.triggerLoad(entry.target);
            }
        });
    }, {
            rootMargin: '50px',
            threshold: 0
        })
        : void 0;
    return {
        triggerLoad: function (element) {
            if (element.getAttribute('data-loaded') === 'true') return;
            if (observer) observer.unobserve(element);
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
            element.setAttribute('data-loaded', true);
        },
        observe: function () {
            [].forEach.call(document.querySelectorAll('.lozad'), function (element) {
                observer ? observer.observe(element) : lozad.triggerLoad(element);
            });
        }
    };
})();
