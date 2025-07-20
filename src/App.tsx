import React, { useState, useEffect, useRef } from 'react';
import Button from './components/Button';
import Display from './components/Display';

function App() {
  // Estados para o cálculo
  // Estado para o valor de entrada
  // Estado para o valor anterior
  // Estado para o operador atual
  // Estado para saber se está esperando um novo operando
  // Estado para o histórico de operações
  const [input, setInput] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]); // Novo estado para o histórico

  // Ref para o histórico para scroll automático
  // useRef para manter a referência do histórico e permitir scroll automático
  // useEffect para scroll automático quando o histórico é atualizado
  // useEffect para atualizar o scroll do histórico quando uma nova entrada é adicionada
  // Limpa o histórico quando o botão C é pressionado
  const historyRef = useRef<HTMLDivElement>(null); // Ref para scrollar o histórico

  // Efeito para scrollar o histórico para o final quando uma nova entrada é adicionada
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleButtonClick = (value: string) => {
    // Se o valor for 'C', limpa o input, o operador e o histórico
    if (value === 'C') {
      setInput('0');
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      setHistory([]); // Limpa o histórico também
      return;
    }

    // Se o valor for 'DEL', remove o último caractere do input
    // Se o input for '0', não faz nada
    // Se o input for vazio, define como '0'
    // Se o input for '0', remove o '0' e adiciona o valor
    if (value === 'DEL') {
      setInput(prevInput => prevInput.slice(0, -1) || '0');
      return;
    }

    // Funções avançadas
    // Se o valor for uma função avançada, executa a operação correspondente
    if (['sqrt', 'log', 'ln', 'x^2', 'sin', 'cos', 'tan', 'pi', 'e'].includes(value)) {
      let result: string | null = null;
      let operation = '';

      // try catch para lidar com erros de cálculo
      // Calcula o resultado da função avançada e atualiza o input e o histórico
      // Se ocorrer um erro, define o input como 'Error' e adiciona ao histórico
      try {
        const num = parseFloat(input);
        switch (value) {
          // Funções avançadas
          // sqrt, log, ln, x^2, sin, cos, tan, pi, e
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
            // Calcula o quadrado do número
            result = Math.pow(num, 2).toString();
            operation = `${input}^2`;
            break;
          case 'sin':
            // Converte o ângulo de graus para radianos antes de calcular
            result = Math.sin(num * Math.PI / 180).toString();
            operation = `sin(${input}°)`;
            break;
          case 'cos':
            // Converte o ângulo de graus para radianos antes de calcular
            result = Math.cos(num * Math.PI / 180).toString();
            operation = `cos(${input}°)`;
            break;
          case 'tan':
            // Converte o ângulo de graus para radianos antes de calcular
            result = Math.tan(num * Math.PI / 180).toString();
            operation = `tan(${input}°)`;
            break;
          case 'pi':
            // Define o valor de pi
            result = Math.PI.toString();
            operation = `π`;
            break;
          case 'e':
            // Define o valor de e, número de Euler
            result = Math.E.toString();
            operation = `e`;
            break;
          default:
            break;
        }
        // Atualiza o input com o resultado da função avançada
        // Adiciona a operação ao histórico
        // Se o resultado for null, define como 'Error'
        setInput(result || 'Error');
        // Adiciona a operação ao histórico
        setHistory(prevHistory => [...prevHistory, `${operation} = ${result}`]);
      } catch (e: any) {
        // Se ocorrer um erro, define o input como 'Error' e adiciona ao histórico
        setInput('Error');
        setHistory(prevHistory => [...prevHistory, `${operation} = Error: ${e.message}`]);
      }
      // Se estava esperando um operando, define como true
      // Isso evita que o usuário insira outro número imediatamente após uma função avançada
      setWaitingForOperand(true);
      return;
    }

    // Operadores básicos e x^y
    // Se o valor for um operador, executa a operação correspondente
    // Se o operador já estiver definido e não estiver esperando um novo operando, calcula o resultado
    // Se o operador for x^y, calcula a potência
    // Se o operador for igual, calcula o resultado da operação atual
    // Se o operador for '.', adiciona um ponto decimal ao input
    // Se estava esperando um operando, define o input como '0.' e espera por um novo número
    // Se não estava esperando um operando, adiciona o valor ao input
    // Se o valor for um número, adiciona ao input ou substitui o '0' inicial
    // Se o input for '0', substitui pelo número pressionado
    // Se o input já tiver um ponto decimal, não adiciona outro
    if (['+', '-', '*', '/', 'x^y'].includes(value)) {
      if (operator && !waitingForOperand) {
        try {
          // Se já houver um operador e não estiver esperando um novo operando, calcula o resultado
          // Se o operador for x^y, calcula a potência
          let currentResult;
          if (operator === 'x^y') {
            currentResult = Math.pow(parseFloat(previousValue!), parseFloat(input)).toString();
          } else {
            currentResult = eval(`${previousValue}${operator}${input}`).toString();
          }
          // Atualiza o input com o resultado
          // Adiciona a operação ao histórico
          // Atualiza o valor anterior com o resultado atual
          // Define o operador atual como o novo operador
          // Define que está esperando um novo operando
          setHistory(prevHistory => [...prevHistory, `${previousValue} ${operator === 'x^y' ? '^' : operator} ${input} = ${currentResult}`]);
          setInput(currentResult);
          setPreviousValue(currentResult);
        } catch (e) {
          // Se ocorrer um erro, define o input como 'Error' e adiciona ao histórico
          setInput('Error');
          setHistory(prevHistory => [...prevHistory, `${previousValue} ${operator === 'x^y' ? '^' : operator} ${input} = Error`]);
        }
      } else {
        setPreviousValue(input);
      }
      // Define o operador atual e indica que está esperando um novo operando
      // Isso evita que o usuário insira outro número imediatamente após um operador
      // Isso também permite que o usuário insira uma operação como x^y
      setOperator(value);
      // Se o operador for x^y, define que está esperando um novo operando
      setWaitingForOperand(true);
      return;
    }
    // Se o valor for '=', calcula o resultado da operação atual
    if (value === '=') {
      // Se já houver um operador e um valor anterior, calcula o resultado
      if (operator && previousValue !== null) {
        try {
          let result;
          let operationString = '';
          // Se o operador for x^y, calcula a potência
          if (operator === 'x^y') {
            // Calcula a potência e atualiza o input e o histórico
            result = Math.pow(parseFloat(previousValue), parseFloat(input)).toString();
            operationString = `${previousValue} ^ ${input}`;
          } else {
            // Calcula o resultado da operação atual e atualiza o input e o histórico
            result = eval(`${previousValue}${operator}${input}`).toString();
            operationString = `${previousValue} ${operator} ${input}`;
          }
          // Atualiza o input com o resultado
          setInput(result);
          // Adiciona a operação ao histórico
          setHistory(prevHistory => [...prevHistory, `${operationString} = ${result}`]); // Adiciona ao histórico

          setInput("0"); // Reseta o input para '0' após calcular

          // Reseta o valor anterior e o operador
          setPreviousValue(null);
          // Reseta o operador e indica que não está esperando um novo operando
          // Isso permite que o usuário comece uma nova operação imediatamente após pressionar '='
          setOperator(null);
          // Define que não está esperando um novo operando
          // Isso permite que o usuário insira um novo número imediatamente após pressionar '='
          setWaitingForOperand(false);
        } catch (e) {
          // Se ocorrer um erro, define o input como 'Error' e adiciona ao histórico
          // Isso pode acontecer se a operação for inválida, como divisão por zero
          // ou se o input não for um número válido
          setInput('Error');
          setHistory(prevHistory => [...prevHistory, `${previousValue} ${operator === 'x^y' ? '^' : operator} ${input} = Error`]);
        }
      }
      return;
    }

    // Se o valor for '.', adiciona um ponto decimal ao input
    // Se estava esperando um novo operando, inicia o input com '0.'
    if (value === '.') {
      if (waitingForOperand) { // Se estava esperando operando, um novo '.' inicia '0.'
        // Inicia o input com '0.' e define que não está esperando um novo operando
        setInput('0.');
        setWaitingForOperand(false);
      } else if (!input.includes('.')) {
        setInput(prevInput => prevInput + '.');
      }
      return;
    }

    // Números
    if (waitingForOperand) {
      // Se estava esperando um novo operando, substitui o input pelo número pressionado
      // Isso evita que o usuário insira outro número imediatamente após um operador
      // Define o input como o número pressionado e indica que não está esperando um novo operando
      setInput(value);
      setWaitingForOperand(false);
    } else {
      // Se não estava esperando um novo operando, adiciona o número pressionado ao input
      // Se o input for '0', substitui pelo número pressionado
      // Se o input já tiver um ponto decimal, não adiciona outro
      // Isso permite que o usuário construa números maiores, como '12', '123', etc.
      // Se o input for '0', substitui pelo número pressionado
      // Se o input já tiver um ponto decimal, não adiciona outro
      setInput(prevInput => (prevInput === '0' ? value : prevInput + value));
    }
  };

  // Classes para os botões
  // Define as classes para os botões de funções avançadas, operações, limpar, igual, números
  // Essas classes são usadas para estilizar os botões com Tailwind CSS
  // As classes incluem cores, tamanhos, fontes e bordas
  // As classes são aplicadas aos botões para dar uma aparência consistente e responsiva
  // As classes são definidas como constantes para facilitar a reutilização
  /*
  
  
      Detailed Breakdown of Each Class Set
    1. Advanced Functions Buttons (advancedBtnClasses)
    Background: bg-blue-800 (dark blue) → hover:bg-blue-700 (slightly lighter blue on hover)
    Text: text-white (white text) + text-lg (large text size) + font-bold (bold weight)
    Border: border border-black-600 (dark gray border)
    Usage: Scientific functions like sqrt, log, sin, cos, etc.
    
    2. Operation Buttons (opBtnClasses)
    Background: Same blue scheme as advanced buttons
    Text: text-black font-bold (black text, bold - note: font-bold is duplicated)
    Border: Same dark gray border
    Usage: Basic operators (+, -, *, /, DEL)
    
    3. Clear Button (clearBtnClasses)
    Background: Slightly lighter blue (bg-blue-700 → hover:bg-blue-600)
    Text: text-black font-bold (black text, bold)
    Border: border-yellow-600 (yellow border for distinction)
    Usage: Clear (C) button
    
    4. Equals Button (equalsBtnClasses)
    Background: Green scheme (bg-green-600 → hover:bg-green-500)
    Text: text-black font-bold (black text, bold)
    Border: Dark gray border
    Layout: col-span-2 (spans 2 columns in the grid)
    Usage: Equals (=) button
    
    5. Number Buttons (numBtnClasses)
    Background: Same blue scheme as advanced/operation buttons
    Text: text-white font-bold (white text, bold)
    Border: Dark gray border
    Usage: Numeric buttons (0-9, .)
    Design Consistency Issues
    Duplicated font-bold in opBtnClasses
    Inconsistent text colors: Some buttons use text-white, others text-black
    Border color inconsistency: Most use border-black-600, but clear button uses border-yellow-600
    Color Scheme Strategy
    Primary Color: Blue variants (blue-600, blue-700, blue-800)
    Accent Colors: Green for equals, yellow border for clear
    Text Strategy: White text on darker backgrounds, black text on lighter backgrounds
    Hover Effects: Consistently lighter shades on hover for better UX

  
  
  */
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