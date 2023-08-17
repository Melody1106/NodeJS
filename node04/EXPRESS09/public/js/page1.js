const cols =document.querySelectorAll(".col");
[...cols].map(col=>{
            col.addEventListener("click", function(){
                    (this.classList.contains("active"))?this.classList.remove("active"): this.classList.add("active");
            })
})