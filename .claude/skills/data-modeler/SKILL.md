---
name: data-model-designer
description: 当用户需要设计数据仓库模型、维度建模、事实表结构时使用此技能
version: 1.0.0
trigger: |
  用户请求涉及以下场景时触发：
  - 数据仓库/数据集市设计
  - 维度建模（Kimball/Inmon 方法论）
  - 事实表/维度表结构设计
  - ER 图生成
  - 指标体系定义
  - 数据血缘追溯
---

# Data Model Designer Skill

## 技能职责

提供企业级数据建模支持，从业务需求到物理模型的完整设计。

## 建模方法论

### Kimball 维度建模四步骤

1. **选择业务过程**：识别核心业务场景
2. **声明粒度**：确定数据的详细程度
3. **选择维度**：定义分析角度
4. **选择事实**：定义可测量指标

### 维度类型

| 维度类型 | 说明 | 示例 |
|----------|------|------|
| SCD Type 1 | 覆盖历史 | 最新地址 |
| SCD Type 2 | 跟踪变化 | 客户历史状态 |
| Role-Playing | 一表多用 | 日期、订单日期 |
| Degenerate | 事实中退化维度 | 订单号 |
| Junk | 混合低基数 | 标志位组合 |
| Snowflake | 规范化维度 | 国家→区域→城市 |

## 业务场景数据模型

### L2O (Lead to Order) 数据模型

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Dim_Lead      │────▶│  Fact_Sales     │◀────│   Dim_Customer  │
│   线索维度       │     │   销售事实表     │     │   客户维度       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Lead_Key (PK)   │     │ Sales_Key (PK)  │     │ Customer_Key    │
│ Lead_Source     │     │ Lead_Key (FK)   │     │ Customer_Name   │
│ Lead_Status     │     │ Customer_Key    │     │ Customer_Type   │
│ Created_Date    │     │ Product_Key     │     │ Segment         │
│ Converted_Flag  │     │ Date_Key        │     │ Region          │
└─────────────────┘     │ Order_Date      │     └─────────────────┘
                        │ Order_Amount    │
                        │ Quantity        │
                        └─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│   Dim_Product   │────▶│  Fact_Sales     │
│   产品维度       │     └─────────────────┘
├─────────────────┤
│ Product_Key     │
│ Product_Category│
│ Product_Line    │
│ Standard_Cost   │
└─────────────────┘
```

### O2C (Order to Cash) 数据模型

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Dim_Order     │────▶│  Fact_Order     │◀────│   Dim_Customer  │
│   订单维度       │     │   订单事实表     │     │   客户维度       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Order_Key (PK)  │     │ Order_Key (PK)  │     │ Customer_Key    │
│ Order_Number    │     │ Order_Date_Key  │     │ Customer_Name   │
│ Order_Type      │     │ Ship_Date_Key   │     │ Credit_Term     │
│ Priority        │     │ Customer_Key   │     │ Credit_Limit    │
│ Source_System   │     │ Product_Key     │     └─────────────────┘
└─────────────────┘     │ Order_Amount   │
                        │ Ship_Amount    │
                        │ Invoice_Amount  │     ┌─────────────────┐
                        │ Cash_Received  │────▶│  Dim_Invoice    │
                        │ AR_Balance      │     │  发票维度        │
                        └─────────────────┘     └─────────────────┘
```

### P2P (Procure to Pay) 数据模型

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Dim_Vendor    │────▶│  Fact_Purchase  │◀────│   Dim_Material  │
│   供应商维度     │     │   采购事实表     │     │   物料维度       │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ Vendor_Key (PK) │     │ Purchase_Key   │     │ Material_Key    │
│ Vendor_Name     │     │ Vendor_Key      │     │ Material_ID     │
│ Vendor_Category │     │ Material_Key    │     │ Material_Group  │
│ Payment_Terms   │     │ Date_Key        │     │ Unit_Of_Measure│
│ Rating          │     │ PO_Number       │     │ Standard_Cost   │
└─────────────────┘     │ Order_Amount    │     └─────────────────┘
                        │ Receipt_Amount  │
                        │ Invoice_Amount  │     ┌─────────────────┐
                        │ Payment_Amount  │────▶│   Dim_Invoice   │
                        └─────────────────┘     │   发票维度       │
                                                └─────────────────┘
```

## 设计规范

### 命名约定

| 对象类型 | 命名格式 | 示例 |
|----------|----------|------|
| 事实表 | Fact_[业务主题] | Fact_Sales, Fact_Order |
| 维度表 | Dim_[业务实体] | Dim_Customer, Dim_Product |
| 代理键 | [Entity]_Key | Customer_Key, Product_Key |
| 业务键 | [Entity]_ID | Customer_ID, Order_No |
| 度量值 | [业务动词]_[度量对象] | Total_Sales, Count_Orders |

### 粒度设计原则

1. **不可分割**：一行记录代表一个业务事件
2. **原子性**：支持任意维度组合分析
3. **一致性**：跨事实表粒度保持一致
4. **可加性**：度量值必须可以在所有维度上累加

### 维度设计原则

1. **扁平化**：尽量避免多层嵌套
2. **冗余换性能**：适当冗余提高查询效率
3. **退化维度**：将业务键作为维度保留在事实表
4. **日期维度**：独立日期维度表，支持时间智能分析

## 输出格式

```markdown
## [模型名称]

**业务场景**：[描述]

**粒度**：[一行记录代表什么]

**事实表结构**：
| 字段名 | 数据类型 | 说明 |
|--------|----------|------|

**维度表清单**：
| 维度表 | 用途 | 主要属性 |
|--------|------|----------|

**度量值清单**：
| 度量值 | 计算逻辑 | 业务定义 |
|--------|----------|----------|

**数据血缘**：
[从源系统到报表的完整链路]
```

## 工具支持

- ER 图生成：支持 Power Designer, ERWin, dbdiagram.io
- 数据血缘：支持 Microsoft Purview 集成
- 模型版本管理：支持 Git 集成