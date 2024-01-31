const vscode = require("vscode");
const axios = require("axios");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  const res = await axios.get("https://api.gitterapp.com/");
  const repos = res.data.map((repo) => ({
    label: repo.name,
    detail: repo.description,
    link: repo.url,
    iconPath: vscode.Uri.parse(repo.avatar),
  }));
  console.log(repos);

  let disposable = vscode.commands.registerCommand(
    "vscode-github-trending.githubTrending",
    async function () {
      const repo = await vscode.window.showQuickPick(repos, {
        matchOnDetail: true,
      });

      if (repo == null) return;

      vscode.env.openExternal(repo.link);
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
