# Command Runner

<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.command-runner"><img src="https://img.shields.io/badge/Download-+-orange" alt="Download" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.command-runner"><img src="https://img.shields.io/badge/Macketplace-v1.X-brightgreen" alt="Macketplace" /></a>
<a href="https://github.com/Wscats/command-runner"><img src="https://img.shields.io/badge/Github Page-Wscats-yellow" alt="Github Page" /></a>
<a href="https://github.com/Wscats"><img src="https://img.shields.io/badge/Author-Eno Yao-blueviolet" alt="Eno Yao" /></a>

A VSCode extension that simply obtains the file path and executes the corresponding command.

![demo](./public/menu.png)

# How To Use

Click the file directory, select the file, right click the mouse to open the menu bar and select the `Run Command` option to run the preset command.

![demo](./public/demo.gif)

# Default Configuration

We have preset some commands for you, when you select a file to execute the `Run Command`, the file path will be replaced by `%FILE_PATH%`, and you can change the default settings inside.

| Configuration                     | Command                           |
| --------------------------------- | --------------------------------- |
| command-runner.before-run-command | clear                             |
| command-runner.run-command        | DWT_ENV=local npx dwt %FILE_PATH% |
| command-runner.after-run-command  | ls                                |

![demo](./public/configuration.png)

# Thanks

<b>❀Tencent Alloy Team</b>

<!-- <b><details><summary>Tencent Alloy Team</summary></b>

| [<img src="https://avatars1.githubusercontent.com/u/17243165?s=460&v=4" width="60px;"/><br /><sub>Eno Yao</sub>](https://github.com/Wscats) |
| ------------------------------------------------------------------------------------------------------------------------------------------- |
</details> -->

If the extension can help you, please enter the [Rating & Review](https://marketplace.visualstudio.com/items?itemName=Wscats.command-runner&ssr=false#review-details) link to give me a five-star praise.

If you have any questions or suggestions during use, please leave a message in the [issue](https://github.com/Wscats/command-runner/issues/new).
