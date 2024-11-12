const express = require("express")
const app = express()
const { sequelize } = require('./models');



// Import route files
const vendors = require('./routes/vendors');
const riders = require('./routes/riders');
const customers = require('./routes/customers');
const orders= require('./routes/orders');

// Middleware to parse JSON bodies
app.use(express.json());

// Register routes with the app
app.use('/vendors', vendors);
app.use('/riders', riders);
app.use('/customers', customers);
app.use('/orders', orders);

// Serve static files from the 'public' folder
app.use(express.static('public'));


sequelize.authenticate().then(() => {
  console.log("Database connected...");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Unable to connect to the database:", err);
});









// const PORT = process.env.PORT || 6000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });