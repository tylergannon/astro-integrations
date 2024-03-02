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
				if (!process.env.CFP_PASSWORD) {
					logger.info("Skipping CF basic auth.");
					return;
				}
				logger.info("Setting up CF basic auth.")
				try {
					const destDir = path.dirname(fileURLToPath(dir)) + '/functions';
					const srcDir = `${path.dirname(fileURLToPath(import.meta.url))}/functions`;

					if (!fs.existsSync(destDir))
						fs.mkdirSync(destDir, {recursive: true});

					for (const fname of fs.readdirSync(srcDir)) {
						const src = `${srcDir}/${fname}`;
						const dest =  `${destDir}/${fname}`;
						console.info(`Copying ${src} to ${dest}`);
						fs.copyFileSync(src, dest);
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
