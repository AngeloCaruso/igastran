$( function(){
    $('.carousel').carousel('pause');
    $('.nav1').on('click', function () {
        $('.carousel').carousel(0);
        $('.carousel').carousel('pause');
    });
    $('.nav2').on('click', function () {
        $('.carousel').carousel(1);
        $('.carousel').carousel('pause');
    });

});