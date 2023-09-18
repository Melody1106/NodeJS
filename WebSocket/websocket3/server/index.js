const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 8080});

const clients = {};
const rooms = {};

wss.on("connection", (connection)=>{
    console.log("新的使用者已連線");

    connection.on("message", (message)=>{
        console.log(`收到訊息 => ${message}`);
        const parsedMessage = JSON.parse(message);

        // 建立連線，使用者登錄ID
        if(parsedMessage.type === "register"){
            const userId = parsedMessage.userId;
            clients[userId] = connection;
            connection.userId = userId;
            const otherClients = Object.keys(clients);
            let allRooms = [];
            for(let [key, value] of Object.entries(rooms)){
                let id = key;
                let name = value;
                allRooms.push({id, name});
            }
            wss.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({
                        type: "registered",
                        otherClients,
                        allRooms
                    }));
                }
            });
            return false;
        }

        // 建立房間
        if(parsedMessage.type === "createRoom"){
            let roomID = parsedMessage.roomID;
            rooms[roomID] = {
                id: parsedMessage.roomID,
                name: parsedMessage.roomName
            }
            rooms[roomID].userList = [];
            rooms[roomID].userList.push(parsedMessage.fromID);
            let allRooms = [];
            for(let [key, value] of Object.entries(rooms)){
                let id = key;
                let name = value;
                allRooms.push({id, name});
            }
            wss.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({
                        type: "newRoom",
                        allRooms
                    }));
                }
            });
            return false;
        }

        // 加入房間
        if(parsedMessage.type === "joinRoom"){
            let roomID = parsedMessage.roomID;
            let fromID = parsedMessage.fromID;
            rooms[roomID].userList.push(fromID);
            let clientList = rooms[roomID].userList;
            rooms[roomID].userList.forEach(uid=>{
                let targetClient = clients[uid];
                if(targetClient.readyState === WebSocket.OPEN){
                    targetClient.send(JSON.stringify({
                        type: "joinRoom",
                        fromID, roomID, clientList
                    }));
                }
            });
            return false;
        }

        // 離開房間
        if(parsedMessage.type === "leaveRoom"){
            let roomID = parsedMessage.roomID;
            let fromID = parsedMessage.fromID;
            rooms[roomID].userList = arrayRemove(rooms[roomID].userList, fromID);
            let clientList = rooms[roomID].userList;
            rooms[roomID].userList.forEach(uid=>{
                let targetClient = clients[uid];
                if(targetClient.readyState === WebSocket.OPEN){
                    targetClient.send(JSON.stringify({
                        type: "leaveRoom",
                        fromID, roomID, clientList
                    }));
                }
            });
            if(rooms[roomID].userList.length === 0){
                delete rooms[roomID];
            }
            let allRooms = [];
            for(let [key, value] of Object.entries(rooms)){
                let id = key;
                let name = value;
                allRooms.push({id, name});
            }
            wss.clients.forEach((client)=>{
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({
                        type: "newRoom",
                        allRooms
                    }));
                }
            });
            return false;
        }

        // 一般文字訊息
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

function arrayRemove(ary, value){
    return ary.filter(item=>item != value);
}