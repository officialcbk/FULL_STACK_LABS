import { roleRepo } from '../apis/roleRepo';
import type { Role } from '../Role';

export const roleService = {
  getRoles: async (): Promise<Role[]> => {
    return roleRepo.getRoles();
  },

  createRole: async (
    firstName: string,
    lastName: string,
    roleTitle: string
  ): Promise<{ success: boolean; field?: 'firstName' | 'role' | 'general'; message?: string }> => {
    const f = firstName.trim();
    const l = lastName.trim();
    const r = roleTitle.trim();

    if (f.length < 3) {
      return { success: false, field: 'firstName', message: 'First name needs at least 3 characters' };
    }
    if (r.length === 0) {
      return { success: false, field: 'role', message: 'Role is required' };
    }

    try {
      await roleRepo.addRole({ firstName: f, lastName: l, role: r });
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      // Backend returns 'That role is already occupied' as the message
      return { success: false, field: 'role', message };
    }
  },
};