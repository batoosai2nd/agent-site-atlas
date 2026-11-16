# 在 Jupyter 中核对 CSMAR Python 接口

[CSMAR 官方中文接口文档](https://data.csmar.com/static/document/Python-zh.html)列出 SDK、安装示例、个人登录、授权目录和查询函数。文档标明 Windows 和个人注册账号。网页已能预览或下载时，Python 接口仍需使用其个人登录流程，随后检查该账号的接口权限。

1. 通过官方文档取得 SDK，保留完整 `csmarapi` 包及其配置文件。按官方说明安装到目标环境，或把完整包放入 Notebook 内核能导入的项目目录。先在 Notebook 运行下方单元，确认其解释器和客户端。若无法导入，在这个内核中核对包路径和缺失依赖。
2. 需要在线查询且有个人 API 权限时，在本地私有会话中调用 `client.login(account, password)`。密码可通过 `getpass.getpass()` 交互输入。所核对的 SDK 会生成本地日志，登录时可写入会话文件；须保留在私人目录。随后运行 `client.getListDbs()`，从结果选授权数据库，将实际库名传给 `client.getListTables(databaseName)`。表代码存在后，用 `client.getListFields("TRD_Mnth")` 核对所需字段。
3. 确认表和字段后，可按下方查询示例传入列、条件、表代码和两个日期。先验证小样本的代码、月份、字段和行数，保存并复用结果。官方文档提示相同条件在 30 分钟内只允许查询一次；遇到重复查询提示先检查已有结果。权限列表为空或缺少目标表时，以实际返回说明为准；有网页权限可使用[网页下载流程](monthly-returns.md)。

```python
# 离线检查：在目标 Jupyter 内核运行
import sys
from csmarapi.CsmarService import CsmarService

print(sys.executable)
client = CsmarService()
```

```python
# 已完成个人登录并核对接口授权、表和字段后运行
frame = client.query_df(
    ["Stkcd", "Trdmnt", "Mretwd"], "Stkcd='000001'", "TRD_Mnth",
    "2022-01-01", "2022-03-31",
)
```

以返回的 DataFrame 核对结果。记录查询条件和实际取回月份，如果为空，检查权限、字段和日期，再决定下一步。2026-11-16 复核了官方说明、SDK 导入、客户端创建及查询函数签名；本次没有在线登录或用 API 取得这三行。相同范围的网页 CSV 已单独验证。
