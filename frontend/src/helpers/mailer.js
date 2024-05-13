import nodemailer from "nodemailer";

export const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d96daa04a92bd3",
        pass: "4525756eb139c3",
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: "sandbox.smtp.mailtrap.io",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
