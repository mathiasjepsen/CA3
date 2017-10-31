import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { HashRouter,BrowserRouter} from "react-router-dom"
import App from "./pages/App"
import App2 from "./pages/App2"


ReactDOM.render((
  <HashRouter>
    <App2/>
  </HashRouter>
), document.getElementById('root'))