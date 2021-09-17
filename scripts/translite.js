var trns = (function(){
    const ruKeys = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
        'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
        'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
    }

   function transliterate(word) {
     return word
       .split("")
       .map((letter) => {
         const lowLetter = letter.toLowerCase();
         const en = ruKeys[lowLetter] ?? letter;
         return lowLetter === letter ? en : en.toUpperCase();
       })
       .join("");
   }

    return {
      transliterate: transliterate
    
    };

})();