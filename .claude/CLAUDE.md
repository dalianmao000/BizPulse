# BizPulse BI 业务智能平台

## 项目概述

本项目基于 Claude Code 扩展体系构建企业级 BI 数据架构与智能分析平台。

**核心功能**：
- 多 Agent 协同的 BI 业务智能中枢
- 支持 L2O/O2C/P2P 核心业务流程分析
- 自动化 DAX 代码生成与报表开发
- ETL 流程智能优化
- 数据治理与合规管理

## 技术架构

- **扩展机制**：Skills + Hooks + Agents + MCP
- **云平台**：Azure (Data Factory, Synapse, Purview, Power BI)
- **AI 能力**：Azure OpenAI

## 目录结构

```
.claude/
├── CLAUDE.md           # 本文件
├── skills/             # 业务技能
├── agents/             # 子代理定义
└── hooks/              # 生命周期钩子

src/
├── mcp/                # MCP 服务器实现
└── scripts/            # 辅助脚本

docs/                   # 文档
tests/                  # 测试用例
```

## 核心技能

| 技能 | 说明 |
|------|------|
| bi-workflow | BI 业务工作流编排 |
| dax-generator | DAX 代码生成 |
| data-modeler | 数据模型设计 |
| etl-pipeline | ETL 流程构建 |

## 核心代理

| 代理 | 职责 |
|------|------|
| DataArchAgent | 数据架构设计 |
| ETLOptAgent | ETL 优化 |
| DAXBIAssistantAgent | BI 报表生成 |
| ProcessInsightAgent | 业务洞察分析 |
| DocComplianceAgent | 文档合规 |

## 使用说明

1. **BI 业务流程分析**：直接描述业务需求，系统自动调度相关 Agent
2. **DAX 代码生成**：描述需要的计算逻辑，Skill 自动生成代码
3. **数据模型设计**：描述业务实体关系，Agent 输出数据模型建议

## 开发规范

- 所有 Skill 文件使用 SKILL.md 命名
- 所有 Agent 文件使用 .md 格式
- MCP 服务器使用 TypeScript 实现
- Hooks 配置使用 JSON 格式

## 参考文档

- 业务需求：`docs/业务需求文档.md`
- AI 实现方案：见原始对话记录