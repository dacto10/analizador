class AnalizadorLexico {
     constructor() {
          this.results = [];
          this.characters = new RegExp("^[a-zA-Z]+$");
          this.numbers = new RegExp("^[0-9]+$");
          this.current = 0;
     }
     getLexico(input) {
          this.results.length = 0;
          for (let i = 0; i < input.length; i++) {
               if (this.characters.test(input[i])) {
                    this.results[this.current] = this.results[this.current] ? this.results[this.current].concat(input[i]) : input[i];
                    if (!(this.characters.test(input[i + 1])) && !(this.numbers.test(input[i + 1]))) {
                        this.current++;
                    }
               } else if (this.numbers.test(input[i])) {
                   this.results[this.current] = this.results[this.current] ? this.results[this.current].concat(input[i]) : input[i];
                   !(this.numbers.test(input[i + 1])) && this.current++;
               } else if (input[i] === "=") {
                    this.results[this.current] = this.results[this.current] ? this.results[this.current].concat(input[i]) : input[i];
                    input[i + 1] !== "=" && this.current++;
               } else if (input[i] === ">" || input[i] === "<") {
                    this.results[this.current] = input[i];
                    input[i + 1] !== "=" && this.current++;
               } else if(input[i] === "!") {
                    this.results[this.current] = input[i];
                    input[i + 1] !== "=" && this.current++;
               } else if(input[i] === ";") {
                    this.results[this.current] = input[i];
                    this.current++;
               }
          }
          this.current = 0;
          return this.results.map(el => (el === "=" ? "<asign>" : el === "==" ? "<equals>" : el === "!=" ? "<distinct>" : el === ">" ? "<greather than>" : el === ">=" ? "<greather/equal than>": el === "<" ? "<lower than>" : el === "<=" ? "<lower/equal than>": el === ";" ? "<term>": el === "(" ? "<open parenthesis>" : el === ")" ? "<close parenthesis>" : `<${el}>`))
     }
}

export default AnalizadorLexico;