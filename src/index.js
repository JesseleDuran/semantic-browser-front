import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import App from "./containers/App";
import store from "./store";
import { injectGlobal } from "styled-components";

injectGlobal`
  	button:focus {
    	background: none !important;
	}
`;
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
