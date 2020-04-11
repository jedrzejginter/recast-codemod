const fs = require("fs");
const recast = require("recast");
const babel = require("@babel/core");

const code = fs.readFileSync("./data/input.jsx", "utf-8");

const ast = recast.parse(code, {
  parser: {
    parse: (code) => require("@babel/parser").parse(code, {
      sourceType: "module",
      strictMode: false,
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      startLine: 1,
      tokens: true,
      plugins: [
        "asyncGenerators",
        "bigInt",
        "classPrivateMethods",
        "classPrivateProperties",
        "classProperties",
        "decorators-legacy",
        "doExpressions",
        "dynamicImport",
        "exportDefaultFrom",
        "exportExtensions",
        "exportNamespaceFrom",
        "functionBind",
        "functionSent",
        "importMeta",
        "nullishCoalescingOperator",
        "numericSeparator",
        "objectRestSpread",
        "optionalCatchBinding",
        "optionalChaining",
        ["pipelineOperator", { proposal: "minimal" }],
        "throwExpressions",

        "jsx",
        "typescript",
      ]
    })
  }
});


const result = babel.transformFromAstSync(ast, code, {
  ast: true,
  plugins: ["./plugins/codemod"],
});

const printResult = recast.print(result.ast);
const output = printResult.code;

fs.mkdirSync("tmp", { recursive: true });
fs.writeFileSync("./tmp/output.jsx", output);
