$(function () {

    const toast = swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
    });

    $('.btnLogout').on('click', function () {
        $.ajax({
            type: "post",
            url: "/logout",
            success: function (response) {
                if (response == 'ok') {
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

    $('.formRegister').on('submit', function (e) {
        e.preventDefault()
        $('.regErr').text('')
        $.ajax({
            type: "post",
            url: "/register",
            data: {
                username: $('.regUsuario').val(),
                password: $('.regPass').val(),
                correo: $('.regCorreo').val(),
                nombre: $('.regName').val(),
                apellidos: $('.regApell').val()
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

    $('.btn_follow').on('click', function () {
        let id = $('.btn_follow').attr('id');
        $.ajax({
            type: "post",
            url: "/follow",
            data: {
                id: id
            },
            success: function (res) {
                console.log(res)
                if (res == 'Not-Following') {
                    toast({
                        type: 'warning',
                        title: 'Has dejado de seguir a este usuario'
                    })
                }
                if (res == 'Following' || res == 'New-Following') {
                    toast({
                        type: 'success',
                        title: 'Ahora sigues a este usuario'
                    })
                }
                if(res == 'soledad'){
                    toast({
                        type: 'question',
                        title: 'No te puedes seguir a ti mismo',
                        footer:'¿Tan solo estás?'
                    })
                }
            }
        });
    })

    $('.formSearch').on('submit', function (e) {
        e.preventDefault()
        let user = $('.inputBuscar').val();
        $.ajax({
            type: "post",
            url: "/checkUser",
            data:{
                username: user
            },
            success: function (res) {
                console.log(res)
                if(res == 'Error'){
                    location.href = '/profile/' + user
                }else{
                    toast({
                        type: 'error',
                        title: 'El usuario no existe'
                    })
                }
            }
        });
    })

    $('.formUpload').on('submit', function (e) {
        e.preventDefault()
        let formData = new FormData($('.formUpload')[0])
        $.ajax({
            type: "post",
            url: "/upload",
            contentType: false,
            processData: false,
            data: formData,
            success: function (response) {
                if (response == 'Ok') {
                    location.href = '/'
                }
            }
        });
        $('.formUpload').trigger('reset')
    })

    $('.formUploadProf').on('submit', function (e) {
        e.preventDefault()
        let formData = new FormData($('.formUploadProf')[0])
        $.ajax({
            type: "post",
            url: "/updateProfile",
            contentType: false,
            processData: false,
            data: formData,
            success: function (response) {
                if (response == 'Ok') {
                    location.href = '/profile'
                }
            }
        });
        $('.formUploadProf').trigger('reset')
    })

    $('.formUploadBg').on('submit', function (e) {
        e.preventDefault()
        let formData = new FormData($('.formUploadBg')[0])
        $.ajax({
            type: "post",
            url: "/updateBg",
            contentType: false,
            processData: false,
            data: formData,
            success: function (response) {
                if (response == 'Ok') {
                    location.href = '/profile'
                }
            }
        });
        $('.formUploadBg').trigger('reset')
    })

    lc_lightbox('.imgContainer div.cardImg');
})