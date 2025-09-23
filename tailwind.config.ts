import { delay } from "framer-motion";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      // padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          highlight: "hsla(var(--primary), .2)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          normal: "hsl(var(--text-color))",
          light: "hsl(var(--text-color-light))",
          dark: "hsl(var(--text-color-dark))",
        },
        title: {
          normal: "hsl(var(--title-color))",
        },
      },
      maxWidth: {
        custom: "calc(748px - 3rem)",
      },
      padding: {
        header: "var(--header-height)",
      },
      borderRadius: {
        lg: "var(--border-radius)",
        md: "calc(var(--border-radius) - 2px)",
        sm: "calc(var(--border-radius) - 4px)",
      },
      borderWidth: {
        // '1-25': '1.25px',
        "1": "1px",
      },
      height: {
        "header-height": "var(--header-height)",
        "page-minus-header": "calc(100vh - var(--header-height))",
      },
      width: {
        "full-plus": "calc(100% + 2rem)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        enter: {
          '0%': {
            opacity: '0',
            blur: '1px',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            blur: '0px',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'enter': 'enter 0.6s ease both',
      },
      transitionTimingFunction: {
        'in-quad': 'var(--ease-in-quad)',
        'in-cubic': 'var(--ease-in-cubic)',
        'in-quart': 'var(--ease-in-quart)',
        'in-quint': 'var(--ease-in-quint)',
        'in-expo': 'var(--ease-in-expo)',
        'in-circ': 'var(--ease-in-circ)',
        'out-quad': 'var(--ease-out-quad)',
        'out-cubic': 'var(--ease-out-cubic)',
        'out-quart': 'var(--ease-out-quart)',
        'out-quint': 'var(--ease-out-quint)',
        'out-expo': 'var(--ease-out-expo)',
        'out-circ': 'var(--ease-out-circ)',
        'in-out-quad': 'var(--ease-in-out-quad)',
        'in-out-cubic': 'var(--ease-in-out-cubic)',
        'in-out-quart': 'var(--ease-in-out-quart)',
        'in-out-quint': 'var(--ease-in-out-quint)',
        'in-out-expo': 'var(--ease-in-out-expo)',
        'in-out-circ': 'var(--ease-in-out-circ)',
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans"],
      },
      gridTemplateColumns: {
        "1-max": "1fr max-content",
        "2-max": "repeat(2, max-content)",
      },
      gridTemplateRows: {
        "1-max": "repeat(1, 1fr)",
      },
      boxShadow: {
        custom: "0 0 .25rem var(--shadow-color)",
        'custom-outline': `0px 0px 0px 1px hsla(var(--foreground),0.08)`,
        'custom-soft': `0px 0px 0px 1px hsla(var(--foreground),0.08),
                        0px 1px 2px -1px hsla(var(--foreground), 0.08),
                        0px 2px 4px 0px hsla(var(--foreground), 0.04)`,
        hover: "0 0 .5rem var(--shadow-color-intense)",
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      spacing: {
        "icon-small": "4",
      },
      typography: ({ theme }) => ({
        custom: {
          css: {
            "--tw-prose-body": "hsl(var(--text-color))",
            "--tw-prose-headings": "hsl(var(--title-color))",
            "--tw-prose-lead": theme("colors.pink[700]"),
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-bold": "hsl(var(--text-color))",
            "--tw-prose-counters": "hsl(var(--title-color))",
            "--tw-prose-bullets": "hsl(var(--title-color))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quotes": "hsl(var(--title-color))",
            "--tw-prose-quote-borders": "hsl(var(--primary))",
            "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": theme("colors.pink[900]"),
            "--tw-prose-pre-code": "hsl(var(--title-color))",
            "--tw-prose-pre-bg": "hsl(var(--card))",
            "--tw-prose-th-borders": theme("colors.pink[300]"),
            "--tw-prose-td-borders": theme("colors.pink[200]"),
            "--tw-prose-invert-body": theme("colors.pink[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[900]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
} satisfies Config;

// const defaultTheme = require("tailwindcss/defaultTheme");

// const colors = require("tailwindcss/colors");

// const {
//   default: flattenColorPalette,
// } = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  // let allColors = flattenColorPalette(theme("colors"));
  // let newVars = Object.fromEntries(
  //   Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  // );
  // addBase({
  //   ":root": newVars,
  // });
}

export default config;
