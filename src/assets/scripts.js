var config = {
    apiKey: "AIzaSyAWSgBIxjLK9hHwegfTydU2KVgJC8VStWQ",
    authDomain: "igastran-v1.firebaseapp.com",
    databaseURL: "https://igastran-v1.firebaseio.com",
    projectId: "igastran-v1",
    storageBucket: "igastran-v1.appspot.com",
    messagingSenderId: "357734557944"
};
firebase.initializeApp(config);

//Vigilante de usuarios
var actualUser
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //console.log(user)
        actualUser = user
    } else {
        console.log('No hay usuario');
    }
})

$(function () {

    if($('body').attr('id') == 'main'){
        
    }

    $('.formLogin').on('submit', function (e) {
        e.preventDefault()
        let email = $('.userLogin').val()
        let password = $('.passLogin').val()
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                //console.log(user.user.uid)
                location.href = '/main/'+user.user.uid
            })
            .catch(err => {
                console.log(err)
            })
    })
    $('.formRegister').on("submit", function (e) {
        e.preventDefault()
        let datos = {
            nombre: $('.regName').val(),
            apellidos: $('.regApell').val(),
            correo: $('.regCorreo').val(),
            password: $('.regPass').val()
        }
        $.ajax({
            type: "post",
            url: "/register",
            data: datos,
            dataType: "json",
            success: function (res) {
                console.log(res)
            }
        });
    });
    $('.logout').on('click', function(){
        firebase.auth().signOut()
        .then(() => {
            location.href = '/main/';
        })
        .catch((err) => {
            console.log(err)
        })
    })
});