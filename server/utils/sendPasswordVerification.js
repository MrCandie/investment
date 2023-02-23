const sendEmail = require("./sendEmail");

const sendPasswordVerification = async ({
  name,
  email,
  resetToken,
  origin,
}) => {
  const passswordReset = `${origin}/account/reset-password?token=${resetToken}&email=${email}`;
  const message = `<p>please reset your password by clicking on the following link: <a href="${passswordReset}">reset password</a></p>`;

  return sendEmail({
    to: email,
    subject: "password reset",
    html: `<h4>Hello ${name}</h4>
  ${message}
  `,
  });
};

module.exports = sendPasswordVerification;
