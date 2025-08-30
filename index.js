import express from 'express';

const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
  res.status(200).send('Hello World!');
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
 console.log(`Received ID: ${id}`);
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  console.log(`Received Name: ${name}`);
  res.send(`Hello, ${name}!`);
});

  
//app.get('/info',(req,res)=>{
//  res.send("Name: BENITO, Carlos Nicolai L., Section: IT4C, Program: BS Information Technology");
//});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));