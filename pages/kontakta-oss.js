// pages/kontakta-oss.js
import React from 'react';
import Layout from '../layouts/layout';
import { Header, Paragraph } from 'flotiq-components-react';
import { MailIcon } from '@heroicons/react/solid';
import { getAllRecipes } from '../lib/recipe';
import replaceUndefinedWithNull from '../lib/sanitize';
import { getPagesData, getCategoriesData, getSiteConfigData } from '../lib/data-fetchers';

const ContactUsPage = ({ content, allRecipes, categories, siteConfig }) => {
    // هذا يمكن نقله إلى الإعدادات العامة لاحقًا إذا أردت
    const email = "elsa@bakatarta.se";

    if (!content) {
        return (
            <Layout allRecipesForSearch={allRecipes || []} categories={categories || [] }  siteConfig={siteConfig}>
                <div className="text-center py-20">
                    <p>Innehållet för den här sidan kunde inte laddas.</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout 
            title={content.title} 
            description={content.meta_description} 
            allRecipesForSearch={allRecipes}
            categories={categories}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="text-center">
                    <Header level={1} additionalClasses={['!font-sora !text-4xl md:!text-5xl !font-bold !text-primary']}>
                        {content.headline}
                    </Header>
                    {/* عرض المحتوى الديناميكي من لوحة التحكم */}
                    <div className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto"
                         dangerouslySetInnerHTML={{ __html: content.body }} />
                </div>
                
                <div className="mt-16 bg-surface p-8 md:p-12 rounded-lg shadow-xl max-w-2xl mx-auto text-center">
                    <MailIcon className="h-12 w-12 text-secondary mx-auto mb-4"/>
                    <Header level={2} additionalClasses={['!text-2xl font-semibold !text-primary mb-2']}>
                        Skicka ett mejl
                    </Header>
                    <Paragraph additionalClasses={['mb-4']}>
                        Det enklaste sättet att nå mig är via e-post. Jag läser allt och försöker svara så snart jag kan!
                    </Paragraph>
                    <a href={`mailto:${email}`} className="text-2xl font-bold font-sora text-secondary hover:text-primary transition-colors">
                        {email}
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    // استخدام Promise.all لجلب كل البيانات المطلوبة بشكل متزامن
    const [allRecipesResponse, pagesData, categoriesData, siteConfigData] = await Promise.all([
        getAllRecipes(),
        getPagesData(),
        getCategoriesData(),
        getSiteConfigData()
    ]);

    // البحث عن محتوى الصفحة المحددة
    const contactPageContent = pagesData.find(p => p.key === 'contact') || null;

    // في حال عدم وجود الصفحة، يمكن إظهار صفحة 404
    if (!contactPageContent) {
        return { notFound: true };
    }

    return {
        props: {
            // استخدام || [] كقيمة افتراضية لمنع الأخطاء في حال فشل جلب البيانات
            allRecipes: replaceUndefinedWithNull(allRecipesResponse?.data) || [],
            content: contactPageContent,
            categories: categoriesData || [],
             siteConfig: siteConfigData || {},
        },
        revalidate: 60, // إعادة بناء الصفحة كل 60 ثانية إذا كان هناك تحديثات
    };
}

export default ContactUsPage;