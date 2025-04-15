import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add GLSL/Shader file handling
    config.module?.rules?.push({
      test: /\.(glsl|frag|vert|vs|fs)$/i,
      use: ['raw-loader'],
      exclude: /node_modules/,
    });
    
    return config;
  },
};

export default nextConfig;
