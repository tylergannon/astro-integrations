# cloudflare-basic-auth

This **[Astro integration][astro-integration]**
generates code that when deployed to a Cloudflare Pages app will require basic authentication.

Good for quick protection of staging sites.

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

## Usage

Add the integration to your package.

```sh
pnpm add -D cloudflare-basic-auth
```

Configure the integration in your `astro.config.mjs`.

```javascript
import basicAuth from 'astro-cloudflare-basic-auth';

export default defineConfig({
    integrations: [
        basicAuth(),
        /* ... */
    ]
})
```

Before you deploy to your CloudFlare pages app, set the password by adding a
`CFP_PASSWORD` environment variable.  The value that you set there will be the
password to your application.
