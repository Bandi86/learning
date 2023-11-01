/* import User from "../../models/User.js"

const getOneUser = async (req, res) => {
    const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.error('Hiba a felhasználó lekérdezésekor:', error);
    res.status(500).json({ error: 'Hiba a felhasználó lekérdezésekor' });
  }
}

export default getOneUser */

import { pool } from "../../db/config.js"

const getOneUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ error: 'Adatbázis hiba' });
      return;
    }
    response.status(200).json(results.rows)
  })
}

export default getOneUser