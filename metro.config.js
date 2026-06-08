const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const srcPath = path.resolve(projectRoot, 'src');

/**
 * Metro resolves imports before Babel transforms them.
 * Custom resolver is required for `@/` path aliases.
 */
const config = {
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('@/')) {
        const aliasedPath = path.join(srcPath, moduleName.slice(2));

        return context.resolveRequest(context, aliasedPath, platform);
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
