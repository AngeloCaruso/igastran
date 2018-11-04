/*<script src="https://www.gstatic.com/firebasejs/5.5.7/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAWSgBIxjLK9hHwegfTydU2KVgJC8VStWQ",
    authDomain: "igastran-v1.firebaseapp.com",
    databaseURL: "https://igastran-v1.firebaseio.com",
    projectId: "igastran-v1",
    storageBucket: "igastran-v1.appspot.com",
    messagingSenderId: "357734557944"
  };
  firebase.initializeApp(config);
</script>*/

$(function(){
    $('#formRegister').on("submit", function(e){
        e.preventDefault()
        let datos = {
            nombre: $('#regNombre').val(),
            apellidos: $('#regApell').val(),
            correo: $('#regCorreo').val(),
            password: $('#regPass').val()
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

});