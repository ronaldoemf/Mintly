// next.config.mjs

// Import the bundle analyzer package
import withBundleAnalyzer from "@next/bundle-analyzer";

// Import user-defined configuration (if it exists)
let userConfig = undefined;
try {
  userConfig = await import("./v0-user-next.config");
} catch (e) {
  // Ignore errors if the user config file doesn't exist
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Disable ESLint during builds (optional, adjust as needed)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript error checks during builds (optional, adjust as needed)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize images (ensure they are served in modern formats like WebP)
  images: {
    unoptimized: false, // Set to `false` to enable image optimization
    formats: ["image/avif", "image/webp"], // Prioritize modern image formats
  },

  // Enable gzip compression for production builds
  compress: true,

  // Reduce unnecessary files in the build output
  output: "standalone",

  // Experimental features
  experimental: {
    optimizeCss: true, // Optimize CSS in the production build
    // webpackBuildWorker: true, // Uncomment if you want parallel builds
    // parallelServerBuildTraces: true, // Uncomment if you want faster builds
    // parallelServerCompiles: true, // Uncomment if you want faster builds
  },
};

// Merge user-defined configuration into the main configuration
function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

// Merge user config (comment this line temporarily if needed)
mergeConfig(nextConfig, userConfig);

// Wrap the configuration with the bundle analyzer
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enable analyzer only when ANALYZE=true
})(nextConfig);
