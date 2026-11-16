# 月个股回报率：网页预览、下载与核对

从[单表目录](catalog.md)进入“月个股回报率文件”。以下小样本可复现整条流程：证券 `000001`、2022-01 至 2022-03、考虑现金红利再投资的月收益率、普通 CSV。其他任务换成用户指定的范围与口径。

1. **月份。** 在“时间设置”选“时间区间”。确认时间基准为“交易月份”，起止值显示为 `YYYY-MM`，并落在该页提示的可用区间内。
2. **证券。** 样本表单默认选中“全部代码”。要取一只证券，改选“代码选择”，再点同名按钮。在“代码/简称搜索”输入完整代码，点放大镜，在“可选代码”命中项旁点加号。检查代码已出现在“已选代码”、计数为 1，再点“确定”。研究范围为全部市场时才保留“全部代码”。若限定 A 股或某交易所，在“股票市场分类”中核实证券范围；本次仅实测单代码。
3. **字段。** “已选”默认含证券代码 `Stkcd`、交易月份 `Trdmnt`。添加“考虑现金红利再投资的月个股回报率”对应 `Mretwd`；不考虑现金红利再投资的字段为 `Mretnd`。通过“字段说明”、预览表头或下载概要核对字段名。收盘价是另一个字段。
4. **格式与预览。** 在“选择文件输出类型”选 **CSV格式（*.csv）**。旁边还有“CSV格式创建Matlab数据（*.csv）”。点“预览数据”，核对证券、月份和字段。月表预览可能按月份倒序显示。小样本应能识别 1 个代码、3 个请求月份。对大范围查询，预览只用于抽查。
5. **取得文件。** 关闭预览，点“下载数据”，查看新开的“下载数据概要”标签页。核对下载表名、数据区间、选择代码、输出类型、选择字段和筛选条件。待出现“数据输出完成”及文件条数，点击文件名链接保存 ZIP；也可使用页面提示的“链接另存为”。本次页面提示站内保留 48 小时。若表单看似没有变化，先查看新开的结果页，避免重复提交。
6. **打开并验收。** 在 ZIP 中找到 `TRD_Mnth.csv`。本次 CSV 的表头为 `Stkcd,Trdmnt,Mretwd`，紧接着就是数据行。先看实际表头和首行，只在确实含中文名称或单位说明行时跳过对应行。核对下载概要的条数、请求的字段、代码与月份。对于全市场，不宜用证券数乘月份数推算行数，上市、停牌等情形需结合表说明判断。

在 Jupyter 中可以直接验收下载的 ZIP。把 `archive` 换成刚保存的文件路径。ZIP 可能同时含说明书和字段字典，在压缩包内按文件名定位 CSV 可以避免误读附件。

```python
from pathlib import Path, PurePosixPath
from zipfile import ZipFile
import pandas as pd

archive = Path("下载的文件.zip")
types = {"Stkcd": "string", "Trdmnt": "string"}
with ZipFile(archive) as z:
    matches = [n for n in z.namelist() if PurePosixPath(n).name == "TRD_Mnth.csv"]
    if len(matches) != 1:
        raise ValueError("请核对下载批次和 ZIP 中的 CSV 文件清单")
    with z.open(matches[0]) as csv_file:
        df = pd.read_csv(csv_file, encoding="utf-8-sig", dtype=types)

```

若已经解压，用 `df = pd.read_csv("TRD_Mnth.csv", encoding="utf-8-sig", dtype=types)` 从对应目录读取。对上述小样本执行：

```python
assert set(df.columns) == {"Stkcd", "Trdmnt", "Mretwd"}
assert len(df) == 3 and set(df["Stkcd"]) == {"000001"}
assert set(df["Trdmnt"]) == {"2022-01", "2022-02", "2022-03"}
assert not df.duplicated(["Stkcd", "Trdmnt"]).any()
assert pd.to_numeric(df["Mretwd"], errors="raise").notna().all()
```

`Stkcd` 按文本读取可保留前导零。上面的断言专用于已验证的小样本；换证券、字段或区间时同步修改检查条件。2026-11-16 的预览、结果页条数和本地 CSV 均核对通过。未实测全市场导出、其他格式或在线建模。
