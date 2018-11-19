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
    let data;
    await Task.find({})
    .then((docs)=>{
        console.log('Returning Data',data);
        data = docs;
    })
    .catch((err)=>{
        console.log(err)
    }); 
    console.log('I am getting executed');
    return data;
}

module.exports.update = async function(data){
    let conditions = { id: data['id'] }
        , update = { task: data['task'],parentTask: data['parentTask'],startDate: data['startDate'], endDate : data['endDate'],complete: data['complete'],priority: data['priority']}
        , options = { multi: true };
        console.log(data);
    await Task.update(conditions, update, options, (err,numAffected) => {
        if (err) {
            status = 'Err ' + err
        }else {
            status = 'Ok'
            numOfRowsUpdated = numAffected
        }

    });

    return {'numOfRowsUpdated':numOfRowsUpdated,'status':status}
}
