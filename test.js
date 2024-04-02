import pg from 'pg';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'passou##12T',
  port: 5432,
});
 
await client.connect();

try{
    let res = await client.query('SELECT * from milli');
    console.log(res.rows)
}
catch{
    console.log("something err")
}
 
await client.end();
