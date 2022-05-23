module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: 0,
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '100rem',
      circle: '50%',
    },
    spacing: {
      1: '0.375rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '2rem',
      8: '2.5rem',
      9: '3rem',
      10: '3.5rem',
      11: '4rem',
      12: '4.5rem',
    },
    extend: {
      colors: {
        paid: {
          DEFAULT: 'hsl(160deg 67% 52%)',
          transparent: 'hsl(160deg 67% 52% / 6%)',
        },
        pending: {
          DEFAULT: 'hsl(34deg 100% 50%)',
          transparent: 'hsl(34deg 100% 50% / 6%)',
        },
        draft: {
          DEFAULT: 'hsl(231deg 20% 27%)',
          transparent: 'hsl(231deg 20% 27%/ 6%)',
          dark: {
            DEFAULT: 'hsl(231deg 75% 93%)',
            transparent: 'hsl(231deg 75% 93%/ 6%)',
          },
        },
      },
    },
  },
  plugins: [],
}
