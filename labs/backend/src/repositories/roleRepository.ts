import type { Role } from '../models/Role.js';

let roles: Role[] = [
  { id: '1', name: 'Manager' },
  { id: '2', name: 'Developer' },
  { id: '3', name: 'Analyst' }
];

export const roleRepository = {
  findAll: () => roles,
  findById: (id: string) => roles.find(r => r.id === id),
  save: (role: Role) => {
    roles = [...roles, role];
    return role;
  }
};