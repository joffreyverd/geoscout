module.exports = {
    "extends": "airbnb",
    "globals": {
        "document": true,
        "window": true
    },
    "parser": "babel-eslint",
    "rules": {
        "camelcase": [
            "error",
            {
                "allow": [
                    "id_step",
                    "id_circuit",
                    "need_internet"
                ]
            }
        ],
        "class-methods-use-this": "off",
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "jsx-quotes": [
            "error",
            "prefer-single"
        ],
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/media-has-caption": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "no-nested-ternary": "off",
        "no-param-reassign": "off",
        "object-curly-newline": "off",
        "object-shorthand": "off",
        "operator-linebreak": "off",
        "padded-blocks": [
            "error",
            {
                "classes": "always"
            }
        ],
        "react/jsx-filename-extension": [
            {
                "extensions": [
                    ".js"
                ]
            }
        ],
        "react/jsx-indent": [
            4
        ],
        "react/jsx-indent-props": [
            4
        ],
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-wrap-multilines": "off",
        "react/prop-types": "off", // Temporary
        "react/sort-comp": "off"
    }
};
