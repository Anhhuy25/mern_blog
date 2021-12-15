const authRouter = require("./auths");
const postRouter = require("./posts");
const profileRouter = require("./profile");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/post", postRouter);
  app.use("/api/profile", profileRouter);
}

module.exports = route;
