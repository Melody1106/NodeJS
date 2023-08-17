const btn =document.querySelector(".btn");
const block=document.querySelector(".block");
btn.addEventListener("click", function(){
    //console.log("click");
    (block.classList.contains("d-none"))?(block.classList.remove("d-none")):(block.classList.add("d-none"));
})