# FactWise People Dashboard

A client-rendered React 19 + TypeScript dashboard built with AG Grid Community v35, Tailwind CSS v4, and Lucide icons, analyzing the 20-employee organization dataset supplied in `assessment_data.txt`.

---

## Getting Started

### 1. Installation

```sh
npm install
```

### 2. Development Server

```sh
npm run dev
```

Vite is configured with `--host 0.0.0.0`, binding to all network interfaces so you can view the application on your local machine as well as test directly on mobile devices connected to the same Wi-Fi or hotspot:

```text
  ➜  Local:   http://localhost:5173/   (or http://localhost:5174/ if port 5173 is occupied)
  ➜  Network: http://192.168.137.1:5174/
  ➜  Network: http://192.168.0.102:5174/
```

### 3. Production Build & Preview

```sh
# Type-check and create an optimized production build in dist/
npm run build

# Serve the production build locally with network access
npm run preview
```

### 4. Code Quality & Linting

```sh
# Run ESLint across the codebase
npm run lint

# Verify code formatting
npm run format:check

# Auto-format all code
npx prettier --write src tests README.md
```

---

## Test Suite Coverage

The dashboard is covered by end-to-end browser tests in [`tests/dashboard.spec.js`](tests/dashboard.spec.js) using **Playwright**.

### Run Tests

Ensure the local dev server is running on `http://localhost:5173`, then run:

```sh
npx playwright test
```

### Test Cases Covered

1. **Employee directory filters, pagination, profile dialog, columns, and export**:
   - **Page health**: Verifies page load and zero unhandled console errors or runtime exceptions.
   - **Pagination**: Tests navigation between pages ("Next page", "Previous page", page buttons) and validates visible employee records.
   - **Global search**: Filters employees in real time by search query across name, email, skills, and hidden fields (e.g. searching "React"); tests clearing search.
   - **Department & location filtering**: Tests multi-parameter filtering (e.g., Engineering department + Seattle location) and validates row counts.
   - **Status filtering tabs**: Switches between "All employees", "Active", and "Inactive" tabs, ensuring counts and filtered lists match.
   - **Employee profile dialog**: Clicks an employee card to open the accessible profile dialog, validates all metadata and skills, closes it, and verifies focus returns to the triggering card.
   - **Column visibility picker**: Opens the "Columns" menu, toggles optional hidden columns (e.g., "Hire date"), and verifies column appearance in the grid.
   - **CSV report export & loading indicator**: Clicks "Export report", verifies that the button displays a loading spinner with "Exporting...", verifies that the browser receives the downloaded `factwise-employees.csv` file, and checks that normal state is restored.
   - **Page size selection**: Changes rows per page selector (10 → 20) and validates footer pagination counter ("1–20 of 20").
   - **Responsive full-page screenshots**: Captures desktop (`tests/dashboard-desktop.png`) and mobile (`tests/dashboard-mobile.png`) views, validating zero horizontal document overflow (`scrollWidth <= innerWidth`).

2. **Reopening empty column filter with editable value**:
   - Opens the AG Grid column menu on the "Employee" header.
   - Types an unmatched query (`"no matching employee"`), triggering the custom zero-results overlay.
   - Re-clicks the column filter icon to ensure the filter popup reopens cleanly above the overlay with its filter value intact and editable, and updates the value to `"John"` to restore matching records.

3. **Closing columns dropdown on outside click or Escape**:
   - Clicks the "Columns" button to open the visibility dropdown.
   - Verifies clicking outside the dropdown automatically dismisses it.
   - Reopens the dropdown and verifies pressing the <kbd>Escape</kbd> key dismisses it.

4. **Mobile view (iPhone SE 375×667) centering & card overflow**:
   - Sets viewport to 375×667.
   - Verifies the "Export report" button is horizontally centered in the viewport.
   - Verifies that all 4 KPI summary cards keep their text, badges, and metrics fully contained without bleeding into adjacent cards or outside screen edges.
   - Captures full-page mobile screenshot (`tests/mobile-view.png`).

5. **Clicking "Clear all filters" on empty overlay**:
   - Filters data to zero matches, displaying the "No employees match your filters" overlay.
   - Verifies pointer-events hit-testing by clicking the "Clear all filters" button directly inside the overlay.
   - Validates that the overlay dismisses, all column and search filters reset, and the grid restores all records.

---

## Features & Highlights

- **Workforce Summary Cards**: Total headcount, active count, department total, average performance rating, and average base salary.
- **Interactive Department Insights**:
  - CSS conic-gradient donut chart showing headcount distribution across departments. Clicking any department filters the directory and smoothly scrolls to it.
  - Department analytics / performance progress bars.
- **AG Grid Community v35 Directory**:
  - Virtualized rendering for high performance and smooth scrolling.
  - Native column sorting, resizing, and floating filters.
  - Checkbox multi-row selection; CSV export exports selected rows when present, or all filtered/sorted rows.
  - Custom zero-results overlay with one-click "Clear all filters" recovery.
- **Employee Profile Modal**: Accessible modal displaying complete employee record (role, department, location, hire date, salary, performance rating, projects, and skill tags).
- **Responsive Design**: Designed with Tailwind CSS v4, supporting large desktop screens (1680px+) down to small mobile screens (375px / 320px).

---

## Project Structure

```text
├── src/
│   ├── components/
│   │   ├── layout/Sidebar.tsx       # Collapsible navigation sidebar
│   │   ├── Avatar.tsx               # Initials avatar with department color accents
│   │   └── DashboardDialog.tsx      # Accessible employee profile modal
│   ├── config/
│   │   ├── grid.ts                  # AG Grid theme configuration
│   │   └── workforceMetrics.ts      # KPI cards calculation definitions
│   ├── data/
│   │   ├── employees.json           # 20-employee source dataset (unedited)
│   │   └── employees.ts             # Department colors and metadata
│   ├── features/
│   │   ├── dashboard/
│   │   │   ├── WorkforceSummary.tsx   # Top KPI metrics grid
│   │   │   ├── DepartmentInsights.tsx # Donut chart & performance breakdown
│   │   │   └── useWorkforceStats.ts   # Memoized aggregates & KPI computation
│   │   └── employees/
│   │       ├── EmployeeDirectory.tsx    # AG Grid table with custom overlay
│   │       ├── DirectoryToolbar.tsx     # Search, department/location selects, columns toggle
│   │       ├── DirectoryPagination.tsx  # Custom pagination controls and page-size selector
│   │       ├── useEmployeeColumns.tsx   # AG Grid column definitions & renderers
│   │       └── useEmployeeDirectory.ts  # Directory state, filters, pagination, and CSV export
│   ├── types/                       # Strict TypeScript interfaces
│   ├── styles.tailwind.css          # Tailwind CSS v4 directives & AG Grid overlay rules
│   ├── App.tsx                      # Root dashboard view & tab orchestration
│   └── main.tsx                     # React application entry point
├── tests/
│   └── dashboard.spec.js            # Comprehensive Playwright test suite
└── playwright.config.js             # Playwright test runner configuration
```

---

## Technical Notes & Scalability

- **Client-Side Row Model**: Optimized for fast interactive exploration with row and column virtualization, memoized column definitions, and cached quick filtering.
- **Native Overlay Integration**: Leverages AG Grid's `overlayComponentSelector` with custom pointer-events rules to ensure transparent pass-through for headers while keeping overlay recovery buttons interactive.
- **License**: Built entirely with **AG Grid Community** (MIT license) and open-source packages; no commercial license keys required.
