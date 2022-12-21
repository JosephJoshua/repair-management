/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/adobe/react-spectrum/issues/779
  // TODO: Enable as soon as react-aria adds support for strict mode!
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
