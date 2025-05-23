import {StorybookConfig} from "@storybook/react-vite";
import type {InlineConfig} from "vite";
// NOTE: dont import vite at top level: https://github.com/storybookjs/storybook/issues/26291#issuecomment-1978193283

// todo wait for react native
const config: StorybookConfig = {
  stories: ["../../example-v8-generic/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials", // to get controls and docs addons and make sure we are compatible with any other essential addon
    "storybook-addon-deep-controls",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    // NOTE: dont import vite at top level: https://github.com/storybookjs/storybook/issues/26291#issuecomment-1978193283
    const [{mergeConfig}, react] = await Promise.all([
      import("vite"),
      import("@vitejs/plugin-react").then((m) => m.default),
    ]);

    return mergeConfig(config, {
      plugins: [react()],
    } satisfies InlineConfig);
  },
};

export default config;
