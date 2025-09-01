import db from "#db/client";
import bcrypt from "bcrypt";

const defaultSaltRounds = 10;
export async function createUser(username, password) {
  const hash = await bcrypt.hash(password, defaultSaltRounds);
  const sql = `
    INSERT INTO "user"
      (username, password)
    VALUES
      ($1, $2)
    RETURNING *
    `;
  const {
    rows: [user],
  } = await db.query(sql, [username, hash]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const hash = await bcrypt.hash(password, defaultSaltRounds);
  const sql = `
    SELECT * FROM "user"
    WHERE
        username = $1
        AND password = $2`;
  const {
    rows: [user],
  } = await db.query(sql, [username, hash]);
  return user;
}
