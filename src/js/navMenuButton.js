$(document).ready(function () {
    $('.nav-menu').on('click', function(){
        if($(this).hasClass('active')) {
            $('.box-menu').fadeOut(300);
        }
        else {
            $('.box-menu').fadeIn(300);
        }
        $('.nav-menu').toggleClass('active');
    });
});