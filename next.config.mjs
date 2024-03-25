
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.FLUENTFFMPEG_COV': false
        }))
        return config
    },
    reactStrictMode: false
};

export default nextConfig;
