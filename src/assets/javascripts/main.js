$(document).ready(function($){
    const $general = $('#general');

    const carousel = () => {
        $('.carousel', $general).each(function() {
            const $carousel = $(this);
            const $wrapper = $('.wrapper', $carousel);
            let options = {
                items: 1,
                lazyLoad: true,
                loop: true,
                dotsContainer: $('.pagination', $carousel),
                navContainer: $wrapper,
                nav: true,
                dots: true,
                autoplay:true,
                autoplayTimeout:10000,
                autoplayHoverPause:true,
                responsive: {
                    0: {
                        autoHeight: true,
                        items: 1,
                    },
                    767: {
                        autoHeight: false,
                        items: 1,
                    }
                }
            };

            $($wrapper).owlCarousel(options);
        })
    }

    // INIT
    carousel();

    AOS.init({
        // disable: 'mobile',
        offset: 120,
        duration: 1200,
        delay: 100
    });
});
