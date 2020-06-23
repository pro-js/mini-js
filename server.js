let dotEnv = require('dotenv');
dotEnv.config({ path: './env/config.env' });
require('./db/connection');

let app = require('./app');

let port = process.env.PORT || 5000;
app.listen(port , () => {
  console.log(`App run on ${port}`);
})