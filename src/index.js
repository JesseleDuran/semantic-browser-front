import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { injectGlobal, ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";
import App from "./containers/App";
import theme from "./theme";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

injectGlobal`

  .side-nav.fixed {
    top:30px;
  }

  .side-nav a {
    height: 60px;
    line-height: 60px;
  }

  .side-nav li>a>i, .side-nav li>a>[class^="mdi-"], .side-nav li>a>[class*="mdi-"], .side-nav li>a>i.material-icons {
    height: 60px;
    line-height: 60px;
  }

  label {
    color: black;
  }
  
  td, th {
    padding: 15px 5px 15px 20px; 
  }

  .modal{
    max-height: 95%;
  }

  .modal .modal-content {
    padding: 0;
  }

  .pagination
  {
    margin: 0;
  }

  input:not([type]), input[type=text], input[type=password], input[type=email], input[type=url], input[type=time], input[type=date], input[type=datetime], input[type=datetime-local], input[type=tel], input[type=number], input[type=search], textarea.materialize-textarea {
    margin:0;
    padding: 6px 0 7px;
    height: auto;
}

`;

render(
	<Provider store={store}>
			<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
