import mongoose from "mongoose";

const connectDB = async() => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    if(!connect){
      console.log("Database Connection Failed");
    }
    console.log("Database Connection Success");
    
  } catch (error) {
    console.log("Database Connection Error", error)
  }
}

export default connectDB;
