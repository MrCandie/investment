const sendEmail = require("./sendEmail");

const sendEmailVerification = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/account/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>please confirm your email by clicking on the following link: <a href="${verifyEmail}">verify email</a></p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello ${name}</h4>
  ${message}
  `,
  });
};

module.exports = sendEmailVerification;
