import type { StorybookConfig } from '@storybook/react/types';

module.exports = {
  stories: ['./src/**/*.stories.*'],
  logLevel: 'error',
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: {
          parser: 'typescript',
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
  ],
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  core: {
    builder: 'webpack4',
  },
} as StorybookConfig;
