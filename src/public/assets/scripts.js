$(function () {

    
    $('.btnLogout').on('click', function(){
        $.ajax({
            type: "post",
            url: "/logout",
            success: function (response) {
                if(response == 'ok'){
                    window.location.href = '/'
                }
            }
        });
    })
    
    $('.formLogin').on('submit', function (e) {
        e.preventDefault()
        $('.loginErr').text('')
        $.ajax({
            type: "post",
            url: "/login",
            data: {
                username: $('.userLogin').val(),
                password: $('.passLogin').val()
            },
            success: function (res) {
                console.log(res)
                if (res == 'Ok') {
                    window.location.href = '/'
                }
            },
            error: function () {
                $('.loginErr').text('Usuario o contraseña incorrectos');
            }
        });
    })

    $('.regUsuario').on('focusout', function () {
        if ($('.regUsuario').val()) {
            $.ajax({
                type: "post",
                url: "/checkUser",
                data: {
                    username: $('.regUsuario').val()
                },
                success: function (res) {
                    console.log(res)
                    if (res == 'Error') {
                        $('.regUsuario').css('background-image', 'linear-gradient(to top, #9c27b0 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, #f44336 1px, rgba(210, 210, 210, 0) 1px)')
                        $('.userErr').text('clear')
                        $('.userInput').removeClass('has-success')
                        $('.userInput').addClass('has-danger')
                    } else {
                        $('.regUsuario').css('background-image', 'linear-gradient(to top, #9c27b0 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, #4caf50 1px, rgba(210, 210, 210, 0) 1px)')
                        $('.userErr').text('done')
                        $('.userInput').removeClass('has-danger')
                        $('.userInput').addClass('has-success')
                    }
                }
            });
        }
    });
    $('.regCorreo').on('focusout', function () {
        if ($('.regCorreo').val()) {
            $.ajax({
                type: "post",
                url: "/checkUser",
                data: {
                    username: $('.regCorreo').val()
                },
                success: function (res) {
                    console.log(res)
                    if (res == 'Error') {
                        $('.regCorreo').css('background-image', 'linear-gradient(to top, #9c27b0 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, #f44336 1px, rgba(210, 210, 210, 0) 1px)')
                        $('.emailErr').text('clear')
                        $('.emailInput').removeClass('has-success')
                        $('.emailInput').addClass('has-danger')
                    } else {
                        $('.regCorreo').css('background-image', 'linear-gradient(to top, #9c27b0 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, #4caf50 1px, rgba(210, 210, 210, 0) 1px)')
                        $('.emailErr').text('done')
                        $('.emailInput').removeClass('has-danger')
                        $('.emailInput').addClass('has-success')
                    }
                }
            });
        }
    });
    $('.regConfPass').on('focusout', function () {
        let pass1 = $('.regPass').val();
        let pass2 = $('.regConfPass').val();
        $('.regErr').text(' ');
        if (pass1 != pass2) {
            $('.regErr').text('Las contraseñas no coinciden');
        }
    });
    $('.btn_follow').on('click', function(){
        let id = $('.btn_follow').attr('id');
        $.ajax({
            type: "post",
            url: "/follow",
            data: {
                id: id
            },
            dataType: "dataType",
            success: function (response) {
                
            }
        });
    })
    lc_lightbox('.imgContainer div.cardImg');
})