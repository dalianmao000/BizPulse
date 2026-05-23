---
name: etl-pipeline-builder
description: 当用户需要构建或优化 ETL 数据管道时使用此技能
version: 1.0.0
trigger: |
  用户请求涉及以下场景时触发：
  - ETL 流程设计与开发
  - 数据同步策略（全量/增量/CDC）
  - Azure Data Factory 管道配置
  - 数据清洗与转换逻辑
  - ETL 性能优化
  - 数据质量监控
---

# ETL Pipeline Builder Skill

## 技能职责

设计、构建和优化企业级 ETL 数据管道。

## ETL 设计模式

### 1. 批量处理模式

```
源系统 → 抽取 → 转换 → 加载 → 目标系统
         │         │         │
         ▼         ▼         ▼
      Staging    清洗    数据仓库
```

### 2. 增量处理模式

```
触发器 → 增量抽取 → 变化检测 → 加载 → 审计
         │              │
         ▼              ▼
      Change Log    Upsert Logic
```

### 3. CDC (Change Data Capture) 模式

```
源表 → CDC Log → 增量识别 → 路由 → 目标表
                      │
                      ▼
                 插入/更新/删除
```

## Azure Data Factory 组件

### 管道结构

```json
{
  "name": "Pipeline_Name",
  "properties": {
    "activities": [
      {
        "name": "Copy_Source_to_Stage",
        "type": "Copy",
        "typeProperties": {
          "source": { "type": "SqlServerSource" },
          "sink": { "type": "BlobSink" },
          "enableStaging": true
        }
      },
      {
        "name": "Transform_Data",
        "type": "DataFlow",
        "typeProperties": {
          "compute": { "coreCount": 16 },
          "transformation": [...]
        }
      }
    ],
    "parameters": {...},
    "variables": {...}
  }
}
```

### 数据流转换

| 转换类型 | 用途 | ADF 组件 |
|----------|------|----------|
| Select | 列选择/重命名 | Select transformation |
| Filter | 行过滤 | Filter transformation |
| Join | 表关联 | Join transformation |
| Aggregate | 聚合计算 | Aggregate transformation |
| Union | 数据合并 | Union transformation |
| DerivedColumn | 列计算 | Derived Column transformation |
| Window | 窗口函数 | Window transformation |
| Exists | 数据存在性检查 | Exists transformation |

## 数据同步策略

### 全量同步

适用场景：历史数据初始化、小表全量同步
```python
# ADF Copy Activity 配置
source = {
    "type": "SqlServerSource",
    "sqlReaderQuery": "SELECT * FROM TableName"
}
```

### 增量同步

适用场景：每日数据更新、大表增量同步
```python
# 基于时间戳的增量
source = {
    "type": "SqlServerSource",
    "sqlReaderQuery": "SELECT * FROM TableName WHERE UpdateTime > '@{pipeline().parameters.LastRunTime}'"
}
```

### CDC 同步

适用场景：实时数据同步、变更追踪
```python
# 使用 Azure Data Factory 的 CDC 功能
source = {
    "type": "SqlServerSource",
    "sqlReaderQuery": """
        SELECT * FROM TableName
        WHERE $change_operation IN ('I', 'U', 'D')
        AND ChangeCaptureTime > '@{pipeline().parameters.LastRunTime}'
    """
}
```

## 性能优化指南

### 1. 并行处理

- 源端并行读取：`parallelCopies` 参数
- 目标端并行写入：分区表设计
- 建议值：CPU 核数 × 2

### 2. 数据分区

```python
# ADF 中的分区配置
sink = {
    "type": "SqlServerSink",
    "partitionOption": "ByRange",
    "partitionSettings": {
        "partitionColumnName": "DateKey",
        "partitionUpperBound": "20261231",
        "partitionLowerBound": "20200101"
    }
}
```

### 3. Staging 中间层

- 大数据量场景启用 staging
- 使用 Blob Storage 或 Data Lake
- 配置合适的 block size

### 4. 数据类型优化

- 源端：避免隐式类型转换
- 目标端：使用合适的列类型
- 日期格式：统一为 ISO 8601

## 监控与告警

### 管道监控指标

| 指标 | 阈值 | 告警级别 |
|------|------|----------|
| 管道执行时长 | > 计划时间 150% | Warning |
| 活动失败次数 | > 0 | Critical |
| 数据延迟 | > SLA 要求 | Warning |
| 行数偏差 | > 预期 ±10% | Warning |

### ADF 触发器配置

```json
{
  "name": "Daily_Trigger",
  "type": "TumblingWindowTrigger",
  "typeProperties": {
    "frequency": "Day",
    "interval": 1,
    "startTime": "2026-01-01T02:00:00Z",
    "delay": "00:00:00",
    "maxConcurrency": 1
  },
  "pipeline": {
    "reference": {
      "name": "Pipeline_Name"
    },
    "parameters": {
      "LastRunTime": "@trigger().outputs.windowStartTime"
    }
  }
}
```

## 输出格式

每个 ETL 管道交付：

1. **管道设计文档**：架构图、组件说明
2. **参数配置清单**：所有可配置参数及默认值
3. **执行计划**：调度频率、依赖关系
4. **监控告警规则**：阈值、通知方式
5. **回滚方案**：失败处理流程

## 最佳实践

1. **参数化设计**：使用管道参数提高复用性
2. **错误处理**：每个活动配置重试策略
3. **事务保证**：关键数据使用事务一致性
4. **版本控制**：管道配置纳入 Git 管理
5. **文档同步**：代码与文档保持一致