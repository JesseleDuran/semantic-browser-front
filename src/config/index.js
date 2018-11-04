const config = {
	API: {
		URL:
			process.env.REACT_APP_API_URL || ""
	},
	auth: {
		auth0: {
			domain: process.env.REACT_APP_AUTH0_DOMAIN || "mota.auth0.com",
			clientID:
				process.env.REACT_APP_AUTH0_CLIENT_ID ||
				"h5OSFtB6Slm9QB55pTjMt5EYGkOaOP_h",
			redirectUri:
				process.env.REACT_APP_AUTH0_REDIRECT_URI ||
				"http://localhost:3000/callback",
			audience: process.env.REACT_APP_AUTH0_AUDIENCE,
			provider: process.env.REACT_APP_AUTH0_PROVIDER
		}
	}
};

export default config;
