import AnalizadorLexico from './analizador_lexico/analizadorLexico.js'

const lexico = new AnalizadorLexico();
const results = lexico.getLexico("asd = 12 > asdad != 122");

console.log(results);
console.log(results.join(" "));