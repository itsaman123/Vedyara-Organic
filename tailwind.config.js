/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#3E2F1C",
          "brown-light": "#5a4532",
          "brown-dark": "#2a1f12",
          gold: "#D4AF37",
          "gold-light": "#e8c84a",
          "gold-dark": "#b8961f",
          green: "#6B8E23",
          "green-light": "#7fa828",
          "green-dark": "#506a1a",
          cream: "#F8F5F0",
          "cream-dark": "#ede8e0",
          "cream-deep": "#e0d8cc",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": [
          "3.75rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "3rem",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        88: "22rem",
        100: "25rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "gold-sm": "0 4px 14px rgba(212,175,55,0.25)",
        "gold-md": "0 8px 25px rgba(212,175,55,0.35)",
        "gold-lg": "0 20px 60px rgba(212,175,55,0.30)",
        "brown-sm": "0 4px 14px rgba(62,47,28,0.15)",
        "brown-md": "0 8px 30px rgba(62,47,28,0.20)",
        "brown-lg": "0 20px 60px rgba(62,47,28,0.25)",
        card: "0 2px 20px rgba(62,47,28,0.08), 0 1px 4px rgba(62,47,28,0.06)",
        "card-hover":
          "0 20px 60px rgba(212,175,55,0.28), 0 8px 20px rgba(62,47,28,0.18)",
        "inner-gold": "inset 0 0 0 1px rgba(212,175,55,0.4)",
      },
      backgroundImage: {
        "gradient-gold":
          "linear-gradient(135deg, #D4AF37 0%, #e8c84a 50%, #D4AF37 100%)",
        "gradient-brown": "linear-gradient(135deg, #3E2F1C 0%, #5a4532 100%)",
        "gradient-hero":
          "linear-gradient(to bottom, rgba(30,20,10,0.65) 0%, rgba(30,20,10,0.40) 50%, rgba(30,20,10,0.70) 100%)",
        "gradient-card":
          "linear-gradient(to bottom, transparent 40%, rgba(30,20,10,0.9) 100%)",
        "gradient-cream": "linear-gradient(180deg, #F8F5F0 0%, #ede8e0 100%)",
        "gradient-section":
          "linear-gradient(135deg, #3E2F1C 0%, #2a1f12 40%, #1a1208 100%)",
        shimmer:
          "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 50%, transparent 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-gold": "pulseGold 2.5s ease-in-out infinite",
        "leaf-sway": "leafSway 5s ease-in-out infinite",
        "leaf-float": "leafFloat 12s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "grain-fall": "grainFall 10s linear infinite",
        "honey-drip": "honeyDrip 2.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
        "slide-left": "slideLeft 0.7s ease forwards",
        "slide-right": "slideRight 0.7s ease forwards",
        "scale-in": "scaleIn 0.5s ease forwards",
        counter: "counter 2s ease-out forwards",
        wave: "wave 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-14px) rotate(2deg)" },
          "66%": { transform: "translateY(-7px) rotate(-2deg)" },
        },
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.5)" },
          "50%": { boxShadow: "0 0 0 16px rgba(212,175,55,0)" },
        },
        leafSway: {
          "0%,100%": { transform: "rotate(-6deg) scale(1)" },
          "50%": { transform: "rotate(6deg) scale(1.03)" },
        },
        leafFloat: {
          "0%": {
            transform: "translateY(110vh) translateX(0) rotate(0deg)",
            opacity: "0",
          },
          "5%": { opacity: "0.7" },
          "50%": {
            transform: "translateY(50vh) translateX(30px) rotate(180deg)",
            opacity: "0.5",
          },
          "95%": { opacity: "0.3" },
          "100%": {
            transform: "translateY(-10vh) translateX(-20px) rotate(360deg)",
            opacity: "0",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        grainFall: {
          "0%": { transform: "translateY(-60px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.4" },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
        honeyDrip: {
          "0%,100%": { transform: "scaleY(0.3)", opacity: "0.6" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        bounceSoft: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.85)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        wave: {
          "0%,100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-15deg)" },
        },
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
        9999: "9999",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },
      aspectRatio: {
        product: "4 / 5",
        hero: "16 / 7",
      },
    },
  },
  plugins: [],
};
