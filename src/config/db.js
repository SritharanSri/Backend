import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const credentials = process.env.MONGODB_CERT_PATH; // Access certificate path

    if (!credentials) {
      console.error('Certificate path not defined in environment variables.');
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,
      tlsCertificateKeyFile: credentials,
      tlsAllowInvalidCertificates: true, // Bypass certificate validation (only for development)
    });

    console.log(`MongoDB connected to database: ${process.env.MONGO_DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
