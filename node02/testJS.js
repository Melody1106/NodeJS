//物件解構復值

const { log } = require("console");

let man = {
    name: "Jay",
    mail: "Jay@test.com",
    cell: "09121234570"
}

let{name:Jay_name, mail:Jay_mail, cell:Jay_cell}=man;
console.log(Jay_name);
console.log(Jay_mail);
console.log(Jay_cell);