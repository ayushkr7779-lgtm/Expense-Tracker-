let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveTransactions();
    updateUI();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    updateUI();
}

function updateUI() {
    const transactionList = document.getElementById("transactionList");

    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");
        li.classList.add(transaction.type);

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <span>${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}</span>
            </div>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        transactionList.appendChild(li);
    });

    document.getElementById("income").textContent = "₹" + income;
    document.getElementById("expense").textContent = "₹" + expense;
    document.getElementById("balance").textContent = "₹" + (income - expense);
}

updateUI();
