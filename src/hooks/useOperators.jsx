import { useState } from "react";

export default function useOperators() {

    const [formula, setFormula] = useState('');
    const [display, setDisplay] = useState(0);
    const [result, setResult] = useState('');
    const [counterOfSingsPressed, setCounterOfSingsPressed] = useState(0);
    
    const operations = {
        '+': (a, b) => Number(a) + Number(b),
        '-': (a, b) => Number(a) - Number(b),
        '*': (a, b) => Number(a) * Number(b),
        '/': (a, b) => {
            if (Number(b) === 0) {
                alert('Cannot divide by zero');
                return 0;
            }
            return Number(a) / Number(b);
        },
        // '=': (a, b) => b,
        '.': (a, b) => {
            if (a.toString().includes('.')) {
                return a;
            }
            return a + '.';
        },
    }

    const evaluate = (formula) => {
        const result = eval(formula);
        return result;
    }

    const handleClick = (e) => {
        const value = e.target.value;

        // this validation is for the case when the user press the AC sign
        // it will reset all the states
        if (value === 'AC') {
            setFormula('');
            setDisplay(0);
            setResult('');
            setCounterOfSingsPressed(0);
            return;
        }
        // this validation is for the case when the user press the = sign
        // it will make the operation and show the result
        if (value === '=') {
            const result = evaluate(formula);
            setResult(result);
            setDisplay(result);
            setFormula(prev => {

                // this validation is for the case when the user press the = sign
                // and the last sing is a sing that not repeat one after another
                if (prev[prev.length - 1] === '/'
                    || prev[prev.length - 1] === '*'
                    || prev[prev.length - 1] === '+') {
                    return prev;
                }
                return prev + value + result;
            });
            setCounterOfSingsPressed(0);
            return;
        }

        if (value == 0 && display == 0) {
            return;
        }


        if (value === '.') {
            setDisplay(prev => {
                if (prev.toString().includes('.')) {
                    return prev;
                }
                return prev + '.';
            });
            setFormula(prev => {
                if (prev[prev.length - 1] === '.') {
                    return prev;
                }
                return prev + '.';
            });
                
            return;
        }

        const operation = operations[value];
        if (operation) {
            setCounterOfSingsPressed(prev => prev + 1);

            // this validation is for the case when the user press two sings in a row
            // it will replace the last sing with the new one
            // for example: 5*-+5 will be 5+5
            if (counterOfSingsPressed > 1 && value !== '-') {
                setDisplay(value);
                setFormula(prev => {
                    let newFormula =  prev.slice(0, -2) + value;
                    return newFormula;
                });
                setCounterOfSingsPressed(1);
                return;
            }

            // this validation is for the case when the user press the = sign and then
            // press a sing, it will make the operation with the result
            // and reset the result
            if (result) {
                setFormula(result + value);
                setDisplay(value);
                setResult('');
                return;
            }

            const singsThatNotRepeatOneAfterAnother = ['/', '*', '+'];

            setDisplay(value);
            setFormula(prev => {

                // this validation is for the case when the user press a sing
                // and the last sing is a sing that not repeat one after another
                // for example: 5*/5 will be 5*5
                if (singsThatNotRepeatOneAfterAnother.includes(prev[prev.length - 1])
                    && singsThatNotRepeatOneAfterAnother.includes(value)) {
                        console.log('here', prev);
                    return prev.slice(0, -1) + value
                }

                return prev + value;
            });
        } else {
            setCounterOfSingsPressed(0);
            // this validation is for the case when the user press the = sign and then
            // press a number, it will make the operation with the result
            if (result) {
                setFormula(value);
                setDisplay(value);
                setResult('');
                return;
            }
            setDisplay(prev => {
                if (prev == '0') {
                    return value;
                }
                return prev + value;
            });
            setFormula(prev => {
                if (prev == '0') {
                    return value;
                }
                return prev + value;
            });
        }
    }

    return { handleClick, formula, display, result };
}