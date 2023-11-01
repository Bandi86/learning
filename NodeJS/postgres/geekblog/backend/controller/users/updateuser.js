/* import { db } from '../../db/config.js';

const updateusers = async (req, res) => {
  try {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
      [req.body.name, req.body.email, req.body.password, req.params.id]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error('Hiba történt:', err);
    res.status(500).json({ error: 'Hiba történt' });
  }
};

export default updateusers; */

import { pool } from "../../db/config.js"

const updateusers = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

export default updateusers