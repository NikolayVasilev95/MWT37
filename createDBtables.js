// var pg = require('pg')
//
// var client = new pg.Client({
//     user: "kqcnjtmjdugxlk",
//     password: "ae308681e15df1afdd6a7b687f913d461f90e604a7757ece2368337102f41b3d",
//     database: "deh5vvhfu1fs0v",
//     port: 5432,
//     host: "ec2-184-73-153-64.compute-1.amazonaws.com",
//     ssl: true
// });
//
// client.connect()

// client.query(
//   `CREATE TABLE users (
//     id SERIAL NOT NULL PRIMARY KEY,
//     name varchar(255),
//     email varchar(255),
//     password varchar(255),
//     created_at	timestamp default NULL,
//     updated_at	timestamp default NULL
// )`, (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// client.query(
//   `INSERT INTO users (name, email, password)
//   VALUES ('Nikolay', 'a@abv.bg', '123');`, (err, res) => {
//     console.log(err, res)
//     client.end()
// })

// client.query(`select * from users`, (err, res) => {
//   console.log(err, res)
//   client.end()
// })