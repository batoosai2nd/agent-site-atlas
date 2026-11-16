# 查找与筛选论文

## 已知标题或 DOI

1. 从图书馆首页点 **Articles**，核对搜索范围为 **Articles & eResources**。输入框的可访问名称是 **Search field**。填入 DOI 或标题后，在输入框内按 Enter，观察结果区。本次点击 Submit search 曾停在起始页，输入框回车成功提交。[Articles 入口](https://search.lib.uts.edu.au/discovery/search?tab=CentralIndex&search_scope=CentralIndex&vid=61UTS_INST:61UTS&lang=en)
2. 基础搜索使用包含匹配。完整标题可能返回同名预印本、介绍性报道和重复来源记录。DOI 也可能命中摘要中引用该 DOI 的文章。逐条核对标题、作者、期刊、年份，打开标题后在 **Details → Identifier** 确认 DOI。
3. 需要限定标题时，点 **Advanced Search**，第一行字段选 **Title**，匹配方式选 **contains exact phrase**，填写标题。可以用下一行组合作者或主题，并核对 AND/OR。实测字段菜单含 Any field、Title、Author/Creator、Subject、ISBN、ISSN。DOI 可沿用基础搜索的 Any field，再核对记录标识。
4. 高级界面可能同时暴露桌面与移动版控件。浏览器工具命中重复元素时，以可见的 **Query parts** 区域和行号限定控件。完成输入后提交，以结果条数和记录更新确认执行。
5. 论文标题打开 **Full Display** 浮层。通过 **Close Full Display** 返回结果。找到相符记录后转入[全文下载](download.md)。

实测基础标题搜索得到数百条结果，高级标题短语搜索缩小到 5 条，包含其他作者的同名作品。Peer-reviewed Journals 筛选后保留目标记录。DOI 搜索得到目标论文和一篇引用该 DOI 的文章。

## 主题检索与筛选

**New Search** 会开启新检索，本次默认范围回到 **Everything**。按任务检查范围后输入关键词。Everything 涵盖馆藏和文章，Articles & eResources 用于研究数据库内容，Library Catalogue 用于图书馆持有的纸本和电子资源。首页的 Articles 入口也可直接进入文章范围。

在 **Refine my results** 按需要使用以下控件。

| 目的 | 控件与完成信号 |
| --- | --- |
| 文章类型 | Resource Type 下点 Articles 的文字按钮，Active filters 出现 Articles。Review Articles 等类型按用户要求选择。 |
| 在线可用 | Availability 下点 Available online，核对活动筛选。实际可用版本在下载阶段确认。 |
| 同行评议 | Availability 下点 Peer-reviewed Journals，核对活动筛选和结果变化。 |
| 出版年份 | Publication Date 中填写 From date 与 To date，再点 Refine。Active filters 显示所选年份区间。 |
| 最新排序 | Sort by 菜单选择 Date-newest，以菜单当前值确认。 |
| 调整条件 | 使用活动标签旁 Remove 或 Reset filters。Remember all filters 会让条件跨后续检索保留，仅在任务需要时启用。 |

本次自定义复选框的程序化勾选未改变状态，点击相邻的筛选文字按钮成功应用。操作后以活动标签为准。较窄结果可能显示 **No facets to display**，可先调整已有条件。

默认 **Search within Full Text** 关闭，检索标题、作者、主题和描述等信息。打开后还会匹配索引全文中的内容，适合扩大主题检索。此切换的行为依据官方说明。[官方检索功能说明](https://www.lib.uts.edu.au/get-help/search-features-and-tips)

完成时保留用户要求的条件，并记录最终标题、作者、期刊年份与 DOI。本次已实测标题、DOI、高级标题短语、同行评议、2023–2025 年、文章类型、在线可用和最新排序。多行作者组合与全文检索切换仅观察了入口或文档。
