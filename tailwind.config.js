module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  darkMode: 'class',
  theme: {
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
      borderRadius: {
        circle: '50%',
      },
      colors: {
        status: {
          DEFAULT: 'var(--status-color)',
          transparent: 'var(--status-color-transparent)',
        },
        strong: 'var(--text-strong)',
        primary: 'var(--color-primary)',
        surface: {
          DEFAULT: 'var(--surface)',
          alt: 'var(--surface-alt)',
        },
        regular: 'var(--text-regular)',
      },
    },
  },
  plugins: [],
}
