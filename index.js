const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const matchRoute = require('./routes/matchRoute');
const authRoute = require('./routes/authRoute');
const footballerroute = require('./routes/footballerRoute');
const connectDB = require('./config/db');
const ticketRouter = require('./routes/ticketRoute');
const userRoute = require("./routes/userRoute")

const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();


app.use("/api", matchRoute);
app.use("/api/auth", authRoute);
app.use('/api/book', ticketRouter);
app.use("/api/soccer", footballerroute);
app.use("/api/users", userRoute);
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});








