const dotEnv = require('dotenv');
dotEnv.config({ path: './config/config.env' });
require('./config/dbConfig');

const app = require('./app');

let port = process.env.PORT || 4000;
app.listen(port , () => {
  console.log(`App run on ${port}`);
})