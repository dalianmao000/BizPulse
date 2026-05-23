/**
 * Power BI REST API MCP Server
 *
 * Provides tools for managing Power BI reports, datasets, and workspaces
 *
 * Note: This uses HTTP transport - configure Power BI token in .mcp.json
 */

const { McpServer } = require('@anthropic-ai/mcp-sdk');

// Create MCP Server instance
const server = new McpServer({
  name: 'powerbi-rest',
  version: '1.0.0',
});

// Base URL for Power BI REST API
const BASE_URL = 'https://api.powerbi.com/v1.0/myorg';

// Helper function to make Power BI API calls
const powerBiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  });

  if (!response.ok) {
    throw new Error(`Power BI API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Tool: List Workspaces
server.tool('list_workspaces', {
  description: 'List all Power BI workspaces',
  inputSchema: {},
}, async () => {
  try {
    const workspaces = await powerBiRequest('/groups');
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(workspaces, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing workspaces: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Reports
server.tool('list_reports', {
  description: 'List all reports in a workspace',
  inputSchema: {
    properties: {
      workspaceId: { type: 'string', description: 'Workspace ID' },
    },
    required: ['workspaceId']
  },
}, async ({ workspaceId }) => {
  try {
    const reports = await powerBiRequest(`/groups/${workspaceId}/reports`);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(reports, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing reports: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Datasets
server.tool('list_datasets', {
  description: 'List all datasets in a workspace',
  inputSchema: {
    properties: {
      workspaceId: { type: 'string', description: 'Workspace ID' },
    },
    required: ['workspaceId']
  },
}, async ({ workspaceId }) => {
  try {
    const datasets = await powerBiRequest(`/groups/${workspaceId}/datasets`);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(datasets, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing datasets: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Refresh Dataset
server.tool('refresh_dataset', {
  description: 'Trigger a dataset refresh',
  inputSchema: {
    properties: {
      workspaceId: { type: 'string', description: 'Workspace ID' },
      datasetId: { type: 'string', description: 'Dataset ID' },
    },
    required: ['workspaceId', 'datasetId']
  },
}, async ({ workspaceId, datasetId }) => {
  try {
    await powerBiRequest(
      `/groups/${workspaceId}/datasets/${datasetId}/refreshes`,
      {
        method: 'POST'
      }
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          status: 'success',
          message: `Dataset ${datasetId} refresh triggered`
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error refreshing dataset: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Dashboard
server.tool('get_dashboards', {
  description: 'List all dashboards in a workspace',
  inputSchema: {
    properties: {
      workspaceId: { type: 'string', description: 'Workspace ID' },
    },
    required: ['workspaceId']
  },
}, async ({ workspaceId }) => {
  try {
    const dashboards = await powerBiRequest(`/groups/${workspaceId}/dashboards`);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(dashboards, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing dashboards: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Tile
server.tool('get_tile', {
  description: 'Get details of a dashboard tile',
  inputSchema: {
    properties: {
      workspaceId: { type: 'string', description: 'Workspace ID' },
      dashboardId: { type: 'string', description: 'Dashboard ID' },
      tileId: { type: 'string', description: 'Tile ID' },
    },
    required: ['workspaceId', 'dashboardId', 'tileId']
  },
}, async ({ workspaceId, dashboardId, tileId }) => {
  try {
    const tile = await powerBiRequest(
      `/groups/${workspaceId}/dashboards/${dashboardId}/tiles/${tileId}`
    );
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(tile, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error getting tile: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Group Users
server.tool('list_group_users', {
  description: 'List users in a workspace',
  inputSchema: {
    properties: {
      workspaceId: { type: 'string', description: 'Workspace ID' },
    },
    required: ['workspaceId']
  },
}, async ({ workspaceId }) => {
  try {
    const users = await powerBiRequest(`/groups/${workspaceId}/users`);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(users, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing group users: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Post Group
server.tool('create_workspace', {
  description: 'Create a new Power BI workspace',
  inputSchema: {
    properties: {
      name: { type: 'string', description: 'Workspace name' },
    },
    required: ['name']
  },
}, async ({ name }) => {
  try {
    const workspace = await powerBiRequest('/groups', {
      method: 'POST',
      body: JSON.stringify({ name })
    });

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          id: workspace.id,
          name: workspace.name,
          status: 'Created'
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error creating workspace: ${error.message}`
      }],
      isError: true
    };
  }
});

// Start the server
server.start().catch(console.error);

console.log('Power BI REST MCP Server started');