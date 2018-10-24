// connect to server
var socket = io.connect("http://localhost:3000");
var output = document.getElementById("output");
var message = document.getElementById("message");
var sender = document.getElementById("sender");
var feedback = document.getElementById("feedback");
var send = document.getElementById("send");


send.addEventListener("click", (event) => {
    // emit an event
    socket.emit("chat", {
        message : message.value,
        sender  : sender.value
    });


});



message.addEventListener("keypress", (event) => {
    // emit an event
    socket.emit("typing", {
        sender  : sender.value
    });
});

socket.on("chat", (data) => {
    //console.log(data);
   output.innerHTML += "<p><strong>" + data.sender +"</strong> : " + data.message + "</p>";
   message.value = "";
   feedback.innerHTML =  "";

});


socket.on("typing", (data) => {
    //console.log(data);
    feedback.innerHTML =  data.sender +" is typing";
});