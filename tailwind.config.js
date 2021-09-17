module.exports = {
    important: true,
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                behind: "0px 5px 20px 0px rgba(0,0,0,0.1)",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
