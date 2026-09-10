# FactWise People Dashboard

A client-rendered React + TypeScript dashboard using AG Grid Community, Tailwind CSS, and the 20 employees supplied in `assessment_data.txt`.

## Run locally

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Create a production build with `npm run build`; serve it with `npm run preview`.

## Features

- Workforce totals, average salary, performance, department distribution, and project analytics calculated from the source data.
- Search across employee names, email, skills, and other fields, including hidden columns.
- Department, employment status, and location filters; native column filtering and sorting.
- Resizable columns, additional optional fields, pagination, filtered row selection, and CSV export.
- Employee profiles containing all supplied fields.
- Responsive layout, keyboard-operable controls, and accessible field labels.

Summary cards describe the complete workforce. Directory filters affect the table and its export. CSV export includes filtered/sorted rows, or selected rows when selection is present. The application is read-only and does not persist changes or require a backend. The supplied dataset is preserved unchanged in `src/data/employees.json`.

## Scalability

AG Grid uses its client-side row model with row/column virtualization inside a fixed-height viewport. Stable row IDs, memoized column definitions and filtered data, cached quick filtering, and pagination avoid unnecessary rendering. All data is loaded into browser memory; for substantially larger datasets than fit comfortably in memory, switch to a backend-driven data model. No large-dataset performance benchmark is claimed.

## Browser verification

With the development server running at port 5173 and Chrome installed:

```sh
npx playwright test
```

The browser test covers pagination, skill search, empty results, profiles, combined filters, status filtering, optional columns, CSV download, page-size changes, runtime errors, and mobile overflow. Screenshots are written to `tests/`.

The UI uses Tailwind CSS utility classes directly in each component. The shared stylesheet only loads Tailwind, defines the project fonts, and applies the document-level overflow reset; component styles stay close to their markup as the dashboard grows. Google Fonts include local sans-serif fallbacks. AG Grid Community requires no paid license.

## Source organization

- `src/main.tsx`: React bootstrap.
- `src/App.tsx`: page composition and shared navigation/dialog state.
- `src/components/`: shared avatar, dialog, and sidebar components.
- `src/features/dashboard/`: workforce summaries, department insights, and aggregate calculations.
- `src/features/employees/`: employee grid, toolbar, pagination, and hooks for directory state and column definitions.
- `src/types/`: explicit employee domain model.
- `src/data/`: typed access to the supplied dataset and department metadata.
- `src/config/`: AG Grid registration, theme, and dashboard configuration.
- `src/utils/`: shared value formatting.
- `src/styles.tailwind.css`: Tailwind import, font theme, and document-level reset only.

Directory state is shared through a typed controller because the export action and department chart also operate on the directory. Individual UI sections remain independently editable; the existing browser test verifies the complete user flow across component boundaries.
