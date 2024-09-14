/// <reference types="vite/client" />
/// <reference types="vitest" />

import { spaConfig } from "@architecture-it/vite/config";

export default spaConfig({
  test: {
    setupFiles: ["vitest.setup.ts"],
  },
});