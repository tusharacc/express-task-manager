const func2 = (data) => {
    console.log('Asycn',data);
}

module.exports.func1 = async function(data){
    await setTimeout(func2,1000,4);
    console.log('After call');
    return data;
}



//module.exports = func1