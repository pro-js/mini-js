let dotEnv = require('dotenv');
dotEnv.config({ path: './env/config.env' });
let app = require('./app');

let port = process.env.PORT || 3000;
app.listen(port , () => {
  console.log(`App run on ${port}`);
})