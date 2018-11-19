const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://dbUser:dbUserPassword01@cluster0-bvedr.mongodb.net/TaskManager?retryWrites=true")
.then(() => {
    console.log('Connected');
})
.catch(() => {
    console.log('Failed');
});

const postSchema = mongoose.Schema({
    parentId: { type: String },
    task:  { type: String },
    startDate: {type: Date},
    endDate:  {type: Date},
    priority: {type: Number},
    status: {type: String}
})


let Post = mongoose.model('Post',postSchema);
let post = new Post({parentId:8,task:'Test Task',startDate:'10/29/2018',endDate:'10/30/2019',priority:30,status:'Open'})
post.save(function (err) {
    if (err) return handleError(err);
    console.log('Saved')
  });