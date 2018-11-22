const _ = require('lodash');

/**
 * 
 * @param {Object} client Client or connection pool for sending queries to database
 * @param {String} schema Schema name from which to list tables
 * @returns {Promise<Array<{ tableName: string, primaryKey: string }>>} List of tables in provided schema 
 */
const getAllTables = async (client, schema) => (await client.query(`
SELECT t.table_name AS tableName, kcu.column_name AS primaryKey
FROM INFORMATION_SCHEMA.TABLES t
LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    ON tc.table_catalog = t.table_catalog
    AND tc.table_schema = t.table_schema
    AND tc.table_name = t.table_name
    AND tc.constraint_type = 'PRIMARY KEY'
LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    ON kcu.table_catalog = tc.table_catalog
    AND kcu.table_schema = tc.table_schema
    AND kcu.table_name = tc.table_name
    AND kcu.constraint_name = tc.constraint_name
WHERE t.table_schema = ($1)::string
ORDER BY t.table_catalog,
         t.table_schema,
         t.table_name,
         kcu.constraint_name,
         kcu.ordinal_position;
`, [schema])).rows;

/**
 * 
 * @param {Object} client Client or connection pool for sending queries to database
 * @param {String} schema Schema name from which to list tables
 * @returns {Object} Dump of all data in provided schema
 */
const createSnapshot = async (client, schema) => {
    const tables = await getAllTables(client, schema);

    const data = { };
    await Promise.all(tables.map(async ({ tableName, primaryKey }) => {
        const records = (await client.query(`SELECT * from ${schema}.${tableName}`)).rows;
        data[table] = _.fromPairs(records.map(rec => [rec[primaryKey], rec]));
    }));

    return data;
};

module.exports = createSnapshot;