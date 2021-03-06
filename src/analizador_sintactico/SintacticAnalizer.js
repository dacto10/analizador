/**
    <program> ::= <instruction> | <program> <instruction> 
    <instruction> ::= <expression><semicolon> | <term><semicolon>
    <expresion> ::= <assignation> | <comparison>
    <assignation> ::= <var> <asign> <2nd term>
    <2nd term> ::= <term> | <comparison>
    <comparison> ::= <term> <comp> <term> | <term> <comp> <comparison>
    <term> ::= <var> | <num>
 */

export default class SintacticAnalizer {
    constructor(program) {
        this.var = "<var>";
        this.num = "<num>";
        this.comparisonOperators = ["<equals>", "<distinct>", "<greather than>", "<greather/equal than>", "<lower than>", "<lower/equal than>"];
        this.asignOperator = "<asign>";
        this.term = "<term>";
        this.program = this.separateInstructions(program);
    }

    separateInstructions(program) {
        const separatedInstructions = [[]];
        let current = 0;
        for (let i = 0; i < program.length; i++) {
            separatedInstructions[current].push(program[i]);
            if (program[i] === this.term) {
                current++;
                i !== program.length-1 && separatedInstructions.push([])
            } 
        }
        return separatedInstructions;
    }

    getSintactic() {
        return this.filterTerm().filterInvalidCharacters().program.map((el, index) => {
            console.log(`Instruction number ${index+1}`);
            return !el.includes("<err>") ? this.instruction(el) : false;
        });
    }

    filterTerm() {
        this.program.forEach(el => el[el.length-1] !== this.term && console.log("Error, missing semicolon"));
        return this;
    }

    filterInvalidCharacters() {
        this.program.forEach(el => el.includes("<err>") && console.log("Error, unexpected token"));
        return this;
    }

    instruction(instruction) {
        const result = instruction.length === 2 ? this.term(instruction[0]) : this.expression(instruction.slice(0, -1));
        console.log(`Instruction test = ${result}, ${instruction}`);
        return result;
    }

    term(term) {
        const result = this.number(term[0]) || this.variable(term[0]);
        console.log(`Term test = ${result}, ${term}`);
        return result;
    }

    expression(expression) {
        const result = expression[1] === this.asignOperator ? this.asign(expression) : this.comparison(expression);
        console.log(`Expression test = ${result}, ${expression}`);
        return result;
    }

    asign(asign) {
        const result = this.variable(asign[0]) && this.asignOperation(asign[1]) ? this.secondTerm(asign.slice(2, asign.length)) : false;
        console.log(`Asign test = ${result}, ${asign}`);
        return result;
    }

    secondTerm(secondTerm) {
        const result = secondTerm.length === 1 ? this.term(secondTerm) : this.comparison(secondTerm);
        console.log(`Second term test = ${result}, ${secondTerm}`);
        return result;
    }

    comparison(comparison) {
        const result = (this.variable(comparison[0]) || this.number(comparison[0])) && this.comparisonOperator(comparison[1]) && (this.variable(comparison[2]) || this.number(comparison[2]));
        console.log(`Comparison test = ${result}, ${comparison}`);
        if (comparison.length > 3) return result && this.comparison(comparison.slice(2, comparison.length))
        return result;
    }

    variable(variable) {
        const result = variable === this.var;
        console.log(`Variable test = ${result}, ${variable}`);
        return result;
    }

    number(number) {
        const result = number === this.num;
        console.log(`Number test = ${result}, ${number}`);
        return result;
    }

    comparisonOperator(operator) {
        const result = this.comparisonOperators.includes(operator);
        console.log(`Comparison operator test = ${result}. ${operator}`);
        return result;
    }

    asignOperation(asign) {
        const result = asign === this.asignOperator;
        console.log(`Asign operator test = ${result} , ${asign}`);
        return result;
    }
}