const btn = window.document.querySelector('[data-js="input"]');
btn.addEventListener("click", () => {
  window.document.body.classList.toggle("dark-theme");
});

const $htmlModal = window.document.querySelector('[data-js="modal"]');
const $btnNewTransaction = window.document.querySelector(
  '[data-js="new-transaction"]'
);
$btnNewTransaction.addEventListener("click", (event) => {
  event.preventDefault();
  $htmlModal.classList.add("active");

  if ($htmlModal.classList.value == "modal-overlay active") {
    document.addEventListener("click", (event) => {
      if (event.target.classList.value === "modal-overlay active") {
        $htmlModal.classList.remove("active");
      }
    });
  } // Fechar quando clicar fora da caixa
});

const $btnCancelTransaction = window.document.querySelector(
  '[data-js="cancel-transaction"]'
);
$btnCancelTransaction.addEventListener("click", (event) => {
  event.preventDefault();
  $htmlModal.classList.remove("active");
});

// Cadastrar dados

const Transaction = {
  all: [
    {
      description: "Luz",
      amount: -50000,
      date: "23/01/2021",
    },
    {
      description: "Website",
      amount: 500000,
      date: "23/01/2021",
    },
    {
      description: "Internet",
      amount: -20000,
      date: "23/01/2021",
    },
  ],

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    //console.log(transaction[index].description)
    const tr = document.createElement("tr");
    tr.insertAdjacentHTML("afterbegin", DOM.innerHTMLTransaction(transaction));
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const ClassName = transaction.amount > 0 ? "income" : "expanse";

    const amount = Utils.formatCurrency(transaction.amount);

    const $html = `
                <td class="description">${transaction.description}</td>
                <td class="${ClassName}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                    <img src="assets/minus.svg" alt="Remover transação">
                </td>
            `;

    return $html;
  },

  updateBalance() {
    document.querySelector('[data-js="income-display"]').textContent =
      Utils.formatCurrency(Transaction.incomes());
    document.querySelector('[data-js="expanse-display"]').textContent =
      Utils.formatCurrency(Transaction.expenses());
    document.querySelector('[data-js="total-display"]').textContent =
      Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    return value;
  },
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]} `;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },
  formatData() {
    console.log("formatar");
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Preencha todos os campos!");
    }
  },
  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },
  /*saveTransaction(transaction){
            Transaction.add(transaction)
        },*/
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },
  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      Form.clearFields();
      $htmlModal.classList.remove("active");
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => DOM.addTransaction(transaction));
    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};
App.init();
