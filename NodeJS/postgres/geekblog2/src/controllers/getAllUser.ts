import { Request, Response } from 'express';

import { User } from "../entity/User"

/* export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: 'Hiba történt az adatlekéréskor.' });
  }
}; */

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User)
        const allUser = await userRepository.find();
        response.status(200).json(allUser);
    } catch (error) {
        
    }
}