$(document).ready(function() {

    $("#owl-demo").owlCarousel({
        autoPlay: false,
        stopOnHover: true,
        loop: true,
        center: true,
        navigation: true,
        navigationText: [
            "<img	src='pic/left.png'>",
            "<img	src='pic/right.png'>"
        ],
        items: 3,
        itemsDesktop: [1024,3],
        itemsDesktopSmall: [768,2],
        itemsMobile: [480,1]
    });
});