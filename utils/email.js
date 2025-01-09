const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = (email, token) => {
  const verificationLink = `${process.env.APP_URL}/api/users/verify/${token}`;

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
