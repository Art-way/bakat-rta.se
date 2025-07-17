// pages/sitemap.xml.js

import { getAllRecipes } from '../lib/recipe';
import config from '../lib/config';

// قائمة الصفحات الثابتة والمحورية
const STATIC_PAGES = [
    { url: '', priority: '1.00', lastmod: new Date().toISOString().split('T')[0] },
    { url: '/om-oss', priority: '0.80', lastmod: '2025-07-20' },
    { url: '/kontakta-oss', priority: '0.80', lastmod: '2025-07-20' },
    { url: '/recept', priority: '0.90', lastmod: new Date().toISOString().split('T')[0] },
    { url: '/marangtarta', priority: '0.90', lastmod: new Date().toISOString().split('T')[0] },
    { url: '/tarta-i-langpanna', priority: '0.90', lastmod: new Date().toISOString().split('T')[0] },
    // أضف صفحات محورية أخرى هنا مثل /kladdkaka
];

function generateSiteMap(recipes) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Pages statiques -->
     ${STATIC_PAGES
       .map(({ url, priority, lastmod }) => `
       <url>
           <loc>${config.siteMetadata.siteUrl}${url}</loc>
           <lastmod>${lastmod}</lastmod>
           <priority>${priority}</priority>
       </url>
     `).join('')}
     
     <!-- Recettes dynamiques -->
     ${recipes
       .map(({ slug, datePublished }) => `
       <url>
           <loc>${`${config.siteMetadata.siteUrl}/recept/${slug}`}</loc>
           <lastmod>${datePublished || new Date().toISOString().split('T')[0]}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>0.70</priority>
       </url>
     `).join('')}
   </urlset>
 `;
}

// دالة خاصة بـ Next.js لتوليد الصفحة من جانب الخادم
export async function getServerSideProps({ res }) {
    const recipesResponse = await getAllRecipes();
    const recipes = recipesResponse.data || [];

    const sitemap = generateSiteMap(recipes);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return { props: {} };
}

const Sitemap = () => {};
export default Sitemap;