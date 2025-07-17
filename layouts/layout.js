// layouts/layout.js
import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import PageHeader from '../components/Header';
import { Poppins, Sora } from 'next/font/google';
import { useRouter } from 'next/router';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-poppins',
    display: 'swap',
});

const sora = Sora({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-sora',
    display: 'swap',
});

// Layout الآن يقبل siteConfig كـ prop
const Layout = ({
    children, additionalClass = [], title, description, ogImage, ogType, 
    allRecipesForSearch, categories, siteConfig
}) => {
    const router = useRouter();

    // استخدام البيانات الديناميكية مع قيم افتراضية
    const siteTitle = siteConfig?.title || 'bakatårta.se';
    const siteDescription = siteConfig?.description || 'Din guide till den perfekta kakan.';
    const siteUrl = siteConfig?.siteUrl || 'https://bakatarta.se';

    const pageTitle = title || siteTitle;
    const pageDescription = description || siteDescription;
    const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`;
    const imageUrl = ogImage
        ? `${siteUrl}${ogImage}`
        : `${siteUrl}/images/bakatarta-social-share.jpg`;

    return (
        <main className={[`${poppins.variable} ${sora.variable} font-poppins bg-background`, ...additionalClass].join(' ')}>
            <Head>
                <title>{pageTitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />
                
                <meta property="og:title" content={pageTitle} key="ogtitle" />
                <meta property="og:description" content={pageDescription} key="ogdesc" />
                <meta property="og:site_name" content={siteTitle} key="ogsitename" />
                <meta property="og:url" content={canonicalUrl} key="ogurl" />
                <meta property="og:image" content={imageUrl} key="ogimage" />
                <meta property="og:type" content={ogType || 'website'} key="ogtype" />
                
                <meta name="twitter:card" content="summary_large_image" key="twittercard" />
                <meta name="twitter:title" content={pageTitle} key="twittertitle" />
                <meta name="twitter:description" content={pageDescription} key="twitterdesc" />
                <meta name="twitter:image" content={imageUrl} key="twitterimage" />
                
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader allRecipesForSearch={allRecipesForSearch} categories={categories} />
            <div className="min-h-screen">
                {children}
            </div>
            {/* الفوتر الآن يمكنه استخدام siteConfig أيضًا */}
            <Footer siteConfig={siteConfig} /> 
        </main>
    );
};

export default Layout;