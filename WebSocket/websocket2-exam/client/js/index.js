const leftArea = document.querySelector(".left")
const rightArea = document.querySelector(".right")
const btnSend = document.querySelector(".btn-send")
const msgInput = document.querySelector("[name=msg");
const ws = new WebSocket("ws://localhost:8080");
const userId = new Date().getTime().toString();
let clientList, targetUserId;

btnSend.addEventListener("click", sendMessage);
msgInput.addEventListener("keydown", e=>{
    if(e.key === "Enter"){
        sendMessage();
    };
})

ws.addEventListener("open", ()=>{
    console.log("已經連上 server");
    leftArea.innerHTML += `<div>你已經進入聊天室，你的 ID 是: ${userId}</div>`;
    let params = {
        type: "register",
        userId
    }
    ws.send(JSON.stringify(params));
});

ws.addEventListener("message", async (event)=>{
    let result = JSON.parse(event.data);
    if(result.type === "registered"){
        clientList = result.otherClients;
        setClients();
        return false;
    }
    if(result.type === "message"){
        let fromID = result.fromID;
        let message = result.message;
        let toFix = "說";
        if(result.private === true){
            toFix = "悄悄對你說"
        }
        if(fromID === userId){
            fromID = "我自己"
        }
        let icon = `<span class="badge text-bg-primary">${fromID}</span>`;
        let template = `<div>${icon} ${toFix} : ${message}</div>`;
        leftArea.innerHTML += template;
        return false;
    }
    if(result.type === "disconnected"){
        clientList = result.otherClients;
        let disconnectedID = result.disconnectedID;
        setClients();
        if(disconnectedID){
            leftArea.innerHTML += `<div>${disconnectedID} 已經離開聊天室</div>`;
        }
        return false;
    }
});

function setClients(){
    console.log(clientList);
    let DOMS = "";
    clientList.forEach(client=>{
        if(client !== userId){
            DOMS += `<div idn="${client}" class="btn btn-secondary mb-1">${client}</div>`;
        }
    });
    rightArea.innerHTML = DOMS;
    // 設定使用者按鈕行為
    let btns = rightArea.querySelectorAll(".btn");
    btns.forEach(btn=>{
        btn.addEventListener("click", e=>{
            let target = e.currentTarget;
            let idn = target.getAttribute("idn");
            if(targetUserId && targetUserId !== idn){
                return false;
            }
            if(target.classList.contains("btn-danger")){
                targetUserId = undefined;
                target.classList.remove("btn-danger");
            }else{
                targetUserId = idn;
                target.classList.add("btn-danger");
            }
  
        });
    });
}

function sendMessage(){
    let message = msgInput.value;
    let params = {
        type: "message",
        message,
        fromID: userId
    }
    if(targetUserId){
        params.targetUserId = targetUserId;
    }
    ws.send(JSON.stringify(params));
    msgInput.value = "";
    // 自己悄悄說的演出
    if(targetUserId){
        let icon1 = `<span class="badge text-bg-primary">我自己</span>`;
        let icon2 = `<span class="badge text-bg-primary">${targetUserId}</span>`;
        let template = `<div>${icon1} 對 ${icon2} 悄悄說: ${message}</div>`;
        leftArea.innerHTML += template;
    }
}