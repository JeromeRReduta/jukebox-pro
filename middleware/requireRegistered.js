import { getUserByUsernameAndPassword } from "#db/queries/user";

export default function requireRegistered(username, password) {
  return async (req, res, next) => {
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) {
      return res.status(401).send("Username or password don't match!");
    }
    next();
  };
}
