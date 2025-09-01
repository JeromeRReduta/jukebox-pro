import requireRegistered from "#middleware/requireRegistered";
import requireUser from "#middleware/requireUser";
import { createToken } from "#utils/jwt";
import express from "express";
import requireBody from "#middleware/requireBody";
import { createUser } from "#db/queries/user";

function serveToken(req, res) {
  const { id } = req.user;
  const token = createToken({ id });
  return res.status(201).send(token);
}

const router = express.Router();

router.route("/register").post(
  requireBody(["username", "password"]),
  async (req, res, next) => {
    const { username, password } = req.body;
    req.user = await createUser(username, password);
    next();
  },
  requireUser,
  serveToken
);

router
  .route("/login")
  .post(requireBody(["username", "password"]), requireRegistered, serveToken);

export default router;
