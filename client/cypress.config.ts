import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl:'http://localhost:8080',
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
    },

    env: {
        auth0_domain: "dev-g4y2r5dknwja6vmn.us.auth0.com",
        auth0_client_id: "lBcslrA0ORiR01tbzvT39N3mVItYqbsZ",
        auth0_callback_url: "http://localhost:8080/callback",
        auth0_audience: "https://audiophile-api/",
        auth0_username: "test@example.com",
        auth0_password: "Password!",
        auth0_client_secret:
            "e5-nVEDs0GDbcpeTMlLzHPSODqelMTiUvrF6GFbkapftpm6AVWvEeCTgGOhedzzm",
    },
    viewportWidth:1920,
    viewportHeight:1080,
});
