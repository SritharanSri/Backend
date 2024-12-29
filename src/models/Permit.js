// models/Permit.js
import mongoose from 'mongoose';

const permitSchema = new mongoose.Schema(
  {
    permitType: {
      type: String,
      enum: ['Operational Permit', 'Special Access', 'Travel Permit'],
      default: 'Travel Permit',
      required: true,
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      default: function () {
        const issueDate = this.issueDate || Date.now(); 
        const expiryDate = new Date(issueDate);
        expiryDate.setDate(expiryDate.getDate() + 30); 
        return expiryDate;
      },
    },
    status: {
      type: String,
      enum: ['Active', 'Expired', 'Revoked'],
      default: 'Active',
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus', // Reference to the Bus model
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route', // Reference to the Route model
      required: true,
    },
    issuerName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Permit = mongoose.model('Permit', permitSchema);
export default Permit;
