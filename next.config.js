// next.config.js

module.exports = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bakatarta.se',
                pathname: '/images/**',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    
    async redirects() {
        return [
            // The Most Important Redirects from the new list
            { source: '/fraga-kocken/forvara-marangtartan-i-kylen-82638', destination: '/kategori/marangtarta', permanent: true },
            { source: '/pasktarta', destination: '/recept/pasktarta-med-marang-och-lemoncurd', permanent: true },
            { source: '/graddtarta', destination: '/recept/pasktarta-med-marang-och-lemoncurd', permanent: true },
            { source: '/hjarttarta-mandel-vanilj', destination: '/recept/hjarttarta-med-mandel-och-vaniljkram', permanent: true },
            { source: '/alla-hjartansdagstarta', destination: '/recept/hjarttarta-med-mandel-och-vaniljkram', permanent: true },
            { source: '/mandelkram-francipankram', destination: '/recept/hjarttarta-med-mandel-och-vaniljkram', permanent: true },
            { source: '/tarta-i-langpanna', destination: '/kategori/tarta-i-langpanna', permanent: true },
            { source: '/pannkakstarta', destination: '/recept/klassisk-pannkakstarta', permanent: true },
            { source: '/halloweentarta', destination: '/recept/laskig-halloweentarta-med-choklad-och-apelsin', permanent: true },
            { source: '/tjinuskitarta', destination: '/recept/kolatarta-med-mandelbotten', permanent: true },
            { source: '/prinsesstarta', destination: '/recept/klassisk-prinsesstarta', permanent: true },
            { source: '/mockatarta-med-marang', destination: '/recept/mockatarta-med-marang', permanent: true },
            { source: '/marangtarta-moccagradde', destination: '/recept/mockatarta-med-marang', permanent: true },
            { source: '/chokladtarta-hallon-kola', destination: '/recept/chokladtarta-hallon-kola', permanent: true },

            // Other redirects from the combined lists
            { source: '/halloncurd-tartfyllning-hallon', destination: '/recept/chokladtarta-hallon-kola', permanent: true },
            { source: '/marangtarta-med-hallon-och-lakrits', destination: '/recept/pavlova-med-bar', permanent: true },
            { source: '/citronkram', destination: '/recept/pasktarta-med-marang-och-lemoncurd', permanent: true },
            { source: '/kladdkakstarta-chokladmousse', destination: '/recept/klassisk-kladdkaka', permanent: true },
            { source: '/rabarbertarta-med-vanilj', destination: '/recept/hjarttarta-med-mandel-och-vaniljkram', permanent: true },
            { source: '/pralintarta', destination: '/recept/chokladtarta-med-apelsin', permanent: true },
            { source: '/squash-kaka-i-langpanna', destination: '/recept/squashkaka-i-langpanna', permanent: true },
        ];
    },
};