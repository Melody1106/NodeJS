const btn = document.querySelector("button");
const chatInput = document.querySelector("[name=chatInput]");
const chatBox = document.querySelector("#chatBox");
const ws = new WebSocket("ws://localhost:8080");

btn.addEventListener("click", ()=>{
    let message = chatInput.value;
    ws.send(message);
    chatInput.value = "";
});

ws.addEventListener("open", ()=>{
    console.log("已經連上 server");
});

ws.addEventListener("message", async (event)=>{
    let text = await event.data.text();
    chatBox.innerHTML += `<div>${text}</div>`;
});