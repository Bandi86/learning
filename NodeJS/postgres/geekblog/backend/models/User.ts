/* import { db } from "../db/config.js"

const User = {
  findAll: () => {
    return db.any('SELECT * FROM users');
  },

  findById: (id) => {
    return db.one('SELECT * FROM users WHERE id = $1', id);
  },

  create: (user) => {
    return db.one(
      'INSERT INTO users(${this~}) VALUES(${^values}) RETURNING id',
      {
        ...user,
        this: UserSchema,
      }
    );
  },

  update: (id, user) => {
    return db.none('UPDATE users SET username = $1, email = $2 WHERE id = $3', [
      user.username,
      user.email,
      id,
    ]);
  },

  delete: (id) => {
    return db.none('DELETE FROM users WHERE id = $1', id);
  },
};

export default User; */

export class Users {
  id!: number
  username!: string
  role!: string
}

