# Ledger — Finance Dashboard

A clean, interactive personal finance dashboard built using HTML, CSS and JS.

## Live Preview

Open `index.html` directly in any modern browser — no server, build step, or installation required.

---

## Features

### Dashboard Overview
- **4 Summary Cards** — Total Balance, Income, Expenses, Net Savings with month-over-month delta indicators
- **Balance Trend Chart** — Line chart showing running balance across 6 months
- **Spending Donut Chart** — Categorical breakdown of expenses with percentage tooltips
- **Recent Transactions** — Last 5 transactions at a glance
- **Monthly Bar Chart** — Income vs Expense side-by-side for each month

### Transactions Section
- Full transaction table with **Date, Description, Category, Type, Amount**
- **Search** — Filter by description or category name
- **Dropdown Filters** — By type (Income/Expense), Category, and Month
- **Column Sorting** — Click any header to sort ascending/descending
- **Export** — Download as CSV or JSON
- Transaction count indicator

### Role-Based UI
Switch roles via the dropdown in the sidebar:

| Role    | Permissions                                |
|---------|--------------------------------------------|
| Viewer  | Read-only — no add/edit/delete buttons     |
| Admin   | Full access — add, edit, delete transactions, admin notice banner |

No login required — toggle is instant for demonstration.

### Insights Section
- **6 Insight Cards** — Top spending category, savings rate, avg monthly spend, MoM expense change, total transactions, net position
- **Category Progress Bars** — Visual percentage breakdown of spending per category
- **Month-over-Month Bar Chart** — Income vs Expenses per month comparison

---

## Tech Stack

| Concern        | Choice                              |
|----------------|-------------------------------------|
| Framework      | Vanilla JS (no framework)           |
| Styling        | Custom CSS with CSS variables       |
| Charts         | Chart.js 4.4.1 (CDN)               |
| Fonts          | Google Fonts (Cormorant, DM Mono, Instrument Sans) |
| State          | In-memory JS object + localStorage  |
| Persistence    | localStorage (auto-save on change)  |

---

## State Management

All state lives in a central `transactions` array and two scalar variables (`role`, sort state). No framework needed — functions read from this shared state and re-render affected DOM sections.

- Transactions persist to **localStorage** automatically on every add/edit/delete
- On first load, 46 seed transactions spanning Oct 2024 – Mar 2025 are used
- Resetting: clear localStorage key `ledger_transactions` to reset to seed data

---

## Design Decisions

- **Dark luxury aesthetic** — Deep backgrounds (`#0a0a0f`), warm gold accents (`#c9a84c`), serif display font (Cormorant Garamond) for numbers, monospace (DM Mono) for labels and metadata
- **Responsive** — Sidebar collapses to a hamburger menu on mobile; grid layouts reflow to 1 column
- **Empty states** — Every list/table handles zero-results gracefully
- **Category color system** — Each spending category has a consistent color used across charts, pills, and progress bars

---

## Extending

- Replace `SEED_TRANSACTIONS` with a real API fetch
- Add a `users` array and proper session for multi-user RBAC
- Swap Chart.js for Recharts if migrating to React
- Add date range picker for custom period filtering
