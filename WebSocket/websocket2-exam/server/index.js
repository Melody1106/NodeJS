const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 8080});

const clients = {};

wss.on("connection", (connection)=>{
    console.log("新的使用者已連線");

    connection.on("message", (message)=>{
        console.log(`收到訊息 => ${message}`);
        const parsedMessage = JSON.parse(message);

        if(parsedMessage.type === "register"){
            const userId = parsedMessage.userId;
            clients[userId] = connection;
            connection.userId = userId;
            const otherClients = Object.keys(clients);
            wss.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({
                        type: "registered",
                        otherClients
                    }));
                }
            });
            return false;
        }

        if(parsedMessage.type === "message"){
            const targetUserId = parsedMessage.targetUserId;
            const fromID = parsedMessage.fromID;
            const msg = parsedMessage.message;
            if(targetUserId){
                // 悄悄話
                let targetClient = clients[targetUserId];
                if(targetClient.readyState === WebSocket.OPEN){
                    targetClient.send(JSON.stringify({
                        type: "message",
                        message: msg,
                        fromID,
                        private: true
                    }));
                }
            }else{
                // 廣播，公開
                wss.clients.forEach((client)=>{
                    if(client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({
                            type: "message",
                            message: msg,
                            fromID
                        }));
                    }
                });
            }
            return false;
        }
    });

    connection.on("close", ()=>{
        console.log("使用者已斷線");
        if(connection.userId){
            delete clients[connection.userId];
        }
        const otherClients = Object.keys(clients);
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({
                    type: "disconnected",
                    otherClients,
                    disconnectedID: connection.userId
                }));
            }
        });
    });
});