let a;

//立即執行函數

(async ()=>{
    console.log("開始");
    let result = await t1();
    console.log("result = " + result);
    console.log("結束, a+a= "+(a+a));
})()

// async function doThing(){
//     console.log("開始");
//     let result = await t1();
//     console.log("result = " + result);
//     console.log("結束, a+a= "+(a+a));
// }
// doThing();


function t1(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            a = 10;
            console.log("進行中");
            resolve("成功了");
            // reject("錯誤了");
        }, 0);  
    });
}
