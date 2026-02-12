import "./style.css";

/*
PSEUDOKOD - Budget-app

1. INITIERING (när sidan laddas):
   - Skapa tom array för budgetPosts
   - Hämta alla HTML-element (formulär, listor, input-fält)
   - Läs localStorage och ladda sparade poster om de finns
   - Rendera befintliga poster
   - Uppdatera balansen

2. LÄGGA TILL POST (när formuläret skickas):
   - Läs av formulärdata (belopp, beskrivning, kategori, typ)
   - Skapa budgetItem-objekt
   - Lägg till i budgetPosts-array
   - Spara till localStorage
   - Rendera om listorna
   - Uppdatera balansen
   - Töm formuläret

3. RADERA POST (när X-knapp klickas):
   - Ta bort post från array (baserat på index)
   - Uppdatera localStorage
   - Rendera om listorna
   - Uppdatera balansen

4. HJÄLPFUNKTIONER:
   - renderBudgetPosts(): Loopar genom array, skapar <li> för varje post
   - updateBalance(): Räknar ut total inkomst - utgift, visar summa
*/

import type { IBudgetPost } from "./models";


//Tom array för objekten (budgetItem)
let budgetPosts: IBudgetPost[] = [];

//Hitta formuläret
const budgetForm = document.getElementById("budget-form") as HTMLFormElement;

//Hämtar fälten från html
const amountInput = document.getElementById("amount") as HTMLInputElement; //själva input-fältet
const descriptionInput = document.getElementById(
  "description",
) as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;

// Ladda kategorier från JSON
fetch('categories.json')
  .then(response => response.json())
  .then((categories: Array<{value: string, label: string}>) => {
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.value;
      option.textContent = cat.label;
      categoryInput.appendChild(option);
    });
  })
  .catch(error => console.error('Kunde inte ladda kategorier:', error));

//Hämta income/expense-sektionerna
const incomeList = document.querySelector("#income-list ul");
const expenseList = document.querySelector("#expense-list ul");

const totalBalanceElement = document.getElementById("total-balance");

function updateBalance(): void {
  let incomeSum = 0;
  let expenseSum = 0;

  budgetPosts.forEach((post) => {
    const amountNum = Number(post.amount); //gör sträng till nummer
    if (post.type === "income") {
      incomeSum += amountNum;
    } else {
      expenseSum += amountNum;
    }
  });
  const totalSum = incomeSum - expenseSum;

  if (totalBalanceElement) {
    totalBalanceElement.textContent = totalSum + " kr";

    if (totalSum > 0) {
      totalBalanceElement.style.color = "#6b7d5c";
    } else if (totalSum < 0) {
      totalBalanceElement.style.color = "#a0473a";
    } else {
      totalBalanceElement.style.color = "#3d3d3d";
    }
  }
}

budgetForm?.addEventListener("submit", (event) => {
  event.preventDefault(); //eventlyssnare på submit plus stoppa omladdning av sidan

  const typeInput = document.querySelector(
    'input[name="type"]:checked',
  ) as HTMLInputElement;

  console.log(typeInput);


  //Läser av innehållet från input-fälten
  const amount = Number(amountInput.value); 
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

  //konvertera budgetPosts-arrayen till en JSON.string
  //spara den med samma key 'budgetPosts'
  localStorage.setItem("budgetPosts", JSON.stringify(budgetPosts));

  renderBudgetPosts();

  budgetForm.reset(); //tömmer formuläret efter att användarn
  updateBalance();
});

function deleteBudgetPost(index: number) {
  //1. ta bort posten från arrayen
  budgetPosts.splice(index, 1);

  //2. Uppdatera localStorage
  localStorage.setItem("budgetPosts", JSON.stringify(budgetPosts));

  //3.Rendera om listan
  renderBudgetPosts();

  //4. Uppdatera balansen
  updateBalance();
}

const saveData = localStorage.getItem("budgetPosts"); // Skapar variabeln OCH hämtar data
//Om det finns sparad data i saveData (dvs ej null)
if (saveData) {
  budgetPosts = JSON.parse(saveData);
  //konvertera JSON-strängen till en JS-array
  //JSON.parse tar strängen och gör om den till ett object som vi kan använda i koden
  renderBudgetPosts(); //Visa datan direkt på sidan
  updateBalance();
}

function renderBudgetPosts(): void {
  //rensa listorna först så det inte blir dubbla poster
  incomeList!.innerHTML = "";
  expenseList!.innerHTML = "";
  //loopa varje post
  budgetPosts.forEach((post, index) => {
    //skapa <li>-element för varje post
    const li = document.createElement("li");
    li.textContent = `${post.description}: ${post.amount} kr (${post.category})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    deleteBtn.setAttribute("aria-label", `Delete ${post.description}`);

    deleteBtn.addEventListener("click", () => {
      deleteBudgetPost(index);
    });

    li.appendChild(deleteBtn);

    //beroende på typen (income(expense)- lägg till <li> i rätt lista
    if (post.type === "income") {
      incomeList?.appendChild(li);
    } else {
      expenseList?.appendChild(li);
    }
  });
}
