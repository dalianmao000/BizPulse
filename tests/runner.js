/**
 * BizPulse Test Runner
 *
 * Runs test cases for the BI intelligence platform
 */

const fs = require('fs');
const path = require('path');

// Test results collector
const results = {
  passed: 0,
  failed: 0,
  errors: []
};

// Mock test execution
function runTest(name, testFn) {
  try {
    testFn();
    results.passed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    results.failed++;
    results.errors.push({ name, error: error.message });
    console.log(`✗ ${name}: ${error.message}`);
  }
}

// Test: Skills files exist
function testSkillsExist() {
  const skills = ['bi-workflow', 'dax-generator', 'data-modeler', 'etl-pipeline'];
  const basePath = path.join(__dirname, '../.claude/skills');

  skills.forEach(skill => {
    const skillPath = path.join(basePath, skill, 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      throw new Error(`Skill not found: ${skill}`);
    }
  });
}

// Test: Agents files exist
function testAgentsExist() {
  const agents = [
    'data-arch-agent.md',
    'dax-bi-agent.md',
    'doc-compliance-agent.md',
    'etl-opt-agent.md',
    'process-insight-agent.md'
  ];
  const basePath = path.join(__dirname, '../.claude/agents');

  agents.forEach(agent => {
    const agentPath = path.join(basePath, agent);
    if (!fs.existsSync(agentPath)) {
      throw new Error(`Agent not found: ${agent}`);
    }
  });
}

// Test: MCP servers exist
function testMcpServersExist() {
  const servers = [
    'azure-data-factory/index.js',
    'azure-synapse/index.js',
    'powerbi-rest/index.js',
    'purview/index.js'
  ];
  const basePath = path.join(__dirname, '../src/mcp');

  servers.forEach(server => {
    const serverPath = path.join(basePath, server);
    if (!fs.existsSync(serverPath)) {
      throw new Error(`MCP server not found: ${server}`);
    }
  });
}

// Test: Hooks config valid JSON
function testHooksConfig() {
  const hooksPath = path.join(__dirname, '../.claude/hooks/hooks.json');
  const content = fs.readFileSync(hooksPath, 'utf8');

  try {
    JSON.parse(content);
  } catch (e) {
    throw new Error(`Invalid hooks.json: ${e.message}`);
  }
}

// Test: MCP config valid JSON
function testMcpConfig() {
  const mcpPath = path.join(__dirname, '../.mcp.json');
  const content = fs.readFileSync(mcpPath, 'utf8');

  try {
    JSON.parse(content);
  } catch (e) {
    throw new Error(`Invalid .mcp.json: ${e.message}`);
  }
}

// Test: README exists
function testReadmeExists() {
  const readmePath = path.join(__dirname, '../README.md');
  if (!fs.existsSync(readmePath)) {
    throw new Error('README.md not found');
  }
}

// Run tests
console.log('BizPulse Test Suite');
console.log('====================\n');

runTest('Skills files exist', testSkillsExist);
runTest('Agents files exist', testAgentsExist);
runTest('MCP servers exist', testMcpServersExist);
runTest('Hooks config valid JSON', testHooksConfig);
runTest('MCP config valid JSON', testMcpConfig);
runTest('README exists', testReadmeExists);

console.log('\n====================');
console.log(`Results: ${results.passed} passed, ${results.failed} failed`);

if (results.failed > 0) {
  console.log('\nFailed tests:');
  results.errors.forEach(e => console.log(`  - ${e.name}: ${e.error}`));
  process.exit(1);
} else {
  console.log('\nAll tests passed!');
  process.exit(0);
}