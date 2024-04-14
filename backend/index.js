const express = require('express')
const app = express();
require('dotenv').config();
const dbconnect = require('./dbconnector')

const cors = require('cors');
app.use(cors());

dbconnect();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const user = require('./routes/usersAuth');
app.use('/user',user)

const candidate = require('./routes/candidateRoute');
app.use('/candidate',candidate)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });