# 接入你的 agent

Agent Site Atlas 提供两种入口：**Skill** 把选定网站的操作指南放入 agent 可发现的技能目录；**MCP** 让 agent 按域名和任务检索指南。两种入口读取同一套知识。仅使用两个网站时，先装 Skill 即可；需要统一检索时再配置 MCP。

网站操作仍由宿主已有的浏览器工具完成。知识包不提供浏览器驱动、登录态或论文下载权限。Skill 的自动选择取决于宿主和模型；安装成功不等于每个请求都会自动触发。

## 安装 Skill

需要 Node.js 22 或更新版本。在下载或克隆的仓库根目录运行下列命令，只选择需要的宿主：

```sh
node bin/site-atlas.js install cnki sciencedirect --agent codex
node bin/site-atlas.js install cnki sciencedirect --agent claude
node bin/site-atlas.js install cnki sciencedirect --agent deepseek
```

| 选项 | 默认用户目录 | 发现方式参考 |
| --- | --- | --- |
| `codex` | `~/.agents/skills` | [Codex Skills](https://learn.chatgpt.com/docs/build-skills) |
| `claude` | `~/.claude/skills` | [Claude Code Skills](https://code.claude.com/docs/en/skills) |
| `deepseek` | `~/.dsh/skills` | [DeepSeek Harness skill provider](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/skill/skill-filesystem/README.md) |

`~` 表示当前用户主目录。安装器使用上述默认位置；如果你配置了其他技能根目录或要限定到一个项目，使用宿主实际扫描的绝对路径：

```sh
node bin/site-atlas.js install cnki --dest "/absolute/path/to/skills"
```

每个站点独立安装，目录分别为 `site-cnki`、`site-sciencedirect`。加入 `study` 可安装研究新网站的 `site-study` 技能。安装器会保留已有目录并停止，不会覆盖个人修改；更新前请比较新旧文件，使用你的文件管理器备份或移入回收站后再安装。

安装后新建会话，在宿主的技能列表中确认技能可见。可先明确指定 `site-cnki` 或 `site-sciencedirect` 验证读取，再使用“去知网找论文”等自然请求测试自动选择。自动选择测试的结果应单独记录。

### WorkBuddy

按其[官方技能指南](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)，将单个技能文件夹制作成 ZIP，保留文件夹中的 `SKILL.md`、`site.json` 和 `references`，通过 **专家·技能·连接器 → 技能 → 添加技能 → 上传技能** 导入。只导入所需网站包。

上传后在“已安装”中确认技能出现并已启用。不同版本的本地导入规则可能不同；若导入器报告字段或结构错误，按该版本提示调整包。公开上架另有[开放平台元数据要求](https://open.workbuddy.cn/docs/skill)，本仓库未声称已通过 WorkBuddy 市场审核。

## 可选：本地 stdio MCP

先在仓库根目录安装依赖：

```sh
npm ci
```

服务的启动命令如下。把示例绝对路径换成你的实际路径；Windows 可使用 `C:/tools/agent-site-atlas/bin/site-atlas.js` 这样的正斜杠路径。

```sh
node "/absolute/path/agent-site-atlas/bin/site-atlas.js" serve --sites cnki,sciencedirect
```

`--sites cnki` 只暴露知网包；省略 `--sites` 暴露仓库中的全部网站包。使用绝对脚本路径后，服务按自身位置查找知识包，不依赖宿主的工作目录。它不需要 API key。stdio 服务由 MCP 客户端启动，通过标准输入输出通信；直接运行后等待输入是正常行为。

### Codex

在 `~/.codex/config.toml` 合并以下独立表，保留已有配置：

```toml
[mcp_servers.site_atlas]
command = "node"
args = ["/absolute/path/agent-site-atlas/bin/site-atlas.js", "serve", "--sites", "cnki,sciencedirect"]
```

也可以使用 CLI：

```sh
codex mcp add site_atlas -- node "/absolute/path/agent-site-atlas/bin/site-atlas.js" serve --sites cnki,sciencedirect
codex mcp list
```

配置后按客户端提示重启连接，并通过 `/mcp` 检查。GUI 若找不到 `node`，把 `command` 换成 Node 可执行文件的绝对路径。配置格式依据 [OpenAI 官方 MCP 文档](https://learn.chatgpt.com/docs/extend/mcp)。

### Claude Code

下面命令注册为用户级服务器，可用于该用户的不同项目：

```sh
claude mcp add --transport stdio --scope user site_atlas -- node "/absolute/path/agent-site-atlas/bin/site-atlas.js" serve --sites cnki,sciencedirect
claude mcp get site_atlas
```

在会话中使用 `/mcp` 检查实际连接状态。`--` 后是服务器命令及参数，前面是 Claude Code 参数。依据 [Claude Code MCP 文档](https://code.claude.com/docs/en/mcp)；Claude Desktop 的界面配置属于另一种客户端接入方式。

### DeepSeek Harness

在你的部署所用插件配置中加入一个 MCP client 条目：

```yaml
- id: mcp-site-atlas
  name: '@deepseek-ai/dsh-mcp-client'
  config:
    serverName: site_atlas
    transport: stdio
    command: node
    args:
      - /absolute/path/agent-site-atlas/bin/site-atlas.js
      - serve
      - --sites
      - cnki,sciencedirect
```

这是[官方 MCP client 配置形状](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/mcp/mcp-client/README.md)。配置入口取决于所用 CLI、Desktop 或 Web 部署；GUI 版本可在其 MCP 管理界面填写同样的启动命令和参数。不要把此 YAML 当成其他客户端的 JSON 配置。

### WorkBuddy MCP

在当前版本的连接器管理中添加自定义 MCP 服务，选择本地 stdio（若该版本提供），填写 `node` 和上述参数。按照该版本的[连接器说明](https://open.workbuddy.cn/docs/connector)完成配置并检查工具可见性。只有远程 URL 输入的界面不能直接启动这个本地 stdio 服务；这种环境可使用技能包导入。

## 确认接入结果

让 agent 调用 `list_sites`，确认只出现启用的网站；再调用 `find_site_workflows` 查找“知网 下载论文”，最后用返回的站点和流程 ID 调用 `read_site_workflow`。能读到指南证明知识检索连接成功；浏览器内执行和文件下载需要另外验证。

| 宿主或接口 | 当前证据范围 | 尚未建立的保证 |
| --- | --- | --- |
| 本地 CLI / MCP SDK 客户端 | 仓库提供路由、读取、选择安装和协议往返测试；可运行 `npm test` 复验 | 不代表所有宿主应用都已接入 |
| Codex | 本次网站研究使用 Codex 浏览器工具；Skill 目录和 MCP 格式已核对 | 新会话自动选择 Skill 的可靠率需要独立任务验证 |
| Claude Code | 官方 Skill 目录、stdio 配置及安装器目标已核对 | 未在实际 Claude Code 会话中验证浏览器任务 |
| DeepSeek Harness | 官方本地 Skill provider 和 MCP client 格式已核对 | 未在实际 Harness 部署中验证浏览器任务 |
| WorkBuddy | 官方本地技能包上传和连接器路线已核对 | 未在实际应用中完成导入和浏览器任务 |

首次接入可用这条请求验证任务路由：“在 ScienceDirect 找一篇开放获取论文，先读取站点指南，再用当前浏览器确认题名和下载入口。”若任务遇到登录、权限或验证码，应保留目标与当前进度，并报告对应障碍。
