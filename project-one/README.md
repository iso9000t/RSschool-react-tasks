
# Class Components

## Description

This is a simple project setup using React, TypeScript, Vite, ESLint, Prettier, and Husky. This project allows you to download data from the Rick and Morty API.

## Important Steps

1. **Install Dependencies**

To install the project dependencies, run:

```bash
npm install
```

2. **Set Up Husky**

To set up Husky, run:

```bash
npm run prepare
```

## Scripts

### Development

To start the development server, run:

```bash
npm run dev
```

### Build

To build the project for production, run:

```bash
npm run build
```

### Linting

To lint the project files, run:

```bash
npm run lint
```

To fix linting errors, run:

```bash
npm run lint:fix
```

### Formatting

To format the project files using Prettier, run:

```bash
npm run format:fix
```

### Preview

To preview the production build, run:

```bash
npm run preview
```

### Prepare

To set up Husky, run:

```bash
npm run prepare
```

## How to Commit

When you make changes to the code and want to commit them, follow these steps:

1. **Add Changes**

Add your changes to the staging area:

```bash
git add .
```

2. **Commit Changes**

Commit your changes with a meaningful message:

```bash
git commit -m "Your commit message"
```

### Explanation of Husky and lint-staged

Husky is used to manage git hooks, which are scripts that run automatically on specific git events like commit or push. In this project, Husky is configured to run lint-staged on pre-commit.

- **lint-staged**: This tool allows you to run linters on your staged files before you commit. It ensures that only the files that are going to be committed are linted, which helps maintain code quality without slowing down your workflow.

When you run `git commit`, Husky triggers the pre-commit hook, which in turn runs lint-staged. Lint-staged will then run ESLint on the staged files to check for and fix any linting issues before the commit is finalized. If there are any issues, the commit will be aborted, and you will need to fix the issues before committing again.

By following these steps, you can ensure that your code adheres to the project's coding standards and passes all linting checks before being committed.
