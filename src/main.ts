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



const budgetForm = document.getElementById("budget-form"); //Hitta formuläret

//Tom array för objekten (budgetPost)
const budgetPosts = [];

budgetForm?.addEventListener("submit", (event) => {
  event.preventDefault(); //eventlyssnare på submit plus stoppa omladdning av sidan

  //Hämtar fälten från html
  const amountInput = document.getElementById("amount") as HTMLInputElement; //själva input-fältet
  const descriptionInput = document.getElementById("description") as HTMLInputElement;
  const categoryInput = document.getElementById("category") as HTMLSelectElement;
  const typeInput = document.querySelector('input[name="type"]:checked') as HTMLInputElement;

  //Läser av innehållet från input-fälten 
  const amount = amountInput.value; //texten/siffran som skrivs i fältet 
  const description = descriptionInput.value;
  const category = categoryInput.value;
  const type = typeInput.value;

  //object av värdena
  const budgetPost = {
    amount,
    description,
    category,
    type,
  };

  //pusha objektet till listan(arrayen)
  budgetPosts.push(budgetPost);
});


