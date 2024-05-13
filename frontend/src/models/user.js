import mongoose from "mongoose";
import { mailSender } from "@/helpers/mailer";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
  },
  profilePicture: { type: String },
  otp: {
    type: String,
    required: true,
  },
  isVerified: { type: Boolean },
});
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
       
      ">
      <h1>Email Verification</h1>
      <p style="font-size: 16px; font-weight: 500">
        it seems you are registering and trying to verify your email here is the
        verification code. Please copy it and verify your Email
      </p>
   
        <p
          style="
             font-size: 28px;
            background-color: #f9f9f9;
            padding:10px 30px;
            font-weight: 600;
            color: rgb(2, 2, 2);
            letter-spacing: 4px;
          
          ">
          Code : ${otp}
        </p>
     
    </div>`
    );
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
userSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
