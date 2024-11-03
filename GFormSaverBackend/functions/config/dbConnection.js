import mongoose from "mongoose";
import CustomError from "../utils/CustomError.js";

const connectDb = async (req, res, next) => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log(
      `Database Connected : ${connect.connection.host} and ${connect.connection.name}`
    );
    next();
  } catch (error) {
    next(new CustomError("Internal Server Error!", 500));
  }
};

export default connectDb;
