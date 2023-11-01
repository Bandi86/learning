
/* import User from "../../models/User.js"

const getusers = async (req, res) => {
  try {
    const users = await User.findAll(); 
    res.json(users);
  } catch (error) {
    console.error('Hiba a felhasználók lekérdezésekor:', error);
    res.status(500).json({ error: 'Hiba a felhasználók lekérdezésekor' });
  }
};

export default getusers; */

/* import { pool } from "../../db/config.js"

const getusers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export default getusers */

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/users';

export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: 'Hiba történt az adatlekéréskor.' });
  }
};
