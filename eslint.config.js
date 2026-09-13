import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    {
        ignores: ["node_modules", "dist", "build"]
    },
    eslintPluginPrettierRecommended
];
