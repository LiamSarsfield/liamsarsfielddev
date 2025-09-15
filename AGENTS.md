# Repository Guidelines

## Project Structure & Module Organization

Source lives under `src/`. Use `src/pages` for route-level screens, `src/components` for reusable UI, and `src/layouts` for shell wrappers. Global styling belongs in `src/css`, while Quasar boot files reside in `src/boot` for app-wide services. Shared state goes through Pinia stores in `src/stores`. Static assets such as icons or images should go in `src/assets`, and anything that must ship untouched belongs in `public/`. Router configuration is centralised in `src/router`.

## Build, Test, and Development Commands

Install dependencies with `yarn install` (runs `quasar prepare`). Use `yarn dev` to start the Quasar Vite dev server with hot reload. Run `yarn build` to produce the production bundle in `dist/`. Check lint rules with `yarn lint`, and format files using `yarn format`. Execute `yarn test` as a placeholder until automated tests are added; implementors should replace the stub when adding coverage.

## Coding Style & Naming Conventions

The project targets modern Vue 3 + TypeScript. Prettier (`.prettierrc.json`) enforces two-space indentation, single quotes in scripts, and trailing commas where valid. Keep Vue single-file component sections ordered as template, script, then style. Name components with PascalCase (`InfoCard.vue`), composables with `use` prefixes, and stores with `useXStore`. Environment files follow the `quasar.config.ts` conventions.

## Testing Guidelines

Testing is not yet configured; prefer Vitest plus @testing-library/vue when adding suites. Place component tests near their sources (e.g., `src/components/__tests__/InfoCard.spec.ts`). Mirror the filename of the unit under test, and ensure each suite can run via an updated `yarn test`. Aim for meaningful assertions around rendered output and store behaviour.

## Commit & Pull Request Guidelines

Commits in history use concise, action-first statements (e.g., "Fix chip behaviour and styling"). Follow that tone, capitalising the first word and omitting trailing punctuation. Group related changes into a single commit to keep history clean. Pull requests should describe the user-visible impact, list key changes, link any relevant issues, and include screenshots or GIFs for UI updates. Note follow-up work explicitly in the description so reviewers can track future tasks.

## Environment & Configuration Tips

Use the Node ranges declared in `package.json` (`^20` and newer). Copy `.env.example` to `.env` if environment variables are introduced, and document new keys in `README.md`. When adding Quasar plugins, update both `quasar.config.ts` and any boot files to keep configuration discoverable.
