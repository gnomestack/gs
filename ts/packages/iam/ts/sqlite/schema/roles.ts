import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, blob, uniqueIndex, primaryKey } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';

export const roleTable = sqliteTable('iam_roles', {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    nameSlug: text("name_slug")
        .unique("ux_iam_roles_name_slug")
        .notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
});

export const roleClaimTable = sqliteTable('iam_role_claims', {
    id: integer("id").primaryKey(),
    roleId: integer("role_id")
        .notNull()
        .references(() => roleTable.id, { onDelete: 'cascade' }),
    type: text("type").notNull(),
    value: text("value").notNull(),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
});

export const userRoleTable = sqliteTable('iam_user_roles', {
    userId: integer("user_id")
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    roleId: integer("role_id")
        .notNull()
        .references(() => roleTable.id, { onDelete: 'cascade' }),
    createdAt: integer("created_at", { mode: 'timestamp' })
        .notNull()
        .default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp' }),
}, (userRole) => ({
    compositePK: primaryKey({
        columns: [userRole.userId, userRole.roleId],
    })
}));

export const userRoleRelations = relations(userRoleTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userRoleTable.userId],
    references: [userTable.id],
  }),
  role: one(roleTable, {
    fields: [userRoleTable.roleId],
    references: [roleTable.id],
  }),
}));

