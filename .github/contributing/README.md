# Contributing to Coop Waitlist

Thank you for considering contributing to Coop Waitlist! This document outlines the process for contributing to the project and how to get started.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others when contributing.

## How to Contribute

### Reporting Issues

Before submitting an issue, please check that it hasn't already been reported by searching the issue tracker.

When submitting an issue, please include:
- A clear, descriptive title
- A detailed description of the problem
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment information (browser, OS, device)

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commit messages
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request against the `develop` branch

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi colons, etc)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Code changes that improve performance
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

### Development Workflow

1. Install dependencies: `yarn install`
2. Start the development server: `yarn dev`
3. Make your changes
4. Format code: `yarn format:fix`
5. Lint code: `yarn lint`
6. Run tests: `yarn test`
7. Submit a Pull Request

## Git Hooks

This project uses Husky for Git hooks to maintain code quality. All checks must pass before commits are accepted.

## Code Style

We use ESLint and Prettier to maintain code quality and consistency. Please ensure your code adheres to these standards by running:

```bash
yarn lint
yarn format:fix
```

## Testing

Write tests for new features and ensure existing tests pass before submitting a PR:

```bash
yarn test
```

## License

By contributing to Coop Waitlist, you agree that your contributions will be licensed under the project license.
