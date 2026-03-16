import { roleRepo } from '../apis/roleRepo';

export const roleService = {
  createRole: (firstName: string, lastName: string, roleTitle: string) => {
    const f = firstName.trim();
    const l = lastName.trim();
    const r = roleTitle.trim();

    if (f.length < 3) {
      return {
        success: false as const,
        field: 'firstName' as const,
        message: 'First name needs at least 3 characters',
      };
    }

    if (r.length === 0) {
      return {
        success: false as const,
        field: 'role' as const,
        message: 'Role is required',
      };
    }

    const existing = roleRepo.findByRoleTitle(r);
    if (existing) {
      return {
        success: false as const,
        field: 'role' as const,
        message: 'That role is already occupied',
      };
    }

    roleRepo.addRole({
      firstName: f,
      lastName: l,
      role: r,
    });

    return { success: true as const };
  },
};
