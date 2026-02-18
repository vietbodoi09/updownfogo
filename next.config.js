/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Bỏ qua lỗi TypeScript/ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Fix ERR_IMPORT_ATTRIBUTE_MISSING for wormhole SDK JSON imports
  serverExternalPackages: [
    '@wormhole-foundation/sdk-solana-ntt',
    '@wormhole-foundation/sdk',
  ],

  experimental: {
    esmExternals: 'loose',
  },
  
  webpack: (config, { isServer, webpack }) => {
    // Fix cho browser
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        vm: require.resolve('vm-browserify'),
        zlib: require.resolve('browserify-zlib'),
        'pino-pretty': false,
      };
    }
    
    // Ignore pino-pretty
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pino-pretty$/,
      })
    );
    
    return config;
  },
  
  // Transpile packages
  transpilePackages: [
    '@solana/web3.js',
    '@solana/spl-token',
    '@fogo/sessions-sdk-react'
  ],
  
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
