module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          "modules": false,
          "useBuiltIns": "usage",
          "corejs": 3,
          targets: {
            node: "current"
          }
        }
      ]
    ],
    plugins: [
      "@babel/plugin-transform-modules-commonjs"
    ]
  };
  