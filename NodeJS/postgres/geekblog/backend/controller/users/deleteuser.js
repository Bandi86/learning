/* import { db } from '../../db/config.js';

const deleteusers = async (req, res) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1', [
      req.params.id,
    ]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error('Hiba történt:', err);
    res.status(500).json({ error: 'Hiba történt' });
  }
};

export default deleteusers; */

const deleteusers = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

export default deleteusers