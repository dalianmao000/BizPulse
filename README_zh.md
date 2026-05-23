# BizPulse - AI 驱动的 BI 智能平台

基于 Claude Code 扩展体系（Skills、Hooks、Agents、MCP）构建的企业级 BI 数据架构与智能分析平台。

## 核心特性

- **多 Agent 协同**：通过专业 Agent（DataArchAgent、ETLOptAgent、DAXBIAssistantAgent、ProcessInsightAgent、DocComplianceAgent）编排 BI 任务
- **自动化 DAX 生成**：自然语言转 DAX 代码，用于 Power BI 报表开发
- **数据模型设计**：基于 Kimball 方法论的企业级数据仓库设计
- **ETL 流程构建**：Azure Data Factory 管道设计与优化
- **MCP 服务集成**：连接 Azure 服务（Synapse、ADF、Power BI、Purview）

## 支持的业务流程

- **L2O**（Lead to Order）：线索到订单，销售漏斗分析
- **O2C**（Order to Cash）：订单到回款，订单到收款周期分析
- **P2P**（Procure to Pay）：采购到付款，采购合规监控

## 快速开始

```bash
# 进入项目目录
cd bizpulse

# 启动 Claude Code
claude

# 示例请求
"分析 O2C 应收账款账龄"
"生成毛利率 DAX 代码"
"设计销售主题数据模型"
```

## 项目结构

```
bizpulse/
├── .claude/
│   ├── CLAUDE.md           # 项目配置
│   ├── skills/             # 4 个核心技能
│   │   ├── bi-workflow/    # BI 业务工作流编排
│   │   ├── dax-generator/  # DAX 代码生成
│   │   ├── data-modeler/   # 数据模型设计
│   │   └── etl-pipeline/   # ETL 流程构建
│   ├── agents/             # 5 个专业代理
│   │   ├── data-arch-agent.md
│   │   ├── etl-opt-agent.md
│   │   ├── dax-bi-agent.md
│   │   ├── process-insight-agent.md
│   │   └── doc-compliance-agent.md
│   └── hooks/
│       └── hooks.json       # 生命周期钩子配置
├── src/
│   └── mcp/                 # MCP 服务器实现
│       ├── azure-data-factory/
│       ├── azure-synapse/
│       ├── powerbi-rest/
│       └── purview/
├── docs/                    # 文档
│   └── 快速入门指南.md
├── tests/                   # 测试用例
│   ├── runner.js
│   └── 测试用例.md
├── .gitignore
├── .mcp.json                # MCP 配置
├── LICENSE                  # MIT 许可证
├── README.md
├── CONTRIBUTING.md
└── package.json
```

## 技能（Skills）

| 技能 | 用途 | 触发场景 |
|------|------|----------|
| bi-workflow | BI 工作流编排 | L2O/O2C/P2P 分析、BI 报表设计 |
| dax-generator | DAX 代码生成 | Power BI DAX、时间智能、复杂计算 |
| data-modeler | 数据仓库设计 | 维度建模、ER 图、指标体系 |
| etl-pipeline | ETL 流程构建 | ETL 设计、数据同步、ADF 配置 |

## 代理（Agents）

| 代理 | 职责 | 触发场景 |
|------|------|----------|
| DataArchAgent | 数据架构设计 | 数据模型设计需求 |
| ETLOptAgent | ETL 优化 | ETL 相关任务 |
| DAXBIAssistantAgent | BI 报表生成 | BI 开发需求 |
| ProcessInsightAgent | 业务洞察分析 | 业务洞察需求 |
| DocComplianceAgent | 文档与合规 | 文档相关需求 |

## MCP 服务器

| 服务器 | 用途 |
|--------|------|
| azure-data-factory | ADF 管道管理 |
| azure-synapse | SQL 查询执行 |
| powerbi-rest | Power BI API 集成 |
| azure-purview | 数据治理与目录 |

## 文档

- [快速入门指南](docs/快速入门指南.md)
- [业务需求文档](业务需求文档.md)
- [测试用例](tests/测试用例.md)

## 许可证

MIT