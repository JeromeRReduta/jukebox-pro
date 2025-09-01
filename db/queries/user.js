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

export async function getUsers() {
  const sql = `
    SELECT * FROM "user"
    `;
  const { rows: users } = await db.query(sql);
  return users;
}

export async function getUserById(id) {
  const sql = `
    SELECT * FROM "user"
    WHERE id = $1
    `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
    SELECT * FROM "user"
    WHERE
        username = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  /** ty table4U */
  if (!user) {
    return null;
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return null;
  }
  return user;
}
