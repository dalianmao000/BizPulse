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

## Project Status

### ✅ Completed

| Module | Component | Status | Description |
|--------|-----------|--------|-------------|
| **Skills** | bi-workflow | ✅ Done | BI workflow orchestration for L2O/O2C/P2P |
| | dax-generator | ✅ Done | DAX code generation with templates |
| | data-modeler | ✅ Done | Data warehouse design with Kimball methodology |
| | etl-pipeline | ✅ Done | ETL pipeline builder with ADF support |
| **Agents** | DataArchAgent | ✅ Done | Data architecture design & ER modeling |
| | ETLOptAgent | ✅ Done | ETL performance optimization |
| | DAXBIAssistantAgent | ✅ Done | DAX generation & Power BI report design |
| | ProcessInsightAgent | ✅ Done | Business process insight & funnel analysis |
| | DocComplianceAgent | ✅ Done | Documentation & compliance management |
| **Hooks** | SessionStart | ✅ Done | Load BI business context on startup |
| | UserPromptSubmit | ✅ Done | Intent recognition & smart routing |
| | PreToolUse | ✅ Done | Operation compliance validation |
| | Stop | ✅ Done | Completeness check & auto-doc generation |
| **MCP Servers** | azure-data-factory | ✅ Done | ADF pipeline management |
| | azure-synapse | ✅ Done | SQL query execution |
| | powerbi-rest | ✅ Done | Power BI API integration |
| | azure-purview | ✅ Done | Data governance & catalog |
| **Documentation** | README | ✅ Done | English project documentation |
| | 快速入门指南 | ✅ Done | Chinese quick start guide |
| | 业务需求文档 | ✅ Done | Business requirements (Chinese) |
| | 测试用例 | ✅ Done | Test suite documentation |

### 🚧 Future Development

| Module | Component | Priority | Description |
|--------|-----------|----------|-------------|
| **MCP Servers** | azure-openai | P1 | Azure OpenAI integration for advanced analytics |
| | azure-data-lake | P2 | Data Lake storage management |
| | github-actions | P2 | CI/CD pipeline for BI deployments |
| **Skills** | ml-pipeline | P2 | Machine learning model training & evaluation |
| | data-quality | P1 | Data quality monitoring & anomaly detection |
| **Agents** | OrchestratorAgent | P1 | Central orchestrator for multi-agent coordination |
| | DataQualityAgent | P2 | Automated data quality improvement |
| **Features** | Natural language query | P1 | NL to SQL/DAX conversion with GPT |
| | Auto-report-generator | P1 | Automatic report generation from business logic |
| | Data lineage visualizer | P2 | Visual data lineage tracking |
| | KPI alerting system | P2 | Real-time KPI monitoring & alerting |
| **Testing** | Integration tests | P1 | End-to-end MCP integration tests |
| | Performance benchmarks | P2 | DAX & query performance benchmarks |
| **Infrastructure** | Docker deployment | P2 | Containerized MCP server deployment |
| | Terraform scripts | P2 | Azure infrastructure as code |
| | GitHub Actions CI | P2 | Automated testing & deployment |

### 📊 Roadmap Phases

| Phase | Timeline | Goals |
|-------|----------|-------|
| **Phase 1** | Done | Core BI platform foundation - Skills, Agents, Hooks, basic MCP |
| **Phase 2** | 3-6 months | Advanced analytics - OpenAI integration, NL query, auto-reports |
| **Phase 3** | 6-12 months | Enterprise scale - Multi-tenant, CI/CD, performance optimization |

## License

MIT