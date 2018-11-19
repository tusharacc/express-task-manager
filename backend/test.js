const test2 = require('./test2')

test2.func1(5).then((data)=>{
    console.log(data);
},(err)=>{
    console.log(err);
});