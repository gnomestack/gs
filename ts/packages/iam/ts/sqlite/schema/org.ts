import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, blob, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const organizationTable = sqliteTable('iam_organizations', {
    id: integer("id").primaryKey(),
    name: text("name"),
    slug: text("slug").unique("ux_iam_organizations_slug").notNull(),
    code: text("code"),
    data: text("data", { mode: 'json' }),
    createdAt: integer("created_at", { mode: 'timestamp_ms'}).notNull().default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp_ms'}),
});

export const organizationDomainsTable = sqliteTable('iam_organization_domains', {
    organizationId: integer("organization_id").notNull().references(() => organizationTable.id, { onDelete: 'cascade' }),
    domain: text("domain").notNull().unique("ux_iam_organization_domains_domain"),
    createdAt: integer("created_at", { mode: 'timestamp_ms'}).notNull().default(sql`now()`),
    updatedAt: integer("updated_at", { mode: 'timestamp_ms'}),
});

export const organizationDomainRelations = relations(organizationDomainsTable, ({ one }) => ({
    organization: one(organizationTable, {
        fields: [organizationDomainsTable.organizationId],
        references: [organizationTable.id],
    }),
}));