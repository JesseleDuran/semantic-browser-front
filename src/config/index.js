const config = {
	API: {
		URL: process.env.REACT_APP_API_URL || ""
	},
	logout: `https://semantic-browser.auth0.com/v2/logout?client_id=C2kmslHwrHebteXe69aXAxjvFpN3ThSv&returnTo=`,
	auth: {
		auth0: {
			domain: "semantic-browser.auth0.com",
			clientID: "C2kmslHwrHebteXe69aXAxjvFpN3ThSv",
			redirectUri: "http://localhost:3000/callback",
			audience: "https://semantic-browser.auth0.com/api/v2/",
			provider: process.env.REACT_APP_AUTH0_PROVIDER
		}
	}
};

export default config;
