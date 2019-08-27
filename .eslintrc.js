module.exports = {
    "extends": [
        "google",
        "prettier",
        "prettier/react",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:react/recommended",
    ],
    "plugins": [
        "prettier"
    ],
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },
    "parser": "babel-eslint",
    "settings": {
        "react": {
          "createClass": "createReactClass", // Regex for Component Factory to use,
                                             // default to "createReactClass"
          "pragma": "React",  // Pragma to use, default to "React"
          "version": "15.0", // React version, default to the latest React stable release
          "flowVersion": "0.53", // Flow version
        },
        "propWrapperFunctions": [ "forbidExtraProps" ], // The names of any functions used to wrap the
                                                       // propTypes object, e.g. `forbidExtraProps`.
                                                       // If this isn't set, any propTypes wrapped in
                                                       // a function will be skipped.
        "import/resolver": {
            "babel-module": {}
        }
    },
    "rules" : {
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                bracketSpacing: false,
                tabWidth: 4,
                trailingComma: 'es5',
                singleQuote: true,
            },
        ],
        'linebreak-style': 'off',
        // 'linebreak-style': ["error", "windows","unix"],
        "no-undef": "error",
        "valid-jsdoc" : "off",
        "require-jsdoc" : "off",
        "max-len": "off",
        "new-cap": "off"
    }
};
