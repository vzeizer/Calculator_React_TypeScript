import React, { useState, useEffect, useRef } from 'react';
import Button from './components/Button';
import Display from './components/Display';

function App() {
  const [input, setInput] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]); // Novo estado para o histórico

  const historyRef = useRef<HTMLDivElement>(null); // Ref para scrollar o histórico

  // Efeito para scrollar o histórico para o final quando uma nova entrada é adicionada
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setInput('0');
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      setHistory([]); // Limpa o histórico também
      return;
    }

    if (value === 'DEL') {
      setInput(prevInput => prevInput.slice(0, -1) || '0');
      return;
    }

    // Funções avançadas
    if (['sqrt', 'log', 'ln', 'x^2', 'sin', 'cos', 'tan', 'pi', 'e'].includes(value)) {
      let result: string | null = null;
      let operation = '';

      try {
        const num = parseFloat(input);
        switch (value) {
          case 'sqrt':
            if (num < 0) { throw new Error('Número negativo'); }
            result = Math.sqrt(num).toString();
            operation = `sqrt(${input})`;
            break;
          case 'log':
            if (num <= 0) { throw new Error('Número <= 0'); }
            result = Math.log10(num).toString();
            operation = `log(${input})`;
            break;
          case 'ln':
            if (num <= 0) { throw new Error('Número <= 0'); }
            result = Math.log(num).toString();
            operation = `ln(${input})`;
            break;
          case 'x^2':
            result = Math.pow(num, 2).toString();
            operation = `${input}^2`;
            break;
          case 'sin':
            result = Math.sin(num * Math.PI / 180).toString();
            operation = `sin(${input}°)`;
            break;
          case 'cos':
            result = Math.cos(num * Math.PI / 180).toString();
            operation = `cos(${input}°)`;
            break;
          case 'tan':
            result = Math.tan(num * Math.PI / 180).toString();
            operation = `tan(${input}°)`;
            break;
          case 'pi':
            result = Math.PI.toString();
            operation = `π`;
            break;
          case 'e':
            result = Math.E.toString();
            operation = `e`;
            break;
          default:
            break;
        }
        setInput(result || 'Error');
        setHistory(prevHistory => [...prevHistory, `${operation} = ${result}`]);
      } catch (e: any) {
        setInput('Error');
        setHistory(prevHistory => [...prevHistory, `${operation} = Error: ${e.message}`]);
      }
      setWaitingForOperand(true);
      return;
    }

    // Operadores básicos e x^y
    if (['+', '-', '*', '/', 'x^y'].includes(value)) {
      if (operator && !waitingForOperand) {
        try {
          let currentResult;
          if (operator === 'x^y') {
            currentResult = Math.pow(parseFloat(previousValue!), parseFloat(input)).toString();
          } else {
            currentResult = eval(`${previousValue}${operator}${input}`).toString();
          }
          setHistory(prevHistory => [...prevHistory, `${previousValue} ${operator === 'x^y' ? '^' : operator} ${input} = ${currentResult}`]);
          setInput(currentResult);
          setPreviousValue(currentResult);
        } catch (e) {
          setInput('Error');
          setHistory(prevHistory => [...prevHistory, `${previousValue} ${operator === 'x^y' ? '^' : operator} ${input} = Error`]);
        }
      } else {
        setPreviousValue(input);
      }
      setOperator(value);
      setWaitingForOperand(true);
      return;
    }

    if (value === '=') {
      if (operator && previousValue !== null) {
        try {
          let result;
          let operationString = '';
          if (operator === 'x^y') {
            result = Math.pow(parseFloat(previousValue), parseFloat(input)).toString();
            operationString = `${previousValue} ^ ${input}`;
          } else {
            result = eval(`${previousValue}${operator}${input}`).toString();
            operationString = `${previousValue} ${operator} ${input}`;
          }
          setInput(result);
          setHistory(prevHistory => [...prevHistory, `${operationString} = ${result}`]); // Adiciona ao histórico
          setPreviousValue(null);
          setOperator(null);
          setWaitingForOperand(false);
        } catch (e) {
          setInput('Error');
          setHistory(prevHistory => [...prevHistory, `${previousValue} ${operator === 'x^y' ? '^' : operator} ${input} = Error`]);
        }
      }
      return;
    }

    if (value === '.') {
      if (waitingForOperand) { // Se estava esperando operando, um novo '.' inicia '0.'
        setInput('0.');
        setWaitingForOperand(false);
      } else if (!input.includes('.')) {
        setInput(prevInput => prevInput + '.');
      }
      return;
    }

    // Números
    if (waitingForOperand) {
      setInput(value);
      setWaitingForOperand(false);
    } else {
      setInput(prevInput => (prevInput === '0' ? value : prevInput + value));
    }
  };

const advancedBtnClasses = "bg-blue-800 hover:bg-blue-700 text-white text-lg font-bold border border-black-600";
const opBtnClasses = "font-bold bg-blue-800 hover:bg-blue-700 text-black font-bold border border-black-600";
const clearBtnClasses = "bg-blue-700 hover:bg-blue-600 text-black font-bold border border-yellow-600";
const equalsBtnClasses = "bg-green-600 hover:bg-green-500 text-black font-bold border border-black-600 col-span-2";
const numBtnClasses = "bg-blue-800 hover:bg-blue-700 text-white font-bold border border-black-600";

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-500 flex items-center justify-center p-4">
      <div className="flex w-full max-w-6xl gap-4">
        {/* Calculadora - 65% width */}
        <div className="bg-blue-800 p-6 rounded-2xl shadow-2xl border border-black-600" style={{ width: '65%' }}>
          <Display value={input} />

          <div className="grid grid-cols-5 gap-3">
            {/* Row 1: Clear and basic operations */}
            <Button label="C" onClick={handleButtonClick} className={`${clearBtnClasses} col-span-2`} />
            <Button label="DEL" onClick={handleButtonClick} className={opBtnClasses} />
            <Button label="sqrt" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="/" onClick={handleButtonClick} className={opBtnClasses} />

            {/* Row 2: Advanced functions and numbers */}
            <Button label="log" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="ln" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="7" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="8" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="9" onClick={handleButtonClick} className={numBtnClasses} />

            {/* Row 3: Trigonometric functions and numbers */}
            <Button label="sin" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="cos" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="4" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="5" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="6" onClick={handleButtonClick} className={numBtnClasses} />

            {/* Row 4: More functions and numbers */}
            <Button label="tan" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="x^2" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="1" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="2" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="3" onClick={handleButtonClick} className={numBtnClasses} />

            {/* Row 5: Power function and bottom row */}
            <Button label="x^y" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="pi" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="e" onClick={handleButtonClick} className={advancedBtnClasses} />
            <Button label="0" onClick={handleButtonClick} className={numBtnClasses} />
            <Button label="." onClick={handleButtonClick} className={numBtnClasses} />

            {/* Row 6: Operations */}
            <Button label="*" onClick={handleButtonClick} className={opBtnClasses} />
            <Button label="-" onClick={handleButtonClick} className={opBtnClasses} />
            <Button label="+" onClick={handleButtonClick} className={opBtnClasses} />
            <Button label="=" onClick={handleButtonClick} className={`${equalsBtnClasses} col-span-2`} />
          </div>
        </div>

        {/* Histórico - 35% width */}
        <div className="bg-red-800 p-6 rounded-2xl shadow-2xl border border-blue-600 h-96 flex flex-col" style={{ width: '35%' }}>
          <h2 className="text-black font-bold text-2xl font-semibold mb-4 border-b border-blue-400 pb-2">Histórico</h2>
          <div ref={historyRef} className="flex-grow overflow-y-auto text-white text-right text-lg pr-2 custom-scrollbar">
            {history.length === 0 ? (
              <p className="text-black font-bold text-center mt-8">Nenhuma operação ainda.</p>
            ) : (
              history.map((entry, index) => (
                <p key={index} className="mb-2 break-all">{entry}</p>
              ))
            )}
          </div>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="mt-4 p-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm font-bold"
            >
              Limpar Histórico
            </button>
          )}
        </div>
      </div>
    </div>  );
}

export default App;