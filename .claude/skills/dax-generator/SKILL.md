---
name: dax-generator
description: 当用户需要生成 DAX 度量值、计算列或复杂业务逻辑时使用此技能
version: 1.0.0
trigger: |
  用户请求涉及以下场景时触发：
  - Power BI DAX 公式编写
  - 时间智能函数（YTD, MTD, 滚动平均）
  - 复杂业务计算（利润率、转化率、环比同比）
  - 财务相关计算（应收账龄、库存周转）
---

# DAX Generator Skill

## 技能职责

根据业务需求生成高质量、可复用的 DAX 代码。

## 核心能力

1. **自然语言到 DAX**：将业务描述转化为 DAX 公式
2. **DAX 优化**：性能调优、上下文优化
3. **模板生成**：常见业务场景的标准化 DAX 模板
4. **代码审查**：验证 DAX 逻辑正确性

## DAX 模板库

### 时间智能

```DAX
// YTD 累计
YTD_Sales =
CALCULATE(
    SUM('Sales'[Amount]),
    DATESYTD('Date'[Date])
)

// MTD 累计
MTD_Sales =
CALCULATE(
    SUM('Sales'[Amount]),
    DATESMTD('Date'[Date])
)

// 滚动 12 个月
Rolling_12M =
CALCULATE(
    SUM('Sales'[Amount]),
    DATESINPERIOD(
        'Date'[Date],
        MAX('Date'[Date]),
        -12,
        MONTH
    )
)

// 同比 YOY
YOY_Sales =
VAR CurrentYear = SUM('Sales'[Amount])
VAR LastYear = CALCULATE(
    SUM('Sales'[Amount]),
    SAMEPERIODLASTYEAR('Date'[Date])
)
RETURN
    DIVIDE(CurrentYear - LastYear, LastYear)
```

### 财务计算

```DAX
// 毛利率
GrossMargin =
DIVIDE(
    [Sales] - [COGS],
    [Sales],
    BLANK()
)

// 应收账款账龄
AR_Aging_Bucket =
SWITCH(
    TRUE(),
    [DaysOutstanding] <= 30, "0-30",
    [DaysOutstanding] <= 60, "31-60",
    [DaysOutstanding] <= 90, "61-90",
    ">90"
)

// 库存周转率
InventoryTurnover =
DIVIDE(
    SUM('Inventory'[COGS]),
    AVERAGE('Inventory'[EndingInventory])
)
```

### 业务分析

```DAX
// 客户复购率
RepeatPurchaseRate =
DIVIDE(
    COUNTROWS(VALUES('Customer'[CustomerKey])),
    CALCULATE(
        COUNTROWS(VALUES('Customer'[CustomerKey])),
        REMOVEFILTERS()
    )
)

// 销售转化率
SalesConversionRate =
DIVIDE(
    [WonOpportunities],
    [TotalOpportunities],
    BLANK()
)

// 客单价
AverageOrderValue =
DIVIDE(
    SUM('Sales'[Amount]),
    DISTINCTCOUNT('Sales'[OrderKey])
)
```

## 使用指南

### 输入格式

用户应提供：
1. **业务场景**：分析什么（如：销售趋势、客户分析、财务指标）
2. **数据模型**：涉及的表和字段
3. **计算逻辑**：期望的计算方式
4. **筛选条件**：是否有特定筛选需求

### 输出格式

```markdown
## [度量值名称]

**用途**：[业务场景描述]

**DAX 代码**：
```DAX
[DAX 代码]
```

**参数说明**：
- `[参数1]`：说明

**性能备注**：
- 注意事项

**相关模板**：
- 关联的其他 DAX 模板
```

## 最佳实践

1. **使用变量**：复杂计算先用 VAR 分解
2. **错误处理**：使用 BLANK() 处理除零等错误
3. **上下文理解**：注意 CALCULATE 的上下文转换
4. **性能优化**：避免在迭代函数中使用 CALCULATE