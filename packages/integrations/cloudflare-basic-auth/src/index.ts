import { fileURLToPath } from 'node:url';
import fs from 'fs'
import type { AstroIntegration } from 'astro';

import path from 'path'

const PKG_NAME = 'cloudflare-basic-auth';


const createPlugin = (): AstroIntegration => {
	return {
		name: PKG_NAME,
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				logger.info("Setting up CF basic auth.")
				try {
					const functionsDir = `${fileURLToPath(dir)}/functions`
					const srcDir = `${path.dirname(fileURLToPath(import.meta.url))}/functions`;

					if (!fs.existsSync(functionsDir))
						fs.mkdirSync(functionsDir, {recursive: true});

					for (const fname of fs.readdirSync(srcDir)) {
						const src = `${srcDir}/${fname}`;
						const dest =  `${functionsDir}/${fname}`;
						fs.copyFileSync(src, dest);
						logger.info(`Copying ${src} to ${dest}`);
					}

				} catch (err) {
					logger.error("Error setting up cloudflare basic authentication.");
					throw err;
				}
			},
		},
	};
};

export default createPlugin;
