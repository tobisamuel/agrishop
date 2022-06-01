import mongoose from "mongoose";

const VendorSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    businessName: { type: String, required: true, unique: true },
    businessAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", VendorSchema);

export default Vendor;
