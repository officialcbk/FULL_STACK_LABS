import { roleRepository } from '../repositories/roleRepository.js';
import type { Role } from '../models/Role.js';

export const roleService = {
  getAllRoles: () => {
    return roleRepository.findAll();
  },

  createRole: (firstName: string, lastName: string, roleTitle: string) => {
    if (!firstName || firstName.trim().length < 3) {
      throw new Error('First name needs at least 3 characters');
    }
    
    if (!roleTitle || roleTitle.trim().length === 0) {
      throw new Error('Role is required');
    }

    const existing = roleRepository.findByRoleTitle(roleTitle.trim());
    if (existing) {
      throw new Error('That role is already occupied');
    }

    const newRole: Role = {
      firstName: firstName.trim(),
      lastName: lastName?.trim() ?? '',
      role: roleTitle.trim()
    };

    return roleRepository.save(newRole);
  }
};