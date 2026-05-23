---
name: bi-business-workflow
description: 当用户请求执行 BI 业务流程分析、报表生成、数据模型设计等任务时使用此技能
version: 1.0.0
trigger: |
  用户请求涉及以下场景时触发：
  - L2O（Lead to Order）线索到订单分析
  - O2C（Order to Cash）订单到回款分析
  - P2P（Procure to Pay）采购到付款分析
  - BI 报表需求分析与设计
  - 业务指标体系定义
---

# BI Business Workflow Skill

## 技能职责

作为 BI 业务工作流的核心编排技能，协调各子代理完成端到端的 BI 分析任务。

## 业务场景

### L2O (Lead to Order) 线索到订单

**分析目标**：
- 销售漏斗转化分析
- 线索质量评估
- 预测准确率监控

**关键指标**：
- 线索数量、来源分布
- 各阶段转化率
- 平均销售周期
- 预测 vs 实际对比

### O2C (Order to Cash) 订单到回款

**分析目标**：
- 订单履约时效分析
- 应收账款账龄监控
- 客户信用评估

**关键指标**：
- 订单处理时长
- 账龄分布（0-30/31-60/61-90/>90天）
- 坏账准备比例
- 回款周期

### P2P (Procure to Pay) 采购到付款

**分析目标**：
- 供应商绩效评估
- 采购成本波动分析
- 合规风险监控

**关键指标**：
- 供应商准时交货率
- 价格偏差率
- 合同合规率
- 采购周期

## 工作流程

```
用户请求 → 意图识别 → 场景分类
     │
     ├─ L2O → ProcessInsightAgent → DataArchAgent → DAXBIAssistantAgent
     │
     ├─ O2C → ProcessInsightAgent → DataArchAgent → DAXBIAssistantAgent
     │
     └─ P2P → ProcessInsightAgent → DataArchAgent → DAXBIAssistantAgent

结果汇总 → DocComplianceAgent → 输出交付物
```

## 技能规则

1. **需求收集**：理解业务背景、确定分析目标、识别关键指标
2. **场景映射**：将业务需求映射到 L2O/O2C/P2P 场景
3. **代理调度**：根据场景调度合适的 Agent
4. **结果整合**：汇总各 Agent 输出，形成完整交付物
5. **质量检查**：验证输出符合业务需求

## DAX 模板库

### O2C 账龄分析 DAX

```DAX
// 应收账款账龄分段
AgeBucket =
VAR DaysSinceInvoice = DATEDIFF(MAX('Date'[Date]), TODAY(), DAY)
RETURN
    SWITCH(
        TRUE(),
        DaysSinceInvoice <= 30, "0-30天",
        DaysSinceInvoice <= 60, "31-60天",
        DaysSinceInvoice <= 90, "61-90天",
        "90天以上"
    )

// 账龄金额计算
AgingAmount =
SUMX(
    'Receivables',
    IF([DaysPastDue] <= 30, [Amount], 0)
)
```

### L2O 转化率 DAX

```DAX
// 阶段转化率
ConversionRate =
DIVIDE(
    COUNTROWS('Opportunity'[Stage = "Won"]),
    COUNTROWS('Opportunity'[Stage = "Qualified"]),
    BLANK()
)

// 线索转订单率
LeadToOrderRate =
DIVIDE(
    COUNTROWS('Opportunity'),
    COUNTROWS('Lead'),
    BLANK()
)
```

## 输出格式

每个业务场景交付：
1. **分析需求文档** - 业务背景、目标、关键指标
2. **数据模型建议** - 事实表/维度表结构
3. **DAX 代码** - 度量值、计算列
4. **报表原型** - 视觉布局建议
5. **使用指南** - 操作说明、注意事项