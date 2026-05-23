# BizPulse - AI-Powered BI Intelligence Platform

A business intelligence platform built on Claude Code's extension system (Skills, Hooks, Agents, MCP) for enterprise-grade data architecture and intelligent analysis.

## Features

- **Multi-Agent BI Workflow**: Orchestrate BI tasks through specialized agents (DataArchAgent, ETLOptAgent, DAXBIAssistantAgent, ProcessInsightAgent, DocComplianceAgent)
- **Automated DAX Generation**: Natural language to DAX code for Power BI
- **Data Model Designer**: Enterprise data warehouse design with Kimball methodology
- **ETL Pipeline Builder**: Azure Data Factory pipeline design and optimization
- **MCP Integration**: Connect to Azure services (Synapse, ADF, Power BI, Purview)

## Core Business Processes

- **L2O** (Lead to Order): Sales funnel analysis
- **O2C** (Order to Cash): Order-to-cash cycle analysis
- **P2P** (Procure to Pay): Procurement compliance monitoring

## Quick Start

```bash
# Enter project directory
cd bizpulse

# Start Claude Code
claude

# Request BI analysis (example)
"Analyze O2C accounts receivable aging"
```

## Project Structure

```
.claude/
├── CLAUDE.md           # Project configuration
├── skills/             # 4 core skills
│   ├── bi-workflow/    # BI workflow orchestration
│   ├── dax-generator/  # DAX code generation
│   ├── data-modeler/   # Data model design
│   └── etl-pipeline/   # ETL pipeline builder
├── agents/             # 5 specialized agents
│   ├── data-arch-agent.md
│   ├── etl-opt-agent.md
│   ├── dax-bi-agent.md
│   ├── process-insight-agent.md
│   └── doc-compliance-agent.md
└── hooks/
    └── hooks.json      # Lifecycle hooks

src/
└── mcp/                # MCP server implementations
    ├── azure-data-factory/
    ├── azure-synapse/
    ├── powerbi-rest/
    └── purview/

docs/                   # Documentation
tests/                  # Test cases
```

## Skills

| Skill | Purpose | Trigger |
|-------|---------|---------|
| bi-workflow | BI business workflow orchestration | L2O/O2C/P2P analysis, BI report design |
| dax-generator | DAX code generation | Power BI DAX, time intelligence, complex calculations |
| data-modeler | Data warehouse design | Dimension modeling, ER diagram, metric system |
| etl-pipeline | ETL process construction | ETL design, data sync strategy, ADF configuration |

## Agents

| Agent | Responsibility | Trigger |
|-------|---------------|---------|
| DataArchAgent | Data architecture design | Data model design needs |
| ETLOptAgent | ETL optimization | ETL related tasks |
| DAXBIAssistantAgent | BI report generation | BI development needs |
| ProcessInsightAgent | Business insight analysis | Business insight needs |
| DocComplianceAgent | Documentation & compliance | Documentation needs |

## MCP Servers

| Server | Purpose |
|--------|---------|
| azure-data-factory | ADF pipeline management |
| azure-synapse | SQL query execution |
| powerbi-rest | Power BI API integration |
| azure-purview | Data governance & catalog |

## Documentation

- [快速入门指南](docs/快速入门指南.md) (Chinese)
- [业务需求文档](docs/业务需求文档.md) (Chinese)
- [测试用例](tests/测试用例.md) (Chinese)

## License

MIT