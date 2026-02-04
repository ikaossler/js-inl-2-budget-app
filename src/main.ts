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
