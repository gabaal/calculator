"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        // For scientific calculations, we need to replace some functions
        let expression = display
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(")
          .replace(/sqrt\(/g, "Math.sqrt(")
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/\^/g, "**");

        // eslint-disable-next-line no-eval
        const calculatedResult = eval(expression);
        setResult(calculatedResult.toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setDisplay("");
      setResult("");
    } else if (value === "⌫") {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay(display + value);
    }
  };

  // Scientific functions and special buttons
  const scientificButtons = [
    { value: "sin(", className: "bg-blue-500" },
    { value: "cos(", className: "bg-blue-500" },
    { value: "tan(", className: "bg-blue-500" },
    { value: "log(", className: "bg-blue-500" },
    { value: "ln(", className: "bg-blue-500" },
    { value: "sqrt(", className: "bg-blue-500" },
    { value: "π", className: "bg-blue-500" },
    { value: "e", className: "bg-blue-500" },
    { value: "(", className: "bg-gray-500" },
    { value: ")", className: "bg-gray-500" },
  ];

  // Number buttons and decimal point
  const numberButtons = [
    { value: "7", className: "bg-gray-300" },
    { value: "8", className: "bg-gray-300" },
    { value: "9", className: "bg-gray-300" },
    { value: "4", className: "bg-gray-300" },
    { value: "5", className: "bg-gray-300" },
    { value: "6", className: "bg-gray-300" },
    { value: "1", className: "bg-gray-300" },
    { value: "2", className: "bg-gray-300" },
    { value: "3", className: "bg-gray-300" },
    { value: "0", className: "bg-gray-300 col-span-2" },
    { value: ".", className: "bg-gray-300" },
  ];

  // Operator buttons on the right
  const operatorButtons = [
    { value: "C", className: "bg-red-500" },
    { value: "⌫", className: "bg-red-500" },
    { value: "^", className: "bg-gray-500" },
    { value: "%", className: "bg-gray-500" },
    { value: "/", className: "bg-gray-500" },
    { value: "*", className: "bg-gray-500" },
    { value: "-", className: "bg-gray-500" },
    { value: "+", className: "bg-gray-500" },
    { value: "=", className: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Scientific Calculator
      </h1>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Display */}
        <div className="p-4 bg-gray-200 dark:bg-gray-700">
          <div className="h-12 mb-2 p-2 bg-white dark:bg-gray-600 rounded text-right overflow-x-auto whitespace-nowrap text-lg">
            {display || "0"}
          </div>
          <div className="h-10 p-2 bg-gray-100 dark:bg-gray-500 rounded text-right overflow-x-auto whitespace-nowrap font-bold text-xl">
            {result || "0"}
          </div>
        </div>

        {/* Scientific Functions */}
        <div className="grid grid-cols-5 gap-1 p-4 pt-2">
          {scientificButtons.map((button, index) => (
            <button
              key={`sci-${index}`}
              onClick={() => handleButtonClick(button.value)}
              className={`${button.className} text-white dark:text-gray-200 p-3 rounded-lg hover:opacity-80 transition-opacity font-medium text-lg focus:outline-none`}
            >
              {button.value}
            </button>
          ))}
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-4 gap-1 px-4 pb-4">
          {/* Numbers (3x4 grid) */}
          <div className="col-span-3 grid grid-cols-3 gap-1">
            {numberButtons.map((button, index) => (
              <button
                key={`num-${index}`}
                onClick={() => handleButtonClick(button.value)}
                className={`${button.className} ${
                  button.value === "0" ? "col-span-2" : ""
                } 
                  text-gray-800 dark:text-gray-200 p-3 rounded-lg hover:opacity-80 transition-opacity
                  font-medium text-lg focus:outline-none`}
              >
                {button.value}
              </button>
            ))}
          </div>

          {/* Operators (1x4 column) */}
          <div className="grid grid-cols-1 gap-1">
            {operatorButtons.map((button, index) => (
              <button
                key={`op-${index}`}
                onClick={() => handleButtonClick(button.value)}
                className={`${button.className} 
                  text-white dark:text-gray-200 p-3 rounded-lg hover:opacity-80 transition-opacity
                  font-medium text-lg focus:outline-none`}
              >
                {button.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Scientific Calculator © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
