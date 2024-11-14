import type { Config } from "tailwindcss";
import daisyui from "daisyui"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        mobile: "0px",
        tablet: "540px",
        pc : "800px",   
      }
    },
  },
  plugins: [
    daisyui,
    
  ],
  daisyui: {
    themes: ["cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset" ,  {
      myblacktheme: {  // Custom dark/black theme
        primary: "#000000",        // Primary color (blue)
        secondary: "#8A2BE2",      // Secondary color (purple)
        accent: "#00FA9A",         // Accent color (pinkish)

        neutral: "#1a1a1a",        // Dark neutral for backgrounds
        "base-100": "#000000",     // Dark base background color (black)
        "base-200": "#1a1a1a",     // Slightly lighter dark background
        "base-300": "#2d2d2d",     // Lighter gray for borders/cards
        "info": "#3ABFF8",         // Info color (bright blue)
        "success": "#36D399",      // Success color (green)
        "warning": "#FBBD23",      // Warning color (yellow-orange)
        "error": "#F87272",        // Error color (red)
        "--rounded-btn": "0.5rem", // Button border radius
        "--animation-btn": "0.25s",// Button animation speed
        "--btn-text-case": "uppercase", // Text case for buttons
      },

      mywhitetheme: {  // Custom light/white theme
        primary: "#ffffff",        // Primary color (blue)
        secondary: "#6610f2",      // Secondary color (purple)
        accent: "#d63384",         // Accent color (pinkish)

        neutral: "#f3f4f6",        // Light neutral for backgrounds
        "base-100": "#ffffff",     // Light base background color (white)
        "base-200": "#f1f5f9",     // Slightly darker light background
        "base-300": "#e2e8f0",     // Light gray for borders/cards
        "info": "#3ABFF8",         // Info color (bright blue)
        "success": "#36D399",      // Success color (green)
        "warning": "#FBBD23",      // Warning color (yellow-orange)
        "error": "#F87272",        // Error color (red)
        "--rounded-btn": "0.5rem", // Button border radius
        "--animation-btn": "0.25s",// Button animation speed
        "--btn-text-case": "uppercase", // Text case for buttons
      }
 
    }
    ], // Add your theme
  },
};
export default config;
