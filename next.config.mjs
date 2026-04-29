/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.kimple.co'
			}
		]
	}
};

export default nextConfig;
