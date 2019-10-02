$(document).ready(function () {
    var canvas = document.getElementById('hellowebgl');

    canvas.addEventListener("click", hello);
});

function hello() {
    console.log("hello");
}