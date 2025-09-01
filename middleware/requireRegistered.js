import { getUserByUsernameAndPassword } from "#db/queries/user";

export default async function requireRegistered(req, res, next) {
  const { username, password } = req.body;
  const user = await getUserByUsernameAndPassword(username, password);
  console.log("user here is", user);
  if (!user) {
    return res.status(401).send("Username or password don't match!");
  }
  req.user = user;
  next();
}
