import { vi } from "vitest";

export const useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: true,
    isLoading: false,
    user: {
        email: "test@example.com",
        sub: "auth0|1234567890",
        name: "Test User",
        picture: "https://example.com/picture.jpg",
    },
});