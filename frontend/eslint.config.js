import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
    pluginJs.configs.all,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            globals: globals.browser,
            sourceType: 'module',
        },
        plugins: {
            prettier,
        },
        rules: {
            'no-console': 'warn',
            'sort-keys': 'off',
            'sort-imports': 'off',
            'one-var': 'off',
            'no-ternary': 'off',
            'capitalized-comments': 'off',
        },
    },
];