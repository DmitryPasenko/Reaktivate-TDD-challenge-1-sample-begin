module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 2020, sourceType: "module"},
  ignorePatterns: ["node_modules/*", ".out/*", "!.prettierrc.js"],
  extends: ["eslint:recommended"],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: {
        react: { version: "detect" },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "react/prop-types": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "error",

        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/click-events-have-key-events": "error",
        "jsx-a11y/no-static-element-interactions": "error",
        "jsx-a11y/media-has-caption": "off",

        // Why would you want unused vars?
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],

        // I suggest this setting for requiring return types on functions only where useful
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        "@typescript-eslint/explicit-module-boundary-types": "error",

        "prettier/prettier": ["error", {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
        "no-underscore-dangle": "error",
      },
    },
  ],
};
