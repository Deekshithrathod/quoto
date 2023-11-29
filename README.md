# Quoto

## Project structure

Quoto is built as a Turborepo, includes the following packages & apps:

### Apps and Packages

- `web`: [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd quoto
npm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd quoto
npm dev
```
