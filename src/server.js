import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadAtlas, listSites, findWorkflows, readWorkflow } from './atlas.js';

function toolResult(value) {
  return { content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] };
}

async function safely(run) {
  try { return toolResult(await run()); }
  catch (error) { return { content: [{ type: 'text', text: error.message }], isError: true }; }
}

export function createServer(atlas) {
  const server = new McpServer({ name: 'agent-site-atlas', version: '0.1.0' });
  const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
  server.registerTool('list_sites', {
    description: 'List installed website operation manuals, task workflows, and their verification coverage. Manuals are local guidance; this server does not operate a browser.',
    inputSchema: {}, annotations,
  }, () => safely(() => listSites(atlas)));
  server.registerTool('find_site_workflows', {
    description: `Before operating ${atlas.packs.map(pack => pack.name).join(' or ')}, find reusable workflows by current URL, site id, or a Chinese/English task query. Exact hostname matching; results include evidence status. Read the selected workflow next.`,
    inputSchema: {
      site: z.string().optional().describe(`Site id from list_sites: ${atlas.packs.map(pack => pack.id).join(', ')}.`),
      url: z.string().optional().describe('Current HTTP(S) URL. Do not supply private URL credentials or tokens.'),
      query: z.string().optional().describe('Task, such as 检索论文, 下载全文, export citation, or advanced search.'),
    }, annotations,
  }, args => safely(() => findWorkflows(atlas, args)));
  server.registerTool('read_site_workflow', {
    description: 'Read a selected website workflow with shared site context, skill instructions, and verification limits. Use it with current browser observations; the manual does not grant access or prove the live task completed.',
    inputSchema: { site: z.string(), workflow: z.string() }, annotations,
  }, args => safely(() => readWorkflow(atlas, args.site, args.workflow)));
  return server;
}

export async function serve(options = {}) {
  const atlas = await loadAtlas(options);
  const server = createServer(atlas);
  await server.connect(new StdioServerTransport());
  return server;
}
