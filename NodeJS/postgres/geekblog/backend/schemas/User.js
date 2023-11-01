import * as pgp from 'pg-promise'

export const UserSchema = new pgp.helpers.ColumnSet(
  ['id', 'username', 'email', 'password', 'created_at', 'updated_at', 'role'],
  { table: 'users' }
);
