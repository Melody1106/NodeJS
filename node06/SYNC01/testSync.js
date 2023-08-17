let t1 =()=>{
return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("t1 執行結束");
        resolve()
    } ,2000)

})

};
let t2 =()=>{
return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log("t2 執行結束");
        resolve()
    } ,4000)
})

};


let t3 =()=>{
return new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log("t3 執行結束");
        resolve()
    } ,1000)
})

 
};

(async ()=>{
    await t1();
    await t2();
    await t3();
})();