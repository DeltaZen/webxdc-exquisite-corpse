import React from "react";
import { createRoot } from "react-dom/client";

import "./input.css";

const App = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="mt-8 text-xl font-bold text-red-600">Hello World</h1>
      <p>Made using React + Tailwind CSS</p>
      <p className="mt-auto mb-4">&copy;{year} Massick</p>
    </div>
  );
};

const domContainer = document.getElementById("react-code");
//ReactDOM.render(React.createElement(App), domContainer);
const root = createRoot(domContainer); // createRoot(container!) if you use TypeScript
root.render(<App />);
