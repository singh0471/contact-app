const User = require("./components/user/service/user.js");

const admin1 = User.newAdmin("system","admin");

module.exports = {User,admin1};