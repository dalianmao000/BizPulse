/**
 * Azure Synapse MCP Server
 *
 * Provides tools for querying and managing Azure Synapse Analytics
 *
 * Environment Variables Required:
 * - AZURE_SYnapse_WORKSPACE
 * - AZURE_SYnapse_POOL
 * - AZURE_CLIENT_ID
 * - AZURE_CLIENT_SECRET
 * - AZURE_TENANT_ID
 */

const { McpServer } = require('@anthropic-ai/mcp-sdk');
const { DefaultAzureCredential } = require('@azure/identity');
const mssql = require('mssql');

// Initialize Azure credentials
const credential = new DefaultAzureCredential();

// Synapse connection config
const getConnectionConfig = async () => ({
  server: `${process.env.AZURE_SYnapse_WORKSPACE}.sql.azuresynapse.net`,
  database: 'master',
  authentication: {
    type: 'service-principal',
    options: {
      tenantId: process.env.AZURE_TENANT_ID,
      clientId: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
    }
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  }
});

// Create MCP Server instance
const server = new McpServer({
  name: 'azure-synapse',
  version: '1.0.0',
});

// Tool: Execute SQL Query
server.tool('execute_query', {
  description: 'Execute a SQL query against Azure Synapse',
  inputSchema: {
    properties: {
      query: { type: 'string', description: 'SQL query to execute' },
      database: { type: 'string', description: 'Target database (optional)' },
    },
    required: ['query']
  },
}, async ({ query, database }) => {
  try {
    const config = await getConnectionConfig();
    if (database) {
      config.database = database;
    }

    const pool = await mssql.connect(config);
    const result = await pool.query(query);
    await pool.close();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          rowsAffected: result.rowsAffected,
          recordset: result.recordset,
          output: result.output
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error executing query: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Table Schema
server.tool('get_table_schema', {
  description: 'Get the schema of a table in Azure Synapse',
  inputSchema: {
    properties: {
      database: { type: 'string', description: 'Database name' },
      schema: { type: 'string', description: 'Schema name (default: dbo)' },
      table: { type: 'string', description: 'Table name' },
    },
    required: ['database', 'table']
  },
}, async ({ database, schema = 'dbo', table }) => {
  try {
    const config = await getConnectionConfig();
    config.database = database;

    const pool = await mssql.connect(config);
    const result = await pool.query(`
      SELECT
        COLUMN_NAME,
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH,
        IS_NULLABLE,
        COLUMN_DEFAULT
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${schema}'
        AND TABLE_NAME = '${table}'
      ORDER BY ORDINAL_POSITION
    `);
    await pool.close();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          database,
          schema,
          table,
          columns: result.recordset
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error getting table schema: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: List Databases
server.tool('list_databases', {
  description: 'List all databases in the Synapse workspace',
  inputSchema: {},
}, async () => {
  try {
    const config = await getConnectionConfig();
    const pool = await mssql.connect(config);
    const result = await pool.query(`
      SELECT name, create_date, state
      FROM sys.databases
      WHERE state = 0
      ORDER BY name
    `);
    await pool.close();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result.recordset, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing databases: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: List Tables
server.tool('list_tables', {
  description: 'List all tables in a database',
  inputSchema: {
    properties: {
      database: { type: 'string', description: 'Database name' },
      schema: { type: 'string', description: 'Schema name (default: dbo)' },
    },
    required: ['database']
  },
}, async ({ database, schema = 'dbo' }) => {
  try {
    const config = await getConnectionConfig();
    config.database = database;

    const pool = await mssql.connect(config);
    const result = await pool.query(`
      SELECT
        TABLE_SCHEMA,
        TABLE_NAME,
        TABLE_TYPE
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = '${schema}'
      ORDER BY TABLE_NAME
    `);
    await pool.close();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result.recordset, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing tables: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Execute Stored Procedure
server.tool('execute_procedure', {
  description: 'Execute a stored procedure',
  inputSchema: {
    properties: {
      database: { type: 'string', description: 'Database name' },
      schema: { type: 'string', description: 'Schema name (default: dbo)' },
      procedure: { type: 'string', description: 'Procedure name' },
      params: { type: 'object', description: 'Procedure parameters' },
    },
    required: ['database', 'procedure']
  },
}, async ({ database, schema = 'dbo', procedure, params }) => {
  try {
    const config = await getConnectionConfig();
    config.database = database;

    const pool = await mssql.connect(config);
    const request = pool.request();

    // Add parameters if provided
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
      }
    }

    const result = await request.execute(`${schema}.${procedure}`);
    await pool.close();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          rowsAffected: result.rowsAffected,
          recordset: result.recordset,
          returnValue: result.returnValue
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error executing procedure: ${error.message}`
      }],
      isError: true
    };
  }
});

// Start the server
server.start().catch(console.error);

console.log('Azure Synapse MCP Server started');