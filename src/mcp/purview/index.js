/**
 * Azure Purview MCP Server
 *
 * Provides tools for data cataloging, lineage tracking, and governance
 *
 * Note: This uses HTTP transport - configure Purview token in .mcp.json
 */

const { McpServer } = require('@anthropic-ai/mcp-sdk');

// Create MCP Server instance
const server = new McpServer({
  name: 'azure-purview',
  version: '1.0.0',
});

// Base URL for Purview Catalog API
const getBaseUrl = () => `https://${process.env.PURVIEW_ACCOUNT}.purview.azure.com`;

// Helper function to make Purview API calls
const purviewRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${getBaseUrl()}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  });

  if (!response.ok) {
    throw new Error(`Purview API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Tool: Search Catalog
server.tool('search_catalog', {
  description: 'Search the data catalog',
  inputSchema: {
    properties: {
      keyword: { type: 'string', description: 'Search keyword' },
      type: { type: 'string', description: 'Asset type filter (Table, Dataset, Pipeline, etc.)' },
      collection: { type: 'string', description: 'Collection name' },
    },
    required: ['keyword']
  },
}, async ({ keyword, type, collection }) => {
  try {
    let query = `/catalog/api/v1/search?q=${encodeURIComponent(keyword)}`;
    if (type) query += `&type=${type}`;
    if (collection) query += `&collection=${encodeURIComponent(collection)}`;

    const results = await purviewRequest(query);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          totalCount: results.totalCount,
          results: results.value || results
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error searching catalog: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Asset
server.tool('get_asset', {
  description: 'Get asset details from the catalog',
  inputSchema: {
    properties: {
      guid: { type: 'string', description: 'Asset GUID' },
    },
    required: ['guid']
  },
}, async ({ guid }) => {
  try {
    const asset = await purviewRequest(`/catalog/api/v1/atlas/v2/entity/${guid}`);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          guid: asset.guid,
          typeName: asset.typeName,
          attributes: asset.attributes,
          classifications: asset.classifications,
          status: asset.status
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error getting asset: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Lineage
server.tool('get_lineage', {
  description: 'Get lineage information for an asset',
  inputSchema: {
    properties: {
      guid: { type: 'string', description: 'Asset GUID' },
      depth: { type: 'number', description: 'Lineage depth (default: 3)' },
    },
    required: ['guid']
  },
}, async ({ guid, depth = 3 }) => {
  try {
    const lineage = await purviewRequest(
      `/catalog/api/v1/lineage/${guid}?depth=${depth}`
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(lineage, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error getting lineage: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Create Classification
server.tool('create_classification', {
  description: 'Create a classification rule',
  inputSchema: {
    properties: {
      name: { type: 'string', description: 'Classification name' },
      description: { type: 'string', description: 'Classification description' },
      entityType: { type: 'string', description: 'Entity type to apply to' },
    },
    required: ['name']
  },
}, async ({ name, description, entityType }) => {
  try {
    const classification = await purviewRequest('/catalog/api/v1/atlas/v2/types/classificationdef', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        entityTypes: entityType ? [{ name: entityType }] : []
      })
    });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          name: classification.name,
          guid: classification.guid,
          status: 'Created'
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error creating classification: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Type Definition
server.tool('get_type_definition', {
  description: 'Get a type definition from the catalog',
  inputSchema: {
    properties: {
      typeName: { type: 'string', description: 'Type name (e.g., aws_dynamodb_table)' },
    },
    required: ['typeName']
  },
}, async ({ typeName }) => {
  try {
    const typeDef = await purviewRequest(`/catalog/api/v1/atlas/v2/types/typedef/name/${typeName}`);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(typeDef, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error getting type definition: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Add Classification to Asset
server.tool('add_asset_classification', {
  description: 'Add a classification to an asset',
  inputSchema: {
    properties: {
      guid: { type: 'string', description: 'Asset GUID' },
      classificationName: { type: 'string', description: 'Classification name' },
    },
    required: ['guid', 'classificationName']
  },
}, async ({ guid, classificationName }) => {
  try {
    await purviewRequest(`/catalog/api/v1/atlas/v2/entity/${guid}/classifications`, {
      method: 'POST',
      body: JSON.stringify([{
        typeName: classificationName
      }])
    });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          guid,
          classificationName,
          status: 'Added'
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error adding classification: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Create Glossary Term
server.tool('create_glossary_term', {
  description: 'Create a glossary term',
  inputSchema: {
    properties: {
      name: { type: 'string', description: 'Term name' },
      glossaryGuid: { type: 'string', description: 'Glossary GUID' },
      definition: { type: 'string', description: 'Term definition' },
      status: { type: 'string', description: 'Term status (Approved, Draft, etc.)' },
    },
    required: ['name', 'glossaryGuid']
  },
}, async ({ name, glossaryGuid, definition, status = 'Draft' }) => {
  try {
    const term = await purviewRequest('/catalog/api/v1/atlas/v2/glossary', {
      method: 'POST',
      body: JSON.stringify({
        name,
        glossaryGuid,
        definition,
        status,
        usedIn: []
      })
    });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          name: term.name,
          guid: term.guid,
          status: 'Created'
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error creating glossary term: ${error.message}`
      }],
      isError: true
    };
  }
});

// Start the server
server.start().catch(console.error);

console.log('Azure Purview MCP Server started');