import type { Role } from '../models/Role.js';

let roles: Role[] = [
  { firstName: 'Jo-Anne', lastName: 'Sinclair', role: 'CEO/Chair of Board' },
  { firstName: 'Jackson', lastName: 'Smith', role: 'COO/VP Operations' },
  { firstName: 'Susan', lastName: 'Thomas', role: 'CFO/VP Administration' },
  { firstName: 'Richa', lastName: 'Kaur', role: 'VP Client Services' },
  { firstName: 'Josee', lastName: 'Benjamin', role: 'CIO' },
  { firstName: 'Vincent', lastName: 'Grey', role: 'VP Sales & Marketing' },
  { firstName: 'Rupa', lastName: 'Kharki', role: 'Director Financial and Audit Svcs' },
  { firstName: 'Xun', lastName: 'Kuang', role: 'Director Human Resources' },
  { firstName: 'Stien', lastName: 'Pedersen', role: 'Director Legal Services/General Counsel' },
  { firstName: 'Sandra', lastName: 'Bear', role: 'Director Information Technology' },
  { firstName: 'Gus', lastName: 'Blue', role: 'Director Information Security and CISSO' },
  { firstName: 'Sam', lastName: 'Kong', role: 'Director Accounting' },
  { firstName: 'Valentine', lastName: 'Smith', role: 'Director Physical Security' },
  { firstName: 'Mariya', lastName: 'Kaperski', role: 'Director Facilities' },
  { firstName: 'Abd al-Hamid', lastName: 'Alami', role: 'Manager, Business Continuity and Disaster Recovery' },
  { firstName: 'Victoria', lastName: 'Gray', role: 'Manager, Internal Audit' },
  { firstName: 'Cheryl', lastName: 'Guru', role: 'Chief Architect' },
  { firstName: 'Jean', lastName: 'Ngoy', role: 'Manager, Security Architecture' },
  { firstName: 'Kris', lastName: 'Gold', role: 'Solution Architect, Online Banking' },
  { firstName: 'Isaac', lastName: 'Smith', role: 'Manager, Application Solutions' },
  { firstName: 'Payton', lastName: 'Frost', role: 'Lead Developer, Online Banking' },
  { firstName: 'Samantha', lastName: 'Nettle', role: 'Manager, Operational Risk' },
  { firstName: 'Yolanda', lastName: 'Ferreira', role: 'Manager, Vendor Relations' },
  { firstName: 'Samir', lastName: 'Hassan', role: 'Manager, Purchasing' },
  { firstName: 'Yuna', lastName: 'Aikawa', role: 'Manager, Communications' },
  { firstName: 'Jonathan', lastName: 'Carberry', role: 'Manager Customer Experience and Community Eng.' },
  { firstName: 'Roland', lastName: 'Wei', role: 'Manager of Sales' },
  { firstName: 'Pran', lastName: 'Singh', role: 'Manager, Marketing' },
];

export const roleRepository = {
  findAll: () => roles,
  
  findByRoleTitle: (roleTitle: string) => {
    return roles.find(r => r.role.toLowerCase() === roleTitle.toLowerCase());
  },

  save: (role: Role) => {
    roles = [...roles, role];
    return role;
  }
};