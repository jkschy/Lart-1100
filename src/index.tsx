import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, NextUIProvider, Theme} from "@nextui-org/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
    type: "dark",
})


root.render(
    <NextUIProvider theme={darkTheme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </NextUIProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
