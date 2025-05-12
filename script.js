// DOM Elements
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const typeInput = document.getElementById("type");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const budgetInput = document.getElementById("budget");
const transactionForm = document.getElementById("transactionForm");

const totalIncomeDisplay = document.getElementById("totalIncome");
const totalExpenseDisplay = document.getElementById("totalExpense");
const totalBalanceDisplay = document.getElementById("totalBalance");
const budgetAmountDisplay = document.getElementById("budgetAmount");
const transactionList = document.getElementById("transactionList");

// Load data from localStorage
const loadData = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const budget = parseFloat(localStorage.getItem("budget")) || 0;
    updateUI(transactions, budget);
};

// Update UI
const updateUI = (transactions, budget) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") totalIncome += transaction.amount;
        if (transaction.type === "expense") totalExpense += transaction.amount;
    });

    const totalBalance = totalIncome - totalExpense;

    // Update UI with formatted values
    totalIncomeDisplay.textContent = formatCurrency(totalIncome);
    totalExpenseDisplay.textContent = formatCurrency(totalExpense);
    totalBalanceDisplay.textContent = formatCurrency(totalBalance);
    budgetAmountDisplay.textContent = formatCurrency(budget);

    // Render transactions
    transactionList.innerHTML = "";
    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `${transaction.description} - ₹${transaction.amount} (${transaction.type}) 
                        <button class="btn btn-danger btn-sm float-end" onclick="deleteTransaction(${index})">Delete</button>`;
        transactionList.appendChild(li);
    });
};

// Format currency as INR (₹)
const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

// Add Transaction
const addTransaction = (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value;
    const type = typeInput.value;

    if (isNaN(amount) || amount <= 0 || description.trim() === "") {
        alert("Please enter valid details for the transaction.");
        return;
    }

    const transaction = { amount, description, type };
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);

    // Save data to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Clear form and update UI
    amountInput.value = "";
    descriptionInput.value = "";
    loadData();
};

// Set Budget
const setBudget = () => {
    const budget = parseFloat(budgetInput.value);
    if (isNaN(budget) || budget <= 0) {
        alert("Please enter a valid budget amount.");
        return;
    }
    localStorage.setItem("budget", budget);
    loadData();
};

// Delete Transaction
const deleteTransaction = (index) => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    loadData();
};

// Event Listeners
transactionForm.addEventListener("submit", addTransaction);
setBudgetBtn.addEventListener("click", setBudget);

// Initial Load
loadData();
