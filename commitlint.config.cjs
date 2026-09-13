module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'test',
                'chore',
                'perf',
                'build',
                'ci',
            ],
        ],
        'header-max-length': [2, 'always', 100],
    },
    ignores: [
        (message) => message.startsWith('Merge '),
        (message) => message.startsWith('Revert '),
    ],
};