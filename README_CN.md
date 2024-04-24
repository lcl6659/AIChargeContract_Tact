# Tact 模板项目

此模板预配置了启动新的 Tact 项目所需的设置。它包括 Tact 编译器、TypeScript、与 [tact-emulator](https://github.com/tact-lang/tact-emulator) 集成的 Jest，以及一个示例，演示如何运行测试。

```shell
yarn test # 测试合约
yarn build # 构建合约
yarn deploy # 部署合约
```

## 部署

要部署合约，请遵循以下步骤：

1. 定义将作为合约入口点的 [`contract.tact`](./sources/contract.tact) 文件。
2. 根据您的 `contract.tact` 自定义 [`contract.deploy.ts`](./sources/contract.deploy.ts) 文件以生成部署链接。确保合约中 `init()` 函数的正确调用至关重要。

如果您重命名了 `contract.tact`，请相应更新 [`tact.config.json`](./tact.config.json)。有关详细信息，请参阅 [Tact 文档](https://docs.tact-lang.org/language/guides/config)。

## 测试

您可以在 [`contract.spec.ts`](./sources/contract.spec.ts) 中找到一些合约测试的示例。有关测试的更多信息，请查看 [Tact 文档](https://docs.tact-lang.org/language/guides/debug)。

要为您的合约添加新的测试文件，您应创建与模板中的 `*.spec.ts` 文件类似的文件，它们将自动包含在测试中。

## 许可证

MIT