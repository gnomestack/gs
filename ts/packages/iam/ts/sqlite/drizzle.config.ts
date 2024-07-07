import { defineConfig } from 'drizzle-kit';

let dir = "";
const g = globalThis as any;

if (typeof g.process !== 'undefined') {
   dir = __dirname;
} else if (typeof g.Deno !== 'undefined') {

}

export default defineConfig({
  schema: './ts/sqlite/schema/index.ts',
  out: process.env.GNOME_IAM_SQLITE_MIGRATIONS || "./migrations/sqlite",
  dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.GNOME_IAM_SQLITE_FILE || process.env.GNOME_SQLITE_FILE || "./test.db"
  },
});