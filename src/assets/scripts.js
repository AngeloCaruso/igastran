$(function(){
    let btn = document.getElementById('btnTest');
    btn.addEventListener('click', () => {
        $.ajax({
            type: "get",
            url: "/test",
            success: function (res) {
                console.log(JSON.parse(res))
            }
        });
    })
});