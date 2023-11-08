const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/challenge18db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB'))
.catch(err => {
  console.log('Error connecting to DB:', err)
});

app.listen(PORT, () => console.log(`Connected to localhost: ${PORT}`));