import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("MONGO Connection String:", process.env.MONGODB_CONNECTIONSTRING);
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("MongoDB Connected Successfully!"); // Changed log message for clarity
  } catch (error) {
    console.error("MongoDB Connection Error:", error); // Changed log message for clarity
    // Log the specific error code if available
    if (error.code) {
      console.error("Error Code:", error.code);
    }
    // Log details about the querySrv error if it exists
    if (error.syscall === "querySrv") {
      console.error(
        "SRV Query Error Details:",
        error.hostname,
        error.code,
        error.syscall,
      );
    }
    process.exit(1); // Exit with error
  }
};
