"use client";

import { useEffect, useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(false);

  const inputNumber = (value: string) => {
    if (overwrite) {
      setDisplay(value);
      setOverwrite(false);
      return;
    }

    if (value === ".") {
      if (display.includes(".")) return;
      setDisplay(display + ".");
      return;
    }

    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setOverwrite(false);
  };

  const backspace = () => {
    if (overwrite) return;

    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const calculate = () => {
    if (previous === null || operator === null) return;

    const current = parseFloat(display);
    let result = current;

    switch (operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        result = current === 0 ? NaN : previous / current;
        break;
    }

    setDisplay(Number.isNaN(result) ? "Error" : String(result));
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  };

  const chooseOperator = (op: string) => {
    if (previous === null) {
      setPrevious(parseFloat(display));
    } else if (!overwrite) {
      calculate();
      setPrevious(parseFloat(display));
    }

    setOperator(op);
    setOverwrite(true);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isNaN(Number(e.key))) inputNumber(e.key);

      if (e.key === ".") inputNumber(".");
      if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
      if (e.key === "Enter" || e.key === "=") calculate();
      if (e.key === "Backspace") backspace();
      if (e.key === "Escape") clear();
      if (e.key === "%") percent();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const buttons = [
    ["AC", "+/-", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "⌫", "="],
  ];

  const click = (value: string) => {
    if (!isNaN(Number(value)) || value === ".") {
      inputNumber(value);
      return;
    }

    switch (value) {
      case "AC":
        clear();
        break;
      case "+/-":
        toggleSign();
        break;
      case "%":
        percent();
        break;
      case "⌫":
        backspace();
        break;
      case "=":
        calculate();
        break;
      default:
        chooseOperator(value);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl bg-zinc-900 p-4 shadow-xl">
      <div className="mb-4 flex h-24 items-end justify-end rounded-xl bg-black px-4 text-right text-5xl font-light text-white">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((button) => (
          <button
            key={button}
            onClick={() => click(button)}
            className={`h-16 rounded-xl text-xl font-semibold transition active:scale-95
              ${
                ["+", "-", "*", "/", "="].includes(button)
                  ? "bg-orange-500 text-white hover:bg-orange-400"
                  : button === "AC" || button === "+/-" || button === "%"
                  ? "bg-zinc-500 text-white hover:bg-zinc-400"
                  : "bg-zinc-700 text-white hover:bg-zinc-600"
              }`}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
}