import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema/index';

export const connection = new Database(process.env.GNOME_IAM_SQLITE_FILE || process.env.GNOME_SQLITE_FILE || "./test.db");
export const db = drizzle(connection, { schema });