const app = require("./src/app");

const userModel = require("./src/models/userModel");
const showModel = require("./src/models/showModel");
const seatModel = require("./src/models/seatModel");
const bookingModel = require("./src/models/bookingModel");

const PORT = 3000;

const startServer = async () => {

  await userModel.createUserTable();
  await showModel.createShowTable();
  await seatModel.createSeatTable();
    await bookingModel.createBookingTable();

  app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
  });

};

startServer();