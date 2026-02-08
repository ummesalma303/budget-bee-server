import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import perfectionist from 'eslint-plugin-perfectionist'
import vitest from '@vitest/eslint-plugin'

export default tseslint.config(
    {
        ignores: ['dist/**', 'node_modules/**', '*.js']
    },

    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    perfectionist.configs['recommended-natural'],
    {
        files: ['**/*.{test,spec}.ts'],
        plugins: { vitest },
        rules: {
            ...vitest.configs.recommended.rules,
            '@typescript-eslint/unbound-method': 'off'
        }
    }
)
