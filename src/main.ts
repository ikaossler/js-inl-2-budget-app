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


  //Hitta formuläret
  const budgetForm = document.getElementById("budget-form"); 
  //Hämtar fälten från html
  const amountInput = document.getElementById("amount") as HTMLInputElement; //själva input-fältet
  const descriptionInput = document.getElementById("description") as HTMLInputElement;
  const categoryInput = document.getElementById("category") as HTMLSelectElement;
  
  //Hämta income/expense-sektionerna
  const incomeList = document.querySelector('#income-list ul');
  const expenseList = document.querySelector('#expense-list ul');


//Tom array för objekten (budgetItem)
const budgetPosts = [];

const totalBalanceElement = document.getElementById('total-balance');

function updateBalance() {
  let incomeSum = 0;
  let expenseSum = 0;

  budgetPosts.forEach(post => {
    const amountNum = Number(post.amount); //gör sträng till nummer
    if (post.type === 'income') {
      incomeSum += amountNum;
    } else {
      expenseSum += amountNum;
    }
  });
    const totalSum = incomeSum - expenseSum;

    if (totalBalanceElement) {
      totalBalanceElement.textContent = totalSum + ' kr';
    }
}

budgetForm?.addEventListener("submit", (event) => {
  event.preventDefault(); //eventlyssnare på submit plus stoppa omladdning av sidan

const typeInput = document.querySelector('input[name="type"]:checked') as HTMLInputElement;


  //Läser av innehållet från input-fälten 
  const amount = amountInput.value; //texten/siffran som skrivs i fältet 
  const description = descriptionInput.value;
  const category = categoryInput.value;
  const type = typeInput.value;

  //object av värdena
  const budgetItem = {
    amount,
    description,
    category,
    type, //Income/Expense
  };

  //pusha objektet till listan(arrayen)
  budgetPosts.push(budgetItem); //Lägg in budgetItem tll attayen (budgetPosts)


  //Skapa <li> för alla objekt
  const li = document.createElement('li');
  li.textContent = `${budgetItem.description}: ${budgetItem.amount} kr (${budgetItem.category})`;


  //vilken typ posten har (income eller expense)
  if (budgetItem.type === "income") { //Om det är inkomst, lägg till listobjetet i income-list.
    incomeList?.appendChild(li); //appenChild=gör detta element till barn till elementet i DOM
  } else { //annars (dvs expense) lägg till objetet i expense-listan
    expenseList?.appendChild(li);
  }

  budgetForm.reset(); //tömmer formuläret efter att användarn
  updateBalance();
});