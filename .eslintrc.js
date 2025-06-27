// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "babel", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/recommended",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    "no-multiple-empty-lines": [
      2,
      {
        max: 2, // Или настройка на максимум допустимых пустых строк, если нужно ограничение
      },
    ],
    "react/prop-types": "off",
    // Import rules
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "unknown",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@app/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "(!@app/**)",
            group: "unknown",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "no-restricted-imports": "off",
    "import/newline-after-import": ["error"],
    "import/no-duplicates": ["error"],
    // Rule for enforcing `import type` for type-only imports in TypeScript
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    // Object formatting rules
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
      },
    ],
    "object-property-newline": ["error"],
    // React rules
    "react-hooks/rules-of-hooks": ["error"],
    "react-hooks/exhaustive-deps": ["warn"],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
      },
    ],
    "react/display-name": ["error"],
    "react/jsx-no-bind": ["warn"],
    "react/jsx-key": ["warn"],
    "react/jsx-boolean-value": ["warn"],
    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-empty-function": ["warn"],
    "@typescript-eslint/ban-ts-comment": ["error"],
    // Accessibility rules
    "jsx-a11y/click-events-have-key-events": ["warn"],
    "jsx-a11y/no-noninteractive-element-interactions": ["warn"],
    "jsx-a11y/label-has-associated-control": ["warn"],
    "jsx-a11y/alt-text": ["warn"],
    "jsx-a11y/anchor-is-valid": ["warn"],
    // Other rules
    "newline-before-return": ["error"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error"],
      },
    ],
    "no-useless-rename": ["error"],
    "object-shorthand": ["error"],
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
  },
  settings: {
    react: {
      version: "19.0.0",
    },
    "import/ignore": ["styled-components"],
    "import/resolver": {
      alias: {
        map: [
          ["@app/components", "./src/components"],
          ["@app/common/types", "./src/common/types"],
          ["@app/common/grid", "./src/common/grid"],
          ["@app/common", "./src/common"],
          ["@app/tokens", "./src/common/tokens"],
          ["@app/utils", "./src/utils"],
          ["@app/assets", "./src/assets"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Add all file extensions used in your project
      },
      // Uncomment this if you use TypeScript paths/aliases
      typescript: {
        alwaysTryTypes: true, // Try to resolve `@types` packages
        project: "./tsconfig.json",
      },
    },
  },
};
