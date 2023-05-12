export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	firebase: {
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	},
	stripe: {
		apiKey: process.env.STRIPE_KEY,
		stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
	},
	mongodb: {
		url: process.env.MONGODB_URL,
	},
	nodeEnv: process.env.NODE_ENV === "development",
});
