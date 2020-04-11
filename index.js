const fs = require("fs");
const recast = require("recast");

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
      retainLines: true,
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

recast.visit(ast, {
  visitImportDeclaration(path) {
    path.prune();
    return false;
  },

  visitFunctionDeclaration(path) {
    path.prune();
    return false;
  }
});

const printResult = recast.print(ast);
const output = printResult.code;

fs.mkdirSync("tmp", { recursive: true });
fs.writeFileSync("./tmp/output.jsx", output, "utf-8");
