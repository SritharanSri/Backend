import mongoose from 'mongoose';

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,  
    },
    busType: {
      type: String,
      enum: ['AC', 'Non-AC'],
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    }
  },
  {
    timestamps: true,
  }
);

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
