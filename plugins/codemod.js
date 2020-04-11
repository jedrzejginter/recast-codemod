// remove all import declarations
module.exports = function() {
  return {
    visitor: {
      ImportDeclaration(path) {
        path.remove();
      },
    },
  }
}
