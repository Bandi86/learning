/* import User from '../../models/User.js';

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.create(userData);
    res.json(user);
  } catch (error) {
    console.error('Hiba a felhasználó hozzáadásakor:', error);
    res.status(500).json({ error: 'Hiba a felhasználó hozzáadásakor' });
  }
};

export default createUser; */

import { pool } from "../../db/config.js"

const createuser = (request, response) => {
  const { username, email, password } = request.body

  pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

export default createuser
