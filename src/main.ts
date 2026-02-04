/*Pseudo steg1.
1. Hitta formuläret i DOM med getElementById (id: budget-form)
2. Lägg till en eventlyssnare på formuläret för submit
3. När formuläret skickas:
   a) stoppa omladdningen av sidan (preventDefault)
   b) läs av värden från input-fälten (amount, description, category, type)
   c) skapa ett objekt med dessa värden
   d) lägg objektet i rätt lista (inkomst eller utgift)
   e) uppdatera listan i HTML så användaren ser posten direkt
   f) uppdatera totalbalansen och visa den på sidan
   g) rensa formuläret för ny inmatning
   */



const budgetForm = document.getElementById("budget-form");
const budgetPosts: BudgetPost[] = [];

budgetForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const amountInput = document.getElementById("amount") as HTMLInputElement;
  const descriptionInput = document.getElementById("description") as HTMLInputElement;
  const categoryInput = document.getElementById("category") as HTMLSelectElement;
  const typeInput = document.querySelector('input[name="type"]:checked') as HTMLInputElement;

  const amount = amountInput.value;
  const description = descriptionInput.value;
  const category = categoryInput.value;
  const type = typeInput.value;

  const budgetPost: BudgetPost = {
    amount,
    description,
    category,
    type,
  };

  budgetPosts.push(budgetPost);
  console.log(budgetPost);
  console.log(budgetPosts);
});
