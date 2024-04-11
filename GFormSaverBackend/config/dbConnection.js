import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log(
      `Database Connected : ${connect.connection.host} and ${connect.connection.name}`
    );
  } catch (error) {
    console.error("Error connecting to mongodb: ", error);
    process.exit(1);
  }
};

export default connectDb;
