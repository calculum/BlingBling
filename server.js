const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

// log the http layer
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});

