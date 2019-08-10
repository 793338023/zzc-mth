const path = require("path");

const cwd = process.cwd();
const curPath = __dirname;

function resolve(moduleName) {
  return require.resolve(moduleName);
}

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath);
}

function getCurrPath(...filePath) {
  return path.join(curPath, "../", ...filePath);
}

function injection(content, title, injectDir) {
  let newContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${title}</title>
      <!-- inject:FileContent:css --><!-- endinject -->
      <!-- inject:FileContent:js --><!-- endinject -->
    </head>
    <body class="body">
    <div class="content">
      ${content}
    </div>
    <div class="nav-bar">
      ${injectDir}
    </div>  
    </body>
  </html>
  `;
  return newContent;
}

module.exports = { resolve, getProjectPath, getCurrPath, injection };
