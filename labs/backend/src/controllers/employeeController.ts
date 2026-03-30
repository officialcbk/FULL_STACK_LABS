import type { Request, Response } from 'express';
import { employeeService } from '../services/employeeService.js';

export const getEmployees = (req: Request, res: Response) => {
  const data = employeeService.getEmployeesGrouped();
  res.json(data);
};

export const addEmployee = (req: Request, res: Response) => {
  try {
    const { firstName, lastName, department } = req.body; 
    const result = employeeService.createEmployee(firstName, lastName, department);
    res.status(201).json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message });
  }
};