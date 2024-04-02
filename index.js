import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import cors from 'cors';

// Use it before all route definitions


const { Client } = pg;

const app = express();

const port = 3000;
app.use(cors({origin: 'http://127.0.0.1:5500'}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'passou##12T',
  port: 5432,
});

console.log(await client.connect());

app.get('/', async (req, res) => {
    try {
      let result = await client.query('SELECT * from milli');
      let data = result.rows;
      let htmlResponse = '<ul>';
      data.forEach(item => {
        htmlResponse += `<li>ID: ${item.id}, Name: ${item.name}</li>`;
      });
      htmlResponse += '</ul>';
      res.send(htmlResponse);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Error processing request");
    }
  });

app.post('/query', async (req, res) => {
  try {
    console.log("reached here ")
    const queryText = req.body.query; // Get query from request body
    const dbRes = await client.query(`select * from ${queryText}`);
    res.json(dbRes.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).send('Error executing query');
  }


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
