let a;
console.log("開始");


setTimeout(()=>{
    a=10;
    console.log("事件進行中 非同步");
} ,0);


console.log("結束", "a+a="+(a+a));