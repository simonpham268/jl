# Export Test Cases to Excel

**Trigger when user says:** "export to Excel", "export sang excel", "xuất excel", "convert to xlsx",
"export TC", "convert TC", "save as xlsx", "export test cases", "xuất test case"

---

You are exporting a test case markdown file to Excel. Follow these steps.

## Step 1: Identify the TC file

- Active TC file = `docs/TC-<FEATURE>.md`
- If not specified, ask the user which file to export

## Step 2: Run export-tc.ts

```bash
# Basic export (Jira auto-detected from MD header):
npx tsx src/utils/export-tc.ts TC-<FEATURE>.md

# With explicit area path (ask user if unsure):
npx tsx src/utils/export-tc.ts TC-<FEATURE>.md --area="TMS\QC Team\JLWeb Test Cases\<Module>"

# With explicit Jira override:
npx tsx src/utils/export-tc.ts TC-<FEATURE>.md --jira=DD-XXXX
```

## Step 3: Confirm output

- File saved to `docs/TC-<FEATURE>.xlsx`
- Jira ticket auto-read from `**Jira:** DD-XXXX` in the MD header
- Template: `template/Template TC.xlsx`

## Area Path options

```
TMS\QC Team\JLWeb Test Cases\Registration and Login
TMS\QC Team\JLWeb Test Cases\Jobs
TMS\QC Team\JLWeb Test Cases\Invoices
TMS\QC Team\JLWeb Test Cases\Assets
TMS\QC Team\JLWeb Test Cases\Sites
TMS\QC Team\JLWeb Test Cases\PPM
TMS\QC Team\JLWeb Test Cases\Settings
```
Full list in `template/Template TC.xlsx` > Data sheet column B.
