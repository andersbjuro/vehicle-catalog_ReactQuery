/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   dynamicIO: true,
  // },
  output: 'standalone',
  env: {
    npm_package_name: process.env.npm_package_name,
    npm_package_version: process.env.npm_package_version,
  },
};

export default nextConfig;

