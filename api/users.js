import { createUser } from "#db/queries/user";
import requireRegistered from "#middleware/requireRegistered";
import requireUser from "#middleware/requireUser";
import { createToken } from "#utils/jwt";
import express from "express";
import { escapeLiteral } from "pg";

function serveToken(id) {
  return (req, res) => {
    const token = createToken({ id });
    return res.status(201).send(token);
  };
}

const router = express.Router();

router
  .route("/register")
  .post(requireBody(["username", "password"]), requireUser, serveToken);

router
  .route("/login")
  .post(
    requireBody(["username", "password"]),
    requireUser,
    requireRegistered,
    serveToken
  );

export default router;
