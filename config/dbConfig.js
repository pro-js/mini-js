let mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_LOCAL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('DB connect success')
})
.catch(() => {
  console.log('Somthing error to connect DB!!!')
});