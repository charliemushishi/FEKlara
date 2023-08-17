import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from "./routes/error-page";
import Viewport from './components/viewport';
import { EmoteProvider, useEmoteContext } from './EmoteContext';



const router = createBrowserRouter([
    
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />

  },
  {
    path:"viewport",
    element:<Viewport />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <EmoteProvider><RouterProvider router={router} /></EmoteProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
