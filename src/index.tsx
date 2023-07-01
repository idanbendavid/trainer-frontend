import './index.css';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/common/layout/layout';
import React from 'react';
import workoutImage from "../../../../public/anastase-maragos-YVz1LxVJqoA-unsplash.jpg";


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store} >
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
