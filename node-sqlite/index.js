const sqlite3 = require('sqlite3').verbose();
let sql;
const fs = require('fs');

fs.writeFile('test.db','w', err => {
  if (err) throw err; 
  console.log('Dat file created');
})


//Connect to DB
const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,err => {
  if(err) return console.error(err.message)
})

db.serialize(() => {
//Create Table
sql = 'CREATE TABLE movie(name,actor,actress,director,date)';
db.run(sql);

//Insert into Table
sql = 'INSERT INTO movie(name,actor,actress,director,date) VALUES (?,?,?,?,?)';
db.run(sql, ["dune","timothee","zendaya","peter","2021"], err => {
  if (err) return console.error(err.message);
})
db.run(sql, ["avatar","tom","katy","nesler","2011"], err => {
  if (err) return console.error(err.message);
})

//Query all movies
sql = 'SELECT * FROM movie';
db.all(sql,[],(err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach(row => {
    console.log(row);
  })
})

//Query all movies by actor
console.log('Querying movie by actor: Timothee');
sql = 'SELECT * FROM movie WHERE actor="' + 'timothee"';
db.all(sql,[],(err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach(row => {
    console.log(row);
  })
})

})

db.close();