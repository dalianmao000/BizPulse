/**
 * Azure Data Factory MCP Server
 *
 * Provides tools for managing ADF pipelines, datasets, and triggers
 *
 * Environment Variables Required:
 * - AZURE_SUBSCRIPTION_ID
 * - AZURE_RESOURCE_GROUP
 * - AZURE_ADF_NAME
 * - AZURE_CLIENT_ID
 * - AZURE_CLIENT_SECRET
 * - AZURE_TENANT_ID
 */

const { McpServer } = require('@anthropic-ai/mcp-sdk');
const { Azure.Identity } = require('@azure/identity');
const { Azure.DataFactory } = require('@azure/data-factory');

// Initialize Azure credentials
const credential = new Azure.Identity.DefaultAzureCredential();

// Create ADF client
const adfClient = new Azure.DataFactory.DataFactoryManagementClient(
  credential,
  process.env.AZURE_SUBSCRIPTION_ID
);

// Create MCP Server instance
const server = new McpServer({
  name: 'azure-data-factory',
  version: '1.0.0',
});

// Tool: List Pipelines
server.tool('list_pipelines', {
  description: 'List all pipelines in the Data Factory',
  inputSchema: {
    properties: {
      resourceGroup: { type: 'string' },
      factoryName: { type: 'string' },
    },
  },
}, async ({ resourceGroup, factoryName }) => {
  try {
    const pipelines = await adfClient.pipelines.list(
      resourceGroup || process.env.AZURE_RESOURCE_GROUP,
      factoryName || process.env.AZURE_ADF_NAME
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(pelines, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing pipelines: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Run Pipeline
server.tool('run_pipeline', {
  description: 'Trigger a pipeline run',
  inputSchema: {
    properties: {
      resourceGroup: { type: 'string' },
      factoryName: { type: 'string' },
      pipelineName: { type: 'string' },
      parameters: { type: 'object' },
    },
    required: ['pipelineName']
  },
}, async ({ resourceGroup, factoryName, pipelineName, parameters }) => {
  try {
    const runResponse = await adfClient.pipelines.createRun(
      resourceGroup || process.env.AZURE_RESOURCE_GROUP,
      factoryName || process.env.AZURE_ADF_NAME,
      pipelineName,
      parameters || {}
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          runId: runResponse.runId,
          status: 'Triggered',
          pipelineName: pipelineName
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error running pipeline: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Get Pipeline Run Status
server.tool('get_pipeline_status', {
  description: 'Get the status of a pipeline run',
  inputSchema: {
    properties: {
      resourceGroup: { type: 'string' },
      factoryName: { type: 'string' },
      runId: { type: 'string' },
    },
    required: ['runId']
  },
}, async ({ resourceGroup, factoryName, runId }) => {
  try {
    const runInfo = await adfClient.pipelineRuns.get(
      resourceGroup || process.env.AZURE_RESOURCE_GROUP,
      factoryName || process.env.AZURE_ADF_NAME,
      runId
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          runId: runInfo.runId,
          status: runInfo.status,
          pipelineName: runInfo.pipelineName,
          startTime: runInfo.runStart,
          endTime: runInfo.runEnd,
          duration: runInfo.duration
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error getting pipeline status: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: Create Pipeline
server.tool('create_pipeline', {
  description: 'Create or update a pipeline',
  inputSchema: {
    properties: {
      resourceGroup: { type: 'string' },
      factoryName: { type: 'string' },
      pipelineName: { type: 'string' },
      pipelineBody: { type: 'object' },
    },
    required: ['pipelineName', 'pipelineBody']
  },
}, async ({ resourceGroup, factoryName, pipelineName, pipelineBody }) => {
  try {
    const pipeline = await adfClient.pipelines.createOrUpdate(
      resourceGroup || process.env.AZURE_RESOURCE_GROUP,
      factoryName || process.env.AZURE_ADF_NAME,
      pipelineName,
      pipelineBody
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          name: pipeline.name,
          id: pipeline.id,
          status: 'Created/Updated'
        }, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error creating pipeline: ${error.message}`
      }],
      isError: true
    };
  }
});

// Tool: List Triggers
server.tool('list_triggers', {
  description: 'List all triggers in the Data Factory',
  inputSchema: {
    properties: {
      resourceGroup: { type: 'string' },
      factoryName: { type: 'string' },
    },
  },
}, async ({ resourceGroup, factoryName }) => {
  try {
    const triggers = await adfClient.triggers.list(
      resourceGroup || process.env.AZURE_RESOURCE_GROUP,
      factoryName || process.env.AZURE_ADF_NAME
    );

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(triggers, null, 2)
      }]
    };
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error listing triggers: ${error.message}`
      }],
      isError: true
    };
  }
});

// Start the server
server.start().catch(console.error);

console.log('Azure Data Factory MCP Server started');