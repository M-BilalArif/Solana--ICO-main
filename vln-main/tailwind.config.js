/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F43E32',
                secondary: '#FEDB63',
            }
        },
        container: {
            center: true,
            padding: '12px'
        },
        screens: {
            'xs': '390px',
            'sm': '414px',
            'md': '768px',
            'lg': '992px',
            'xl': '1280px',
            '2xl': '1224px',
        },
        fontFamily: {
            indie: `'Indie Flower',serif`,
            Gliker: `Gliker`,
            Pragati: `Pragati`,
            GlikerBlackSemiExpanded: `Gliker Black Semi Expanded`,
        },
    },
    darkMode: "class",
    plugins: [],
}