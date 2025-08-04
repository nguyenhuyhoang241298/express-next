import { usersTable } from './schema';

export type NewUser = typeof usersTable.$inferInsert;
