const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Use the cors middleware
app.use(cors());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});

// Define a schema for the collection
const counterSchema = new mongoose.Schema({
  counter: { type: Number, default: 0 },
});

// Create a new document with the counter field set to 0
const Counter = mongoose.model('Counter', counterSchema);
Counter.create({});

// Define a route to update the counter
app.get('/api/updatecounter', async (req, res) => {
  try {
    // Find the document and increment the counter field
    const result = await Counter.findOneAndUpdate({}, { $inc: { counter: 1 } });

    // Return the updated counter value in the response
    res.send(`${result.counter}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Define a route to get the current value of the counter
app.get('/api/getcounter', async (req, res) => {
  try {
    // Find the document and return the counter value
    const result = await Counter.findOne({});
    res.send(`${result.counter}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Export the app as a serverless function
module.exports = app;
