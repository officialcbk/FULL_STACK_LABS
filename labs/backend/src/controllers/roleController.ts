import type { Request, Response } from 'express';
import { roleService } from '../services/roleService.js';

export const getRoles = (req: Request, res: Response) => {
  const data = roleService.getAllRoles();
  res.json(data);
};

export const addRole = (req: Request, res: Response) => {
  //  Same auth check
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const { firstName, lastName, role } = req.body;
    const result = roleService.createRole(firstName, lastName, role);
    res.status(201).json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message });
  }
};