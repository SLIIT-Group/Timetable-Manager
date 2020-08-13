const mongoose = require('mongoose');

const conectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://sliitgroup19:af123sliit@shopping-cart-tpiyg.mongodb.net/timetable_manager?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );

    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = conectDB;
