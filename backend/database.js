const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dbUser:dbUserPassword01@cluster0-bvedr.mongodb.net/TaskManager?retryWrites=true")
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Failed',err);
});

const taskSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    task:  { type: String },
    parentTask: { type: String },
    startDate: {type: Date},
    endDate:  {type: Date},
    complete: {type: Boolean},
    priority: {type: Number}
},{
collection: "posts"});

let Task = mongoose.model('Post',taskSchema);

module.exports.post = function(data){
    let post = new Task(data);
    console.log(data);
    post.save(function (err) {
        if (err) return handleError(err);
        console.log('Saved');
    });
} 

module.exports.get = async function(){
    //let post = new Task();
    let data,status,message;
    await Task.find({})
    .then((docs)=>{
        data = docs;
        status = 'Ok';
        message = 'posted';
    })
    .catch((err)=>{
        status = 'Failed'
        message = err;
    }); 
    
    return {'data':data,'status':status,'message':message};
}

module.exports.update = async function(data){
    let conditions = { id: data['id'] }
        , update = data['update']
        , options = { multi: true };
        console.log('update',data);
    await Task.findByIdAndUpdate(data['id'],{$set:update} ,  (err,doc) => {
        console.log(err,doc);
        if (err) {
            status = 'Err ' + err
        }else {
            status = 'Ok'
            document = doc
        }

    });

    return {'document':document,'status':status}
}
