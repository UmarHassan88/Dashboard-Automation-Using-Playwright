/* global process */
export const CredentialsPage = {
  validCredentials: {
    username: "superadmin",
    password: "HereWeGo@2025",
  },
  investment: {
    username: "admin@aqaryinvestment.com",
    password: "123456",
  },
  finehome: {
    username: process.env.AUTH_MAIL,
    password: "123456",
  },
  greatfinehome: {
    username: "info@greatfinehome.com",
    password: "HereWeGo@2025",
  },
  invalidCredentials: {
    username: "invaliduser",
    password: "invalidpass",
  },
  ValidationMessages: {
    successLogin: "You logged into a secure area!",
    invalidCreds: "Your username / password is invalid!",
  },
};
