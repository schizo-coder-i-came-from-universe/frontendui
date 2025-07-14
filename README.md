Denicek	
Apr 1 – první commit, vytvoření základního prostoru pro práci
Apr 3 – malé úpravy, smazání testovacího testu z app.jsx
Apr 4 – první velký commit, vygenerování package, zároveň testování jednoduchých queries
Apr 25 – Vytvoření user package a testpage, kde se prozatím testovalo jednoduché stringify všeho	
May 9 – Vytvoření mutace pro změnu částky, zároveň generování posledního package (group), testování na userpage
May 16 – možnost vybrat si ze studijních předmětů, tudíž vytvoření vlastní komponenty a query, první větší problém
May 20 – časová osa z dat která jsou v databázi, první pokusy o zobrazení stavu řízení, otevření a uzavření příjmacího řízení
Jul 14 – otevření každého programu separátně, čistění kódu, generování dat, komentování a zbavení se CSS 

Problémy k vyřešení
•	Načtení všech programů
•	Otevření řízení
•	Zobrazení počtu přihlášek, časové osy
Objevy
•	Velmi záleží na co konkrétně se ptám a co načítám (program.id / celý program objekt)
•	Jak pomocí <select> komponenty předávat celé objekty, ne jen jejich ID
•	Jak pracovat s výsledky GraphQL dotazů, které mohou mít různou strukturu
•	Jak spravovat stav (např. otevřené/uzavřené přijímací řízení)
•	Generování dat do databáze
•	Odkazování na komponenty v jiných souborech
Řešení hlavních problémů
•	ProgramSelect nic nezobrazoval – sáhodlouhý debugging v konzoli, zkoumání co přesně se vrací z dotazu a proč se to nepropisuje na stránku
•	Zobrazení datumů – správné formátování a seřazení – importováním už hotové knihovny
•	Generování dat sebou neslo potíže – nepropsání do GraphiQL, následně špatný řádek na zobrazovíní počtu přihlášek

