# EStep UI

## What's inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `host`: a Vue 3 app that is the the host for module fedration
- `ui`: a stub Vue component library shared by the applications in the `apps` folder
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: includes the main config of tailwind, with its main styles and plugins
- `vite-config`: a shared config for all vue microfrontends. Includes plugins like [API Auto Import](https://github.com/antfu/unplugin-auto-import), [Component Auto Import](https://github.com/antfu/unplugin-vue-components) and [File Based Routing](https://github.com/hannoeru/vite-plugin-pages).

### Utilities

This monorepo uses some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Running a inside a Dev Container

You can run this application inside a Dev Container by installing the [related extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), opening the command palette (Ctrl-Shipt+p) and selecting `Dev Containers: Reopen in container`. After the image has done building, you will see the project folder (that has been mounted as a volume in the container) and vscode will begin installing the extensions specified in the `devcontainer.json` file. The execution of the container has nothing to do with the local files, so even if the container is destroyed there will be no issues

## Setup

When first working with this project, it is necessary to disable the built-in typescript support of vscode in favor of the Vue Typescript Plugin. This will enable takeover mode,and let the Volar plugin to take care of the intellisense. To do so, input `@builtin typescript` in the extension search bar and disable `TypeScript and JavaScript Language Features` for the current workspace.
If everithing is working correctly, you will se in the bottom bar `TakeOver Mode` when editing `.vue` and `.ts` files

## Adding new 'internal' packages

For internal packages we usually mean those that are not published to npm but are still imported by other packages or by the ones in the `apps` folder. If you want to specify internal packages that force the use of some version of dependencies, put those in the `peerDependencies` block in their `package.json` file. Then you will need to add the following block to each package that uses that internal package:

```json
"dependenciesMeta": {
    "internal-package": {
        "injected": true
    },
}
```

### Build

To build all apps and packages, run the following command:

```bash
cd my-turborepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
cd my-turborepo
pnpm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
cd my-turborepo
pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```bash
pnpm dlx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
