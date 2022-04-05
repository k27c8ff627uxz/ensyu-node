// 参考URL
//   https://original-game.com/how-to-use-webpack-dev-server/
//   https://dev.classmethod.jp/articles/webpack-dev-server-devcert/

function component() {
  const element = document.createElement('div');
  element.textContent = 'Hello World';
  return element
}

document.body.appendChild(component())
