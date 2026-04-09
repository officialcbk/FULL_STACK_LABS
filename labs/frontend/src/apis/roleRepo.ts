import type { Role } from '../Role';

const BASE_URL = 'http://localhost:3000/api/roles';

export const roleRepo = {
  getRoles: async (): Promise<Role[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return res.json() as Promise<Role[]>;
  },

  addRole: async (role: Role, token: string): Promise<void> => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(role),
    });
    if (!res.ok) {
      const err = await res.json() as { message?: string };
      throw new Error(err.message ?? 'Failed to add role');
    }
  },
};