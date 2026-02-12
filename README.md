[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fEntiP9j)


Budget-app 

En enkel budget-app där användaren kan lägga in inkomster och utgifter, kategorisera dem, radera poster och se en dynamisk balans. Projektet är byggt med TypeScript, HTML och CSS och är responsivt.

Funktioner:
-Lägg till inkomster och utgifter med belopp, beskrivning och kategori.
-Välj typ (Income/Expense) med radioknappar.
-Dynamisk balans som uppdateras vid positivt eller negativt balansresultat
-Balansen färgkodas: grön för positiv, röd för negativ, svart vid noll.
-Radera poster med radera-knapp (emoji, soptunna)
-Kategorier hämtas från JSON-fil (categories.json).
-Sparar data i localStorage.

Teknisk info:
-Byggt med Vite och TypeScript.
-Kod strukturerad med interface (IBudgetPost) i models.ts.
-Eventhantering och rendering av listor sker i main.ts.
-CSS design med lantställe/italiensk stenhuskänsla: varma gradienter, skuggor och avrundade hörn.
-Responsiv layout.


![Desktop](public/Assets/Lighthouse-desktop.png)
![Mobile](public/Assets/Lighthouse.mobile.png)
