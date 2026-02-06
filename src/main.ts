/*Pseudokod steg 1-3
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


   //Tom array för objekten (budgetItem)
let budgetPosts = [];

  //Hitta formuläret
  const budgetForm = document.getElementById("budget-form"); 
  //Hämtar fälten från html
  const amountInput = document.getElementById("amount") as HTMLInputElement; //själva input-fältet
  const descriptionInput = document.getElementById("description") as HTMLInputElement;
  const categoryInput = document.getElementById("category") as HTMLSelectElement;
  
  //Hämta income/expense-sektionerna
  const incomeList = document.querySelector('#income-list ul');
  const expenseList = document.querySelector('#expense-list ul');




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

   //konvertera budgetPosts-arrayen till en JSON.string
  //spara den med samma key 'budgetPosts'
  localStorage.setItem('budgetPosts', JSON.stringify(budgetPosts)); 

  renderBudgetPosts();

  budgetForm.reset(); //tömmer formuläret efter att användarn
  updateBalance();
});

/*Pseudokod för localstorange
4. När sidan laddas:
a) Hämta data från localStorage med nyckeln "budgetPosts".
b) Om data finns:
  i) Konvertera data från JSON-sträng till array.
  ii) Lägg till objekten i budgetPosts-arrayen.
  iii) Rendera alla poster i listorna (inkomst och utgift).
  iv) Uppdatera totalbalansen.

5. När formuläret skickas:
a) Stoppa omladdningen av sidan (preventDefault).
b) Läs av värden från formuläret (amount, description, category, type).
c) Skapa ett budgetobjekt med värdena.
d) Lägg till objektet i budgetPosts-arrayen.
e) Spara hela budgetPosts-arrayen som JSON i localStorage.
f) Rendera listorna på nytt för att visa alla poster.
g) Uppdatera totalbalansen.
h) Rensa formuläret för ny inmatning.
*/

//4a. Hämta sparad data från localStorage med nyckeln 'budgetPosts'
//Detta hämtar en sträng eller null om inget är sparat
const saveData = localStorage.getItem('budgetPosts'); 
//conbst=nyckeord som betyder att variabeln ej kan byta värde senare
//saveData är vad variabelns namn
//localStorage är webbläsare-API som ger tillgång till lokalt lagrad data i webbläsaren.
//LS sparar data som strängar (key-value pairs) som finns kvar även när webbläsaren är stängd
//getItem är en metod på LS som hämtar värdet för en viss nyckel. 


  //Om det finns sparad data i saveData (dvs ej null)
  if (saveData) {
    budgetPosts = JSON.parse(saveData);
     //konvertera JSON-strängen till en JS-array
    //JSON.parse tar strängen och gör om den till ett object som vi kan använda i koden
    renderBudgetPosts(); //Visa datan direkt på sidan
    updateBalance();
  }

  function renderBudgetPosts() {
    //rensa listorna först så det inte blir dubbla poster
    incomeList!.innerHTML = '';
    expenseList!.innerHTML = '';
    //loopa varje post
    budgetPosts.forEach(post => {
      //skapa <li>-element för varje post
      const li = document.createElement('li');
      li.textContent = `${post.description}; ${post.amount} kr (${post.category})`;

      //beroende på typen (income(expense)- lägg till <li> i rätt lista
      if (post.type === 'income') {
        incomeList?.appendChild(li);
      } else {
        expenseList?.appendChild(li);
      }
    })
  }

