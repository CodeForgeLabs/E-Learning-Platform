// Import setCookie from nookies
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // credentials to backend for verification
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        // Capture the JWT_token header
        const cookies = res.headers.get('set-cookie');
        const jwtTokenCookie = cookies && cookies.split('; ').find(cookie => cookie.startsWith('JWT_TOKEN='));
        const token = jwtTokenCookie && jwtTokenCookie.split('=')[1];
       

        // If no user or error, return null
        if (!res.ok || !user) {
          throw new Error(user?.message || user.err.email || "An error occurred");
        }
        

        // Return the user object with the token
        return { ...user, token };
      },
    }),
  ],

  pages: {
    error: "/login", // Optional: Redirect to custom error page
  },

  callbacks: {
    // Called whenever we check session from the frontend
    async session({ session, token }) {
      // Pass token data to session
      session.username = token.username;
      session.profilePicture = token.profilePicture;
      session.token = token.token; // Pass JWT token to session
      return session;
    },

    // If the user is logged in, the token will be passed to Next.js
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.profilePicture = user.profilePicture;
        token.token = user.token; // Store JWT token in token object
      }
      return token;
    },
  },
};
