# liamsarsfield.dev - My Personal Website

https://liamsarsfield.dev

- Personal website which was originally written in Vue 2 and then migrated to Vue 3.

- [Uses Vue's Quasar Framework](https://quasar.dev/).

## Development

```bash
yarn install
yarn dev     # starts quasar dev server
yarn build   # produces dist/spa for deployment
```

The project targets Node 20+ (see `package.json -> engines`).

## GitHub Pages Deployment

- Quasar is configured to build in **hash mode** with a default `publicPath` of `/liamsarsfielddev/`, which matches the GitHub Pages project URL.
- If you host the bundle somewhere else, override the base path via `PUBLIC_PATH=/your/base/ yarn build`.
- Static assets referenced in `src/layouts/MainLayout.vue` derive from `import.meta.env.BASE_URL`, ensuring they respect whatever base path is in use.

### Workflow

The workflow in `.github/workflows/deploy.yml`:

1. Runs on pushes to `dev-new-quasar` (and is also `workflow_dispatch`-able).
2. Installs dependencies with Yarn (Node 20).
3. Executes `yarn build` to generate `dist/spa`.
4. Uploads the SPA artifact and deploys it via `actions/deploy-pages@v4`.

Ensure the repository’s **Pages** settings are configured to use “GitHub Actions” as the source, and that Actions has permission to write to Pages (already granted via workflow permissions).
