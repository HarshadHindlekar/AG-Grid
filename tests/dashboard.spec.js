import { test, expect } from "@playwright/test";
test("employee directory filters, pagination, profile, columns and export", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:5173");
  await expect(
    page.getByRole("heading", { name: "People overview" }),
  ).toBeVisible();
  await expect(
    page.getByText("Showing", { exact: false }).last(),
  ).toContainText("1–10");
  await page.getByRole("button", { name: "Next page" }).click();
  await expect(
    page.getByRole("button", {
      name: "Alex Thompson alex.thompson@company.com",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Previous page" }).click();
  await page.getByLabel("Search employees").fill("React");
  await expect(
    page.getByRole("button", { name: "John Smith john.smith@company.com" }),
  ).toBeVisible();
  await expect(page.locator(".grid-footer")).toContainText("of 1 employees");
  const john = page.getByRole("button", {
    name: "John Smith john.smith@company.com",
  });
  await john.click();
  await expect(page.getByRole("dialog")).toContainText("Skills & expertise");
  await page.getByRole("button", { name: "Close dialog" }).click();
  await expect(john).toBeFocused();
  await page.getByLabel("Search employees").fill("no matching person");
  await expect(
    page.getByText("No employees match your filters."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.getByLabel("Filter department").selectOption("Engineering");
  await expect(page.locator(".grid-footer")).toContainText("of 6 employees");
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page.getByLabel("Filter location").selectOption("Seattle");
  await expect(page.locator(".grid-footer")).toContainText("of 2 employees");
  await page
    .getByRole("button", { name: "Reset all filters & sorting" })
    .click();
  await page.getByRole("button", { name: "Inactive", exact: false }).click();
  await expect(
    page.getByRole("button", {
      name: "Jessica Moore jessica.moore@company.com",
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "All employees", exact: false })
    .click();
  await page.getByRole("button", { name: "Columns", exact: true }).click();
  await page.getByLabel("Hire date", { exact: true }).check();
  await page.getByRole("button", { name: "Columns", exact: true }).click();
  const downloadPromise = page.waitForEvent("download");
  const exportBtn = page.getByRole("button", { name: "Export report" });
  await exportBtn.click();
  await expect(page.getByText("Exporting...")).toBeVisible();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("factwise-employees.csv");
  await expect(page.getByText("Exporting...")).not.toBeVisible();
  await page.getByLabel("Rows per page").selectOption("20");
  await expect(page.locator(".grid-footer")).toContainText("1–20");
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.screenshot({
    path: "tests/dashboard-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "tests/dashboard-mobile.png", fullPage: true });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});

test("reopens an empty column filter with its value editable", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  const employeeHeader = page
    .locator(".ag-header-cell")
    .filter({ hasText: "Employee" });
  const filterButton = employeeHeader.locator(".ag-header-cell-filter-button");

  await filterButton.click();
  await page.getByLabel("Filter Value").first().fill("no matching employee");
  await expect(
    page.getByText("No employees match your filters."),
  ).toBeVisible();

  await filterButton.click();
  const reopenedFilter = page.getByLabel("Filter Value").first();
  await expect(reopenedFilter).toBeVisible();
  await expect(reopenedFilter).toHaveValue("no matching employee");
  await reopenedFilter.click();
  await page.screenshot({ path: "tests/reopened-filter.png" });
  await reopenedFilter.fill("John");
  await expect(reopenedFilter).toHaveValue("John");
});

test("closes columns dropdown on outside click", async ({ page }) => {
  await page.goto("http://localhost:5173");
  const columnsButton = page.getByRole("button", {
    name: "Columns",
    exact: true,
  });

  await columnsButton.click();
  await expect(page.getByText("Visible columns")).toBeVisible();

  // Clicking outside should close the dropdown
  await page.getByRole("heading", { name: "Employee directory" }).click();
  await expect(page.getByText("Visible columns")).not.toBeVisible();

  // Re-open and test Escape key
  await columnsButton.click();
  await expect(page.getByText("Visible columns")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("Visible columns")).not.toBeVisible();
});

test("mobile view shows centered export button and cards fit without overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("http://localhost:5173");
  await page.waitForLoadState("networkidle");

  const exportBtn = page.getByRole("button", { name: "Export report" });
  await expect(exportBtn).toBeVisible();

  // Verify export button is centered in the content area
  const btnBox = await exportBtn.boundingBox();
  expect(btnBox).not.toBeNull();
  const btnCenter = btnBox.x + btnBox.width / 2;
  expect(btnCenter).toBeGreaterThan(180);
  expect(btnCenter).toBeLessThan(250);

  // Take screenshot for visual inspection
  await page.screenshot({ path: "tests/mobile-view.png", fullPage: true });

  // Verify no horizontal overflow in summary cards
  const summaryCards = page.locator(
    "section[aria-label='Workforce summary'] article",
  );
  const count = await summaryCards.count();
  for (let i = 0; i < count; i++) {
    const card = summaryCards.nth(i);
    const box = await card.boundingBox();
    expect(box.x + box.width).toBeLessThanOrEqual(375);
  }
});

test("clicks clear all filters", async ({ page }) => {
  await page.goto("http://localhost:5173");
  const filterButton = page
    .locator(".ag-header-cell")
    .filter({ hasText: "Employee" })
    .locator(".ag-header-icon")
    .first();

  await filterButton.click();
  await page.getByLabel("Filter Value").first().fill("no matching employee");
  await expect(
    page.getByText("No employees match your filters."),
  ).toBeVisible();

  const clearButton = page.getByRole("button", { name: "Clear all filters" });
  await clearButton.click();
  await expect(
    page.getByText("No employees match your filters."),
  ).not.toBeVisible();
  await expect(page.locator(".grid-footer")).toContainText("1–10");
});
