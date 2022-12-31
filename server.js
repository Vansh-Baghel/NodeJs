const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
mongoose.set('strictQuery', true);
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then((con) => {
//     console.log(con.connections);
//   });


mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
  })

const port = 3000;

app.listen(port , () => {
  console.log(`App running from port ${port}`);
})