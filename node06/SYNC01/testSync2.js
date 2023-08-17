const fs = require("fs");

let t1 = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        reject(error);
        return false;
      }
      resolve(data);
    });
  });
};

(async () => {
  let result = await t1("./aaa.log");
  console.log(result.toString());
  result = await t1("./bbb.log");
  console.log(result.toString());
  result = await t1("./ccc.log");
  console.log(result.toString());
})();
