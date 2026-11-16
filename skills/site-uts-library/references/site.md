# 网站与验证环境

UTS Library 是 University of Technology Sydney（悉尼科技大学）的图书馆。首页的 **Library Resources** 搜索馆藏与文献，**Library Website** 搜索图书馆网页。论文任务从首页搜索框下的 **Articles** 进入，页面位于 `search.lib.uts.edu.au`，本次界面为 Ex Libris Discovery 英文版。[图书馆首页](https://www.lib.uts.edu.au/)

## 验证记录

2026-11-16，Windows Chrome，已有登录且可访问样例全文的 UTS 会话。

| 流程 | 实际结果 |
| --- | --- |
| 标题和 DOI | 找到 Severson 等人在 Nature Energy 发表的 2019 年论文，核对 DOI `10.1038/s41560-019-0356-8`。高级 Title / contains exact phrase 与 Peer-reviewed Journals 筛选跑通。 |
| 主题筛选 | 对 `lithium ion battery machine learning` 应用 2023–2025 年、Articles、Available online，并选择 Date-newest。Active filters 和排序状态均已核对。 |
| PDF 直达 | 记录中的 Download PDF 经 LibKey 跳到 UTS 代理下的 Nature PDF，阅读器显示目标论文正文。 |
| 提供方下载 | 记录详情 View Online 中的 Nature 打开出版社全文，从出版社 Download PDF 保存文件。PDF 可解析，共 9 页，文件标题、首页作者与 DOI 对应目标论文。 |
| 期刊覆盖 | Journals 搜索 Nature Energy，读取 2016 年起的覆盖及部分服务最近一年不可用的说明。Search inside 用长标题检索在新标签页返回 No records found。 |
| 登录与请求 | 本次沿用已有会话。重新登录、MFA、失效会话恢复、馆际请求提交和 Google Scholar 登录跳转属于未执行分支。 |

浏览器中有文献管理扩展，会出现代理设置提示。操作以图书馆服务列表和出版社原生全文控件为依据。PDF 阅读器加载期间可能只显示扩展提示与进度条，应等待正文或检查下载结果后再判定状态。

跨站跳转会涉及 LibKey、UTS EZproxy 和实际出版社。保留页面生成的机构链接，以当前域名、标题和正文识别落点。发布内容采用公共入口、原创步骤和验证范围，账号标识、服务会话参数与论文文件保留在用户的本地环境。
