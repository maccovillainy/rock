const express = require('express');
const app = express();
const path = require('path');

app.listen(8080, ()=> console.log('8080'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html')
});

app.use((err, req, res, next) => {
  res.status(500)
    .send("Somthing broke");
});
