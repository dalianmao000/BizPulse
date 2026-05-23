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

## 项目状态

### ✅ 已完成

| 模块 | 组件 | 状态 | 说明 |
|------|------|------|------|
| **技能（Skills）** | bi-workflow | ✅ 完成 | L2O/O2C/P2P 业务流程编排 |
| | dax-generator | ✅ 完成 | DAX 代码生成（含模板） |
| | data-modeler | ✅ 完成 | Kimball 方法论数据仓库设计 |
| | etl-pipeline | ✅ 完成 | ETL 流程构建与 ADF 支持 |
| **代理（Agents）** | DataArchAgent | ✅ 完成 | 数据架构设计与 ER 建模 |
| | ETLOptAgent | ✅ 完成 | ETL 性能优化 |
| | DAXBIAssistantAgent | ✅ 完成 | DAX 生成与 Power BI 报表设计 |
| | ProcessInsightAgent | ✅ 完成 | 业务洞察与漏斗分析 |
| | DocComplianceAgent | ✅ 完成 | 文档生成与合规管理 |
| **钩子（Hooks）** | SessionStart | ✅ 完成 | 启动时加载 BI 业务上下文 |
| | UserPromptSubmit | ✅ 完成 | 意图识别与智能路由 |
| | PreToolUse | ✅ 完成 | 操作合规性验证 |
| | Stop | ✅ 完成 | 完整性检查与自动文档生成 |
| **MCP 服务器** | azure-data-factory | ✅ 完成 | ADF 管道管理 |
| | azure-synapse | ✅ 完成 | SQL 查询执行 |
| | powerbi-rest | ✅ 完成 | Power BI API 集成 |
| | azure-purview | ✅ 完成 | 数据治理与目录 |
| **文档** | README | ✅ 完成 | 英文项目文档 |
| | 快速入门指南 | ✅ 完成 | 中文快速入门 |
| | 业务需求文档 | ✅ 完成 | 业务需求文档（中文） |
| | 测试用例 | ✅ 完成 | 测试套件文档 |

### 🚧 未来开发计划

| 模块 | 组件 | 优先级 | 说明 |
|------|------|--------|------|
| **MCP 服务器** | azure-openai | P1 | Azure OpenAI 集成用于高级分析 |
| | azure-data-lake | P2 | Data Lake 存储管理 |
| | github-actions | P2 | CI/CD 流水线用于 BI 部署 |
| **技能（Skills）** | ml-pipeline | P2 | 机器学习模型训练与评估 |
| | data-quality | P1 | 数据质量监控与异常检测 |
| **代理（Agents）** | OrchestratorAgent | P1 | 多代理协调中央编排器 |
| | DataQualityAgent | P2 | 自动化数据质量改进 |
| **功能** | 自然语言查询 | P1 | NL 转 SQL/DAX（GPT） |
| | 自动报表生成 | P1 | 从业务逻辑自动生成报表 |
| | 数据血缘可视化 | P2 | 可视化数据血缘追踪 |
| | KPI 告警系统 | P2 | 实时 KPI 监控与告警 |
| **测试** | 集成测试 | P1 | 端到端 MCP 集成测试 |
| | 性能基准 | P2 | DAX 与查询性能基准 |
| **基础设施** | Docker 部署 | P2 | MCP 服务器容器化部署 |
| | Terraform 脚本 | P2 | Azure 基础设施即代码 |
| | GitHub Actions CI | P2 | 自动化测试与部署 |

### 📊 路线图阶段

| 阶段 | 时间 | 目标 |
|------|------|------|
| **Phase 1** | 已完成 | 核心 BI 平台基础 - Skills、Agents、Hooks、基础 MCP |
| **Phase 2** | 3-6 个月 | 高级分析 - OpenAI 集成、NL 查询、自动报表 |
| **Phase 3** | 6-12 个月 | 企业级扩展 - 多租户、CI/CD、性能优化 |

## 许可证

MIT