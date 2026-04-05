let role = 'viewer';
let sortCol = 'date', sortDir = -1;
let editId = null;
let charts = {};

const CAT_COLORS = {
    'Salary': '#c9a84c',
    'Freelance': '#e8c97a',
    'Food & Dining': '#e05c5c',
    'Transport': '#6b9fd4',
    'Utilities': '#a87fd4',
    'Shopping': '#e07d5c',
    'Healthcare': '#4caf7d',
    'Entertainment': '#d46b9f',
    'Education': '#6bd4c9',
    'Investment': '#7dd46b',
    'Other': '#8f8c88',
};

const SEED_TRANSACTIONS = [
    // October
    { id: 1, date: '2024-10-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
    { id: 2, date: '2024-10-03', description: 'Grocery Run', category: 'Food & Dining', type: 'expense', amount: 3200 },
    { id: 3, date: '2024-10-05', description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 1800 },
    { id: 4, date: '2024-10-08', description: 'Freelance Project', category: 'Freelance', type: 'income', amount: 22000 },
    { id: 5, date: '2024-10-12', description: 'Restaurant Dinner', category: 'Food & Dining', type: 'expense', amount: 2400 },
    { id: 6, date: '2024-10-15', description: 'Cab Rides', category: 'Transport', type: 'expense', amount: 1200 },
    { id: 7, date: '2024-10-18', description: 'Online Shopping', category: 'Shopping', type: 'expense', amount: 4500 },
    { id: 8, date: '2024-10-22', description: 'Doctor Visit', category: 'Healthcare', type: 'expense', amount: 900 },
    { id: 9, date: '2024-10-28', description: 'Movie Night', category: 'Entertainment', type: 'expense', amount: 600 },
    // November
    { id: 10, date: '2024-11-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
    { id: 11, date: '2024-11-04', description: 'Diwali Shopping', category: 'Shopping', type: 'expense', amount: 12000 },
    { id: 12, date: '2024-11-06', description: 'Swiggy Orders', category: 'Food & Dining', type: 'expense', amount: 3800 },
    { id: 13, date: '2024-11-10', description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 999 },
    { id: 14, date: '2024-11-14', description: 'Freelance Payment', category: 'Freelance', type: 'income', amount: 18000 },
    { id: 15, date: '2024-11-20', description: 'Metro Card Recharge', category: 'Transport', type: 'expense', amount: 500 },
    { id: 16, date: '2024-11-25', description: 'SIP Investment', category: 'Investment', type: 'expense', amount: 10000 },
    // December
    { id: 17, date: '2024-12-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
    { id: 18, date: '2024-12-05', description: 'Year-end Bonus', category: 'Salary', type: 'income', amount: 30000 },
    { id: 19, date: '2024-12-08', description: 'Christmas Shopping', category: 'Shopping', type: 'expense', amount: 8500 },
    { id: 20, date: '2024-12-12', description: 'Gas Bill', category: 'Utilities', type: 'expense', amount: 2200 },
    { id: 21, date: '2024-12-15', description: 'Online Course', category: 'Education', type: 'expense', amount: 4999 },
    { id: 22, date: '2024-12-20', description: 'Party Dinner', category: 'Food & Dining', type: 'expense', amount: 5600 },
    { id: 23, date: '2024-12-26', description: 'Mutual Fund', category: 'Investment', type: 'expense', amount: 15000 },
    { id: 24, date: '2024-12-28', description: 'Cab to Airport', category: 'Transport', type: 'expense', amount: 800 },
    // January
    { id: 25, date: '2025-01-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
    { id: 26, date: '2025-01-05', description: 'Grocery + Essentials', category: 'Food & Dining', type: 'expense', amount: 4100 },
    { id: 27, date: '2025-01-08', description: 'Rent Payment', category: 'Utilities', type: 'expense', amount: 18000 },
    { id: 28, date: '2025-01-12', description: 'Freelance Design', category: 'Freelance', type: 'income', amount: 25000 },
    { id: 29, date: '2025-01-18', description: 'Gym Membership', category: 'Healthcare', type: 'expense', amount: 2500 },
    { id: 30, date: '2025-01-22', description: 'Zomato Orders', category: 'Food & Dining', type: 'expense', amount: 2900 },
    { id: 31, date: '2025-01-25', description: 'Book Purchase', category: 'Education', type: 'expense', amount: 1200 },
    // February
    { id: 32, date: '2025-02-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
    { id: 33, date: '2025-02-05', description: 'Valentines Dinner', category: 'Food & Dining', type: 'expense', amount: 3500 },
    { id: 34, date: '2025-02-08', description: 'Electricity', category: 'Utilities', type: 'expense', amount: 1950 },
    { id: 35, date: '2025-02-12', description: 'Concert Tickets', category: 'Entertainment', type: 'expense', amount: 3200 },
    { id: 36, date: '2025-02-15', description: 'Consulting Fee', category: 'Freelance', type: 'income', amount: 32000 },
    { id: 37, date: '2025-02-20', description: 'SIP Investment', category: 'Investment', type: 'expense', amount: 10000 },
    { id: 38, date: '2025-02-24', description: 'Pharmacist', category: 'Healthcare', type: 'expense', amount: 750 },
    // March
    { id: 39, date: '2025-03-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
    { id: 40, date: '2025-03-05', description: 'Holi Celebration', category: 'Entertainment', type: 'expense', amount: 1800 },
    { id: 41, date: '2025-03-08', description: 'Grocery Shopping', category: 'Food & Dining', type: 'expense', amount: 3600 },
    { id: 42, date: '2025-03-10', description: 'Freelance App Dev', category: 'Freelance', type: 'income', amount: 40000 },
    { id: 43, date: '2025-03-14', description: 'Mobile Recharge', category: 'Utilities', type: 'expense', amount: 399 },
    { id: 44, date: '2025-03-18', description: 'New Sneakers', category: 'Shopping', type: 'expense', amount: 5999 },
    { id: 45, date: '2025-03-22', description: 'Mutual Fund', category: 'Investment', type: 'expense', amount: 15000 },
    { id: 46, date: '2025-03-28', description: 'Cab Rides March', category: 'Transport', type: 'expense', amount: 1500 },
].map(t => ({ ...t, id: t.id }));


let transactions = (() => {
    try {
        const saved = localStorage.getItem('ledger_transactions');
        return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
    } catch { return SEED_TRANSACTIONS; }
})();

function save() {
    try { localStorage.setItem('ledger_transactions', JSON.stringify(transactions)); } catch { }
}


const fmt = n => '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtDate = s => { const d = new Date(s); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
const getMonthKey = s => s.substring(0, 7);
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthLabel = s => { const [y, m] = s.split('-'); return MONTH_NAMES[+m - 1] + ' ' + y.slice(2); };
let nextId = () => Math.max(0, ...transactions.map(t => t.id)) + 1;


function navigate(page, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    if (el) 
        el.classList.add('active');
    const titles = { dashboard: 'Overview', transactions: 'Transactions', insights: 'Insights' };
    document.getElementById('topbarTitle').textContent = titles[page];
    document.getElementById('addTxBtn').style.display = (page === 'transactions' && role === 'admin') ? '' : 'none';
    closeSidebar();
    if(page === 'transactions') 
        renderTransactions();
    if(page === 'insights') 
        renderInsights();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('visible');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
}


function switchRole(val) {
    role = val;
    const isAdmin = role === 'admin';
    document.getElementById('roleBadgeText').textContent = isAdmin ? 'Admin — Full Access' : 'Viewer — Read Only';
    document.getElementById('addTxBtn').style.display =
        (isAdmin && document.getElementById('page-transactions').classList.contains('active')) ? '' : 'none';
    document.getElementById('adminNotice').style.display = isAdmin ? 'flex' : 'none';
    document.getElementById('actionsCol').style.display = isAdmin ? '' : 'none';
    renderTransactions();
    renderDashboard();
}


function openModal(id = null) {
    editId = id;
    const modal = document.getElementById('modalBackdrop');
    document.getElementById('modalTitle').textContent = id ? 'Edit Transaction' : 'New Transaction';
    if (id) {
        const tx = transactions.find(t => t.id === id);
        document.getElementById('f-type').value = tx.type;
        document.getElementById('f-amount').value = tx.amount;
        document.getElementById('f-desc').value = tx.description;
        document.getElementById('f-cat').value = tx.category;
        document.getElementById('f-date').value = tx.date;
    } else {
        document.getElementById('f-type').value = 'expense';
        document.getElementById('f-amount').value = '';
        document.getElementById('f-desc').value = '';
        document.getElementById('f-cat').value = 'Food & Dining';
        document.getElementById('f-date').value = new Date().toISOString().split('T')[0];
    }
    modal.style.display = 'flex';
}
function closeModal() { 
    document.getElementById('modalBackdrop').style.display = 'none'; }
function closeModalOnBg(e) { 
    if (e.target === document.getElementById('modalBackdrop')) 
        closeModal(); }
function saveTransaction() {
    const type = document.getElementById('f-type').value;
    const amount = parseFloat(document.getElementById('f-amount').value);
    const description = document.getElementById('f-desc').value.trim();
    const category = document.getElementById('f-cat').value;
    const date = document.getElementById('f-date').value;
    if (!amount || !description || !date) { 
        alert('Please fill in all fields.'); 
        return; 
    }
    if (editId) {
        const idx = transactions.findIndex(t => t.id === editId);
        transactions[idx] = { ...transactions[idx], type, amount, description, category, date };
    } else {
        transactions.push({ id: nextId(), type, amount, description, category, date });
    }
    save();
    closeModal();
    renderTransactions();
    renderDashboard();
    showToast(editId ? '✓ Transaction updated' : '✓ Transaction added');
}
function deleteTransaction(id) {
    if (!confirm('Delete this transaction?')) 
        return;
    transactions = transactions.filter(t => t.id !== id);
    save();
    renderTransactions();
    renderDashboard();
    showToast('✗ Transaction deleted');
}

function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

function renderDashboard() {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    const savings = income - expense;

    document.getElementById('stat-balance').textContent = fmt(balance);
    document.getElementById('stat-income').textContent = fmt(income);
    document.getElementById('stat-expenses').textContent = fmt(expense);
    document.getElementById('stat-savings').textContent = fmt(savings);

    const months = [...new Set(transactions.map(t => getMonthKey(t.date)))].sort();
    const lastM = months[months.length - 1];
    const prevM = months[months.length - 2];
    const mIncome = t => getMonthKey(t.date) === lastM && t.type === 'income';
    const mExpense = t => getMonthKey(t.date) === lastM && t.type === 'expense';
    const pIncome = t => getMonthKey(t.date) === prevM && t.type === 'income';
    const pExpense = t => getMonthKey(t.date) === prevM && t.type === 'expense';
    const curInc = transactions.filter(mIncome).reduce((s, t) => s + t.amount, 0);
    const curExp = transactions.filter(mExpense).reduce((s, t) => s + t.amount, 0);
    const prvInc = transactions.filter(pIncome).reduce((s, t) => s + t.amount, 0);
    const prvExp = transactions.filter(pExpense).reduce((s, t) => s + t.amount, 0);
    const delta = (cur, prv) => prv ? ((cur - prv) / prv * 100).toFixed(1) : 0;
    const dI = delta(curInc, prvInc);
    const dE = delta(curExp, prvExp);

    document.getElementById('stat-balance-delta').textContent = `${balance >= 0 ? '↑' : '↓'} ${fmt(Math.abs(balance))}`;
    document.getElementById('stat-income-delta').className = `stat-delta ${dI >= 0 ? 'delta-up' : 'delta-down'}`;
    document.getElementById('stat-income-delta').textContent = `${dI >= 0 ? '↑' : '↓'} ${Math.abs(dI)}% vs prev month`;
    document.getElementById('stat-expenses-delta').className = `stat-delta ${dE <= 0 ? 'delta-up' : 'delta-down'}`;
    document.getElementById('stat-expenses-delta').textContent = `${dE >= 0 ? '↑' : '↓'} ${Math.abs(dE)}% vs prev month`;
    document.getElementById('stat-savings-delta').className = `stat-delta ${savings >= 0 ? 'delta-up' : 'delta-down'}`;
    document.getElementById('stat-savings-delta').textContent = savings >= 0 ? `↑ Positive savings` : `↓ Deficit`;

    renderTrendChart(months);
    renderDonutChart();
    renderRecentTx();
    renderMonthlyBars(months);
}

function renderTrendChart(months) {
    const labels = months.map(m => monthLabel(m));
    const data = months.map(m => {
        const inc = transactions.filter(t => getMonthKey(t.date) === m && t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const exp = transactions.filter(t => getMonthKey(t.date) === m && t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return inc - exp;
    });
    let running = 0;
    const runData = data.map(v => { running += v; return running; });

    if (charts.trend) 
        charts.trend.destroy();
    const ctx = document.getElementById('trendChart').getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 220);
    grad.addColorStop(0, 'rgba(201,168,76,0.25)');
    grad.addColorStop(1, 'rgba(201,168,76,0)');
    charts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Balance',
                data: runData,
                borderColor: '#c9a84c',
                backgroundColor: grad,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#c9a84c',
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, tooltip: {
                    backgroundColor: '#1a1a24',
                    titleColor: '#8f8c88',
                    bodyColor: '#f0ede8',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    callbacks: { label: ctx => ' ' + fmt(ctx.raw) }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#5a5856', font: { family: 'DM Mono', size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#5a5856', font: { family: 'DM Mono', size: 10 }, callback: v => '₹' + (v / 1000).toFixed(0) + 'k' } }
            }
        }
    });
}

function renderDonutChart() {
    const cats = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
    const labels = Object.keys(cats);
    const data = Object.values(cats);
    const colors = labels.map(l => CAT_COLORS[l] || '#8f8c88');

    if (charts.donut) charts.donut.destroy();
    const ctx = document.getElementById('donutChart').getContext('2d');
    charts.donut = new Chart(ctx, {
        type: 'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: '#0a0a0f', borderWidth: 2, hoverOffset: 6 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#8f8c88', font: { family: 'Instrument Sans', size: 11 }, boxWidth: 12, padding: 14 } },
                tooltip: {
                    backgroundColor: '#1a1a24', titleColor: '#8f8c88', bodyColor: '#f0ede8',
                    borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                    callbacks: { label: ctx => ' ' + fmt(ctx.raw) + ` (${((ctx.raw / data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)` }
                }
            },
            cutout: '65%',
        }
    });
}

function renderRecentTx() {
    const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
    const el = document.getElementById('recentTxList');
    if (!sorted.length) { 
        el.innerHTML = '<div class="empty-state"><div class="icon">◎</div><p>No transactions</p></div>'; 
        return; 
    }
    el.innerHTML = sorted.map(t => `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
      <div>
        <div style="font-size:13.5px;font-weight:500;margin-bottom:2px">${t.description}</div>
        <div style="font-size:11px;color:var(--text3);font-family:var(--font-mono)">${fmtDate(t.date)} · <span style="color:${CAT_COLORS[t.category]}">${t.category}</span></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:13.5px;font-weight:500;color:${t.type === 'income' ? 'var(--green)' : 'var(--red)'}">
        ${t.type === 'income' ? '+' : '-'}${fmt(t.amount)}
      </div>
    </div>
  `).join('');
}

function renderMonthlyBars(months) {
    const el = document.getElementById('monthlyChart');
    const maxVal = Math.max(...months.map(m => Math.max(
        transactions.filter(t => getMonthKey(t.date) === m && t.type === 'income').reduce((s, t) => s + t.amount, 0),
        transactions.filter(t => getMonthKey(t.date) === m && t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    )));
    const bars = months.map(m => {
        const inc = transactions.filter(t => getMonthKey(t.date) === m && t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const exp = transactions.filter(t => getMonthKey(t.date) === m && t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const hi = (inc / maxVal * 100).toFixed(1);
        const he = (exp / maxVal * 100).toFixed(1);
        return `<div style="flex:1;display:flex;flex-direction:column;align-items:center">
      <div style="display:flex;gap:2px;align-items:flex-end;height:100px;width:100%">
        <div style="flex:1;height:${hi}%;background:var(--green);border-radius:3px 3px 0 0;opacity:0.85;min-height:4px"></div>
        <div style="flex:1;height:${he}%;background:var(--red);border-radius:3px 3px 0 0;opacity:0.85;min-height:4px"></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px;text-align:center">${monthLabel(m)}</div>
    </div>`;
    }).join('');
    el.innerHTML = `
    <div style="display:flex;gap:4px;height:100px;align-items:flex-end;padding-bottom:2px">${bars}</div>
    <div style="display:flex;gap:12px;margin-top:12px">
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2)"><span style="width:10px;height:10px;border-radius:2px;background:var(--green);display:inline-block"></span>Income</div>
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2)"><span style="width:10px;height:10px;border-radius:2px;background:var(--red);display:inline-block"></span>Expenses</div>
    </div>`;
}

function populateFilters() {
    const cats = [...new Set(transactions.map(t => t.category))].sort();
    const catEl = document.getElementById('catFilter');
    catEl.innerHTML = '<option value="">All Categories</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
    const months = [...new Set(transactions.map(t => getMonthKey(t.date)))].sort().reverse();
    const monEl = document.getElementById('monthFilter');
    monEl.innerHTML = '<option value="">All Months</option>' + months.map(m => `<option value="${m}">${monthLabel(m)}</option>`).join('');
}

function renderTransactions() {
    populateFilters();
    const search = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('typeFilter').value;
    const cat = document.getElementById('catFilter').value;
    const month = document.getElementById('monthFilter').value;

    let filtered = transactions.filter(t => {
        if (type && t.type !== type) 
            return false;
        if (cat && t.category !== cat) 
            return false;
        if (month && !t.date.startsWith(month)) 
            return false;
        if (search && !t.description.toLowerCase().includes(search) && !t.category.toLowerCase().includes(search)) 
            return false;
        return true;
    });

    filtered.sort((a, b) => {
        let va = a[sortCol], vb = b[sortCol];
        if (sortCol === 'amount') { 
            va = +va; vb = +vb; 
        }
        return va < vb ? -sortDir : va > vb ? sortDir : 0;
    });

    const tbody = document.getElementById('txTableBody');
    const empty = document.getElementById('txEmpty');
    const actCol = document.getElementById('actionsCol');
    actCol.style.display = role === 'admin' ? '' : 'none';

    if (!filtered.length) {
        tbody.innerHTML = '';
        empty.style.display = '';
        document.getElementById('txCount').textContent = '';
        return;
    }
    empty.style.display = 'none';
    document.getElementById('txCount').textContent = `Showing ${filtered.length} of ${transactions.length} transactions`;

    tbody.innerHTML = filtered.map(t => {
        const catColor = CAT_COLORS[t.category] || '#8f8c88';
        const adminCols = role === 'admin' ? `<td>
      <div class="tx-actions">
        <button class="icon-btn" onclick="openModal(${t.id})" title="Edit">✎</button>
        <button class="icon-btn danger" onclick="deleteTransaction(${t.id})" title="Delete">✕</button>
      </div>
    </td>` : '';
        return `<tr>
      <td><div class="tx-date">${fmtDate(t.date)}</div></td>
      <td><div class="tx-desc">${t.description}</div></td>
      <td><span class="tx-category" style="background:${catColor}18;color:${catColor}"><span style="width:6px;height:6px;border-radius:50%;background:${catColor};display:inline-block"></span>${t.category}</span></td>
      <td><span class="tx-type-badge badge-${t.type}">${t.type}</span></td>
      <td class="tx-amount amount-${t.type}">${t.type === 'income' ? '+' : '-'}${fmt(t.amount)}</td>
      ${adminCols}
    </tr>`;
    }).join('');

    ['date', 'description', 'category', 'type', 'amount'].forEach(col => {
        const el = document.getElementById('sort-' + col);
        if (el) 
            el.textContent = col === sortCol ? (sortDir === 1 ? ' ↑' : ' ↓') : '';
        const th = el && el.parentElement;
        if (th) 
            th.classList.toggle('sorted', col === sortCol);
    });
}

function sortBy(col) {
    if (sortCol === col) 
        sortDir *= -1;
    else { 
        sortCol = col; sortDir = 1; 
    }
    renderTransactions();
}

function renderInsights() {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const catTotals = {};
    transactions.filter(t => t.type === 'expense').forEach(t => catTotals[t.category] = (catTotals[t.category] || 0) + t.amount);
    const catArr = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    const topCat = catArr[0] || ['—', 0];
    const savingsRate = income ? ((income - expense) / income * 100).toFixed(1) : '0';

    const months = [...new Set(transactions.map(t => getMonthKey(t.date)))].sort();
    const lastM = months[months.length - 1];
    const prevM = months[months.length - 2];
    const curExp = transactions.filter(t => getMonthKey(t.date) === lastM && t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const prvExp = transactions.filter(t => getMonthKey(t.date) === prevM && t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const momDelta = prvExp ? (((curExp - prvExp) / prvExp) * 100).toFixed(1) : 0;
    const avgMonthly = months.length ? (expense / months.length).toFixed(0) : 0;

    const cards = [
        { label: 'Top Spending Category', value: topCat[0], sub: fmt(topCat[1]) + ' total spent', color: CAT_COLORS[topCat[0]] || '#c9a84c' },
        { label: 'Savings Rate', value: savingsRate + '%', sub: 'of total income saved', color: parseFloat(savingsRate) >= 20 ? '#4caf7d' : '#e05c5c' },
        { label: 'Avg Monthly Spend', value: fmt(+avgMonthly), sub: 'across ' + months.length + ' months', color: '#6b9fd4' },
        { label: 'MoM Expense Change', value: (momDelta >= 0 ? '+' : '') + momDelta + '%', sub: `${monthLabel(prevM)} → ${monthLabel(lastM)}`, color: momDelta <= 0 ? '#4caf7d' : '#e05c5c' },
        { label: 'Total Transactions', value: transactions.length, sub: 'across all months', color: '#a87fd4' },
        { label: 'Net Position', value: fmt(income - expense), sub: income >= expense ? 'Surplus — well done!' : 'Deficit — review expenses', color: income >= expense ? '#4caf7d' : '#e05c5c' },
    ];
    document.getElementById('insightCards').innerHTML = cards.map(c => `
    <div class="insight-card">
      <div class="accent-line" style="background:${c.color}"></div>
      <div class="inner">
        <div class="insight-label">${c.label}</div>
        <div class="insight-value" style="color:${c.color}">${c.value}</div>
        <div class="insight-sub">${c.sub}</div>
      </div>
    </div>
  `).join('');

    const totalExp = catArr.reduce((s, [, v]) => s + v, 0);
    document.getElementById('catBreakdown').innerHTML = catArr.map(([cat, val]) => {
        const pct = totalExp ? (val / totalExp * 100).toFixed(1) : 0;
        const color = CAT_COLORS[cat] || '#8f8c88';
        return `<div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <span style="display:flex;align-items:center;gap:6px;font-size:13px">
          <span style="width:8px;height:8px;border-radius:50%;background:${color};display:inline-block"></span>
          ${cat}
        </span>
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--text2)">${fmt(val)} <span style="color:var(--text3)">(${pct}%)</span></span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
    }).join('');

    if (charts.mom) 
        charts.mom.destroy();
    const mLabels = months.map(m => monthLabel(m));
    const mInc = months.map(m => transactions.filter(t => getMonthKey(t.date) === m && t.type === 'income').reduce((s, t) => s + t.amount, 0));
    const mExp = months.map(m => transactions.filter(t => getMonthKey(t.date) === m && t.type === 'expense').reduce((s, t) => s + t.amount, 0));
    const ctx = document.getElementById('momChart').getContext('2d');
    charts.mom = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mLabels,
            datasets: [
                { label: 'Income', data: mInc, backgroundColor: 'rgba(76,175,125,0.7)', borderRadius: 4 },
                { label: 'Expenses', data: mExp, backgroundColor: 'rgba(224,92,92,0.7)', borderRadius: 4 },
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#8f8c88', font: { family: 'Instrument Sans', size: 11 }, boxWidth: 12 } },
                tooltip: {
                    backgroundColor: '#1a1a24', titleColor: '#8f8c88', bodyColor: '#f0ede8',
                    borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
                    callbacks: { label: ctx => ' ' + fmt(ctx.raw) }
                }
            },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#5a5856', font: { family: 'DM Mono', size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#5a5856', font: { family: 'DM Mono', size: 10 }, callback: v => '₹' + (v / 1000).toFixed(0) + 'k' } }
            }
        }
    });
}

function exportCSV() {
    const header = 'Date,Description,Category,Type,Amount\n';
    const rows = transactions.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`).join('\n');
    download('ledger-transactions.csv', header + rows, 'text/csv');
    showToast('✓ CSV exported');
}
function exportJSON() {
    download('ledger-transactions.json', JSON.stringify(transactions, null, 2), 'application/json');
    showToast('✓ JSON exported');
}
function download(name, content, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = name;
    a.click();
}

document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
renderDashboard();
populateFilters();