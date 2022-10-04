import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";


if (typeof window.requestAnimationFrame !== 'function') window.requestAnimationFrame = (callback: FrameRequestCallback) => window.setTimeout(callback, 0);


const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);