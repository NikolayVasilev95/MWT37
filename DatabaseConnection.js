var pg = require('pg')

var client = new pg.Client({
    user: "kqcnjtmjdugxlk",
    password: "ae308681e15df1afdd6a7b687f913d461f90e604a7757ece2368337102f41b3d",
    database: "deh5vvhfu1fs0v",
    port: 5432,
    host: "ec2-184-73-153-64.compute-1.amazonaws.com",
    ssl: true
});

client.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});

module.exports = client;
