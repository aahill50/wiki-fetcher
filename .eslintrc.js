module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'next/core-web-vitals',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:testing-library/react',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['jest', 'testing-library'],
    rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
    },
};
