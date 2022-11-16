import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {toast, ToastContainer, TypeOptions} from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const showToast = (message: string, type?: TypeOptions) => {
    toast(message, {type: type, theme: "dark"})
}


const ToastContext = createContext(showToast);

const darkTheme = createTheme({
    type: "dark",
})

root.render(
    <ToastContext.Provider value={showToast}>
        <NextUIProvider theme={darkTheme}>
            <App />
            <ToastContainer/>
        </NextUIProvider>
    </ToastContext.Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {ToastContext}
