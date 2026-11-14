/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171717',
        graphite: '#303030',
        paper: '#F5F3EF',
        surface: '#FFFFFF',
        accent: '#B69A70',
        // Darker accent for small text on light backgrounds (meets WCAG AA).
        'accent-deep': '#7E6540',
        muted: '#858585',
        // Darker muted tone for readable small body copy on light backgrounds.
        'muted-strong': '#666666',
        line: '#E5E1DA',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: { technical: '0.18em' },
      maxWidth: { page: '1440px' },
    },
  },
  plugins: [],
};
