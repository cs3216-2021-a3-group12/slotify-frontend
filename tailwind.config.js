module.exports = {
    important: true,
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            primary: "#5669FF",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
