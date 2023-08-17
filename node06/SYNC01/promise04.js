let a;
console.log("開始");

new Promise((resolve, reject)=>{
    setTimeout(()=>{
        a=10;
        console.log("事件進行中");
        //resolve();
        reject("出現錯誤");
    } ,0);

}).then( ()=>{
    console.log("結束", "a+a="+(a+a));
} ).catch( (error)=>{
    console.log(error);
} )







//Promise 格式
// new Promise((resolve, reject)=>{

//     resolve();

//     reject("你失敗了~~");

// })