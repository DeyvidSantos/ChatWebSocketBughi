var server = require('ws').Server;
var s = new server({port: 5001});
var nome;
s.on('connection', function(ws){
    ws.on('message', function(message){
        message = JSON.parse(message);
        if(message.type == "nome"){
            ws.nomePessoal = message.data;
            return;
        }


        console.log("Received: "+message);

        s.clients.forEach(function e(client){
             if(client != ws)
                 client.send(JSON.stringify({
                   nome: ws.nomePessoal,
                   data: message.data
                 }));
    });


        //ws.send("From Server: "+message);
    });
    /*
    
     */ 
    ws.on('close', function(){
        console.log("I lost a client");
    }); 
});