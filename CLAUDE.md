# CLAUDE.md - Claude Code Instructions

---

## 1. Knowledge Base & MCP Tools

| Tool | Data Source | When to Use |
|------|-------------|-------------|
| `search_sharepoint_docs(query)` | BA specs, Vibe specs (docx, pdf) | Find related specs, impact analysis |
| `get_sharepoint_file_content(itemId)` | Full spec content | Deep dive into a specific spec |
| `list_sharepoint_files(folderPath?, fileType?)` | SharePoint folders | Browse available specs |
| `get_release_notes(keyword)` | JobLogic features 2019-2026, bug fixes | Check existing features, known bugs |
| `list_doc_pages()` | Release note pages | Browse documentation index |
| `search_notion_specs(query)` | Notion BA/Vibe specs (430+ pages, indexed) | Find specs, feature details, business rules |
| `get_notion_page(pageId)` | Full Notion page content | Deep dive into a specific Notion spec |
| `list_notion_specs(cursor?)` | All Notion spec titles + IDs | Browse Notion spec index |

---

## 2. Reading Local Files

| File type | How to read |
|-----------|------------|
| `.md`, `.txt`, `.ts`, `.json` | Use Read tool directly |
| `.docx` | Read tool cannot open binary — use Bash: `node -e "const mammoth = require('mammoth'); mammoth.extractRawText({path: 'FILE.docx'}).then(r => console.log(r.value))"` |
| `.pdf` | Use Read tool directly. For PDFs > 10 pages, specify `pages` range (e.g. `"1-10"`) — max 20 pages per read |
| `.xlsx` | Use Bash: `node -e "const x = require('xlsx'); const wb = x.readFile('FILE.xlsx'); console.log(x.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]))"` |

Only fall back to `search_sharepoint_docs` if the file is **not available locally**.

---

## 3. Skills — When to Invoke

| User says... | Skill to use |
|---|---|
| "gen test case", "tạo test case", "generate TC" | → `gen-tc` skill |
| "gen script", "viết playwright", "gen spec" | → `gen-spec` skill |
| "export excel", "xuất excel", "export TC" | → `export-tc` skill |
| "fix test", "heal test", "sửa script", "fix script", "fix chô này", "fix spec" | → `heal` skill — **ALWAYS run test + `test_debug` BEFORE touching any code. Never guess-fix.** |

Full instructions for each skill are in `.claude/commands/`.

---

## 3. Test Case Format Rules (shared across all TC work)

1. Every step MUST have an Expected result
2. One specific UI action per step (click, type, select, navigate)
3. Use exact UI element names — button text, field labels, menu names
4. Specify navigation paths — `"Jobs > Log Job"`, `"Settings > Users > Add User"`
5. Include element locations — `"left navigation sidebar"`, `"bottom of form"`
6. Minimum 5 steps per scenario
7. No vague instructions:

| Wrong | Right |
|-------|-------|
| "Navigate to Jobs" | "Click 'Jobs' menu in left navigation sidebar" |
| "Select customer" | "Click 'Customer' dropdown, then click 'ABC Corp' from list" |
| "Save the job" | "Click 'Save' button at bottom right of form" |
