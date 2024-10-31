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
        tablet: "440px",
        pc : "800px",   
      }
    },
  },
  plugins: [
    daisyui,
    
  ],
  daisyui: {
    themes: ['dark' ,  'retro', 'cyberpunk', 'valentine', 'aqua' ,  {
      myblacktheme: {  // Custom dark/black theme
        primary: "#0d6efd",        // Primary color (blue)
        secondary: "#6610f2",      // Secondary color (purple)
        accent: "#d63384",         // Accent color (pinkish)
        neutral: "#111827",        // Dark neutral for backgrounds
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
      } 
    }
    ], // Add your theme
  },
};
export default config;
