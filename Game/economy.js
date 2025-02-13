let balance = 1000;

// Обновляем баланс. Возвращаем true/false — удалось ли провести операцию
export function updateBalance(amount) {
  if (balance + amount < 0) {
    // Недостаточно средств
    return false;
  }
  balance += amount;
  document.getElementById("balance").textContent = balance;
  return true;
}

export function getBalance() {
  return balance;
}
