# Contributing

## Prerequisites

### Local Development

- **[OpenAPI Generator](https://openapi-generator.tech/docs/installation)** - Required to generate the SDK. For Mac, users we recommend installation using Homebrew.
- **[Prettier](https://prettier.io/docs/en/install.html)** - Optional, but it's used for formatting the generated code.

---

### Generating the SDK

For users that have installed the generator using Homebrew, run the following command from the root directory:

```bash
npm run generate
```

or

```bash
openapi-generator generate
    -i https://api.tilled.com/docs/spec3.json
    -g typescript-node
    -c ./codegen.conf.json
    --git-repo-id tilled-sdks
    --git-user-id gettilled
    --skip-validate-spec --enable-post-process-file
    && npx prettier --write '**/*.ts'
    && npm install
    && npm version patch --force
```

For PC/Linux users that have installed the CLI with NPM or Docker, run the following command:

```bash
openapi-generator-cli generate
    -i https://api.tilled.com/docs/spec3.json
    -g typescript-node
    -c ./codegen.conf.json
    --git-repo-id tilled-sdks
    --git-user-id gettilled
    --skip-validate-spec --enable-post-process-file
    && npx prettier --write '**/*.ts'
    && npm install
    && npm version patch --force
```

---

## Manually Publishing the SDK

To publish the SDK to NPM, run the following command:

```bash
npm publish
```

---

### Contribute to the SDK

If you would like to contribute to this SDK, please follow the steps below:

- Fork the repository
- Create a new branch
- Make your changes
- Run the appropriate `npm version` command to bump the version number.

```bash
npm version patch // 1.0.1
npm version minor // 1.1.0
npm version major // 2.0.0
```

- Commit your changes
- Push your changes to your fork
- Create a pull request

### Testing Locally

- Run the `npm run generate` command to generate the SDK

```bash
npm run generate
```

- Within your project you can use this to test locally.

```json

"dependencies": {
    "tilled-node": "file:../tilled-node/dist"
  }

```
