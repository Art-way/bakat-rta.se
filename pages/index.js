// pages/index.js
import React from 'react';
import Layout from '../layouts/layout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeCard';
import { getAllRecipes } from '../lib/recipe';
import replaceUndefinedWithNull from '../lib/sanitize';
import { Header, Paragraph } from 'flotiq-components-react';
import { getCategoriesData, getSiteConfigData } from '../lib/data-fetchers';
const WhiskIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3 1l-3 1m-3-1l3 1m6-5.455l-3-1m3 1l3 1m0 0l3-1m3 1l3-1m-6-5.455l-3-1m3 1l3 1" />
    </svg>
);
const FlourSackIcon = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.692-.026 1.038 0 1.13.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5m-7.5 0l-1.299 1.299a1.125 1.125 0 000 1.591l.638.638a1.125 1.125 0 001.59 0l.64- .64m-5.408 2.176l1.299-1.299m5.408 0l-1.299 1.299m0 0a1.125 1.125 0 01-1.59 0l-.638-.638a1.125 1.125 0 010-1.591l.638-.638a1.125 1.125 0 011.59 0l.64.64m-5.408 2.176l1.299-1.299" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5" />
    </svg>
);

const FeaturedCategorySection = ({ title, intro, recipes, categoryLink }) => {
    if (!recipes || recipes.length === 0) return null;
    return (
        <div className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary font-sora">{title}</h2>
                    <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">{intro}</p>
                </div>
                <div className="flex flex-wrap -mx-3">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href={categoryLink} passHref>
                        <Button label={`Utforska alla ${title.split(' ')[1] || title}`} variant="primary" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({
    featuredRecipe,
    latestRecipes,
    marangtartaRecipes,
    langpannaRecipes,
    kladdkakaRecipes,
    allRecipes,
    categories,
     siteConfig
}) => {
    
    const categoryCards = [
        { name: 'Marängtårtor', href: '/kategori/marangtarta', image: '/images/categories/marangtarta-category.jpg', description: "Krispiga, sega och himmelskt goda." },
        { name: 'Tårtor i Långpanna', href: '/kategori/tarta-i-langpanna', image: '/images/categories/langpanna-category.jpg', description: "Perfekt när du bakar till många." },
        { name: 'Kladdkakor', href: '/kategori/kladdkaka', image: '/images/categories/kladdkaka-category.jpg', description: "Sveriges kladdigaste favorit." },
        { name: 'Cheesecakes', href: '/kategori/cheesecake', image: '/images/categories/cheesecake-category.jpg', description: "Krämigt, fräscht och oemotståndligt." },
    ];

    if (!featuredRecipe) {
        return (
             <Layout allRecipesForSearch={allRecipes} categories={categories}  siteConfig={siteConfig}>
                <div className="text-center py-20">
                    <p>Inga recept att visa just nu. Kom snart tillbaka!</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout allRecipesForSearch={allRecipes} categories={categories}>
            <section className="relative h-[70vh] flex items-center justify-center text-center bg-primary text-white">
                <Image
                    src="/images/bakatarta-hero-background.jpg"
                    alt="Vackra hembakade tårtor"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-0 opacity-40"
                    priority
                />
                <div className="relative z-10 p-5 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold font-sora drop-shadow-lg mb-4">
                        Där smör, socker & kärlek möts.
                    </h1>
                    <Paragraph additionalClasses={['text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md']}>
                        Jag heter Elsa, och detta är mitt lilla hörn av internet – en plats fylld av doften från nygräddade kakor och glädjen i att dela med sig. Välkommen in i värmen!
                    </Paragraph>
                    <Link href="/recept" passHref>
                        <Button label="Utforska alla recept" variant="secondary" size="lg" />
                    </Link>
                </div>
            </section>

            <section className="bg-background py-16 md:py-24 relative overflow-hidden">
                <WhiskIcon className="absolute -top-12 -left-16 h-48 w-48 text-gray-extra-light transform rotate-12 opacity-80" />
                <FlourSackIcon className="absolute -bottom-20 -right-10 h-64 w-64 text-gray-extra-light transform -rotate-12 opacity-80" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Header level={2} additionalClasses={['!font-sora !text-3xl md:!text-4xl !font-bold !text-primary']}>
                            Baka efter humör och tillfälle
                        </Header>
                        <Paragraph additionalClasses={['text-lg text-gray-600 mt-3 max-w-2xl mx-auto']}>
                            Oavsett om du planerar ett stort kalas, en mysig fika eller bara är sugen på något riktigt gott, så finns det en kategori för dig.
                        </Paragraph>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categoryCards.map(cat => (
                            <Link href={cat.href} key={cat.name}>
                                <div className="block group text-center">
                                    <div className="relative rounded-full overflow-hidden w-48 h-48 mx-auto shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                                        <Image src={cat.image} alt={cat.name} layout="fill" objectFit="cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity"></div>
                                    </div>
                                    <h3 className="text-primary text-xl font-bold font-sora mt-4 group-hover:text-secondary">{cat.name}</h3>
                                    <p className="text-gray-500 text-sm">{cat.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="bg-surface py-16 md:py-24">
                <div className="text-center mb-16">
                    <Header level={2} additionalClasses={['!font-sora !text-3xl md:!text-4xl !font-bold !text-primary']}>
                        Färskt ur ugnen
                    </Header>
                     <Paragraph additionalClasses={['text-lg text-gray-600 mt-3 max-w-2xl mx-auto']}>
                        Här är det allra senaste från mitt kök. Nya favoriter och experiment som jag bara måste dela med mig av.
                    </Paragraph>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap -mx-3">
                        {latestRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </div>
            </section>

            <div className="bg-background">
                <FeaturedCategorySection
                    title="Drömmar av Maräng"
                    intro="Krispiga, sega och alltid lika imponerande. Marängtårtan är en favorit som går att variera i oändlighet."
                    recipes={marangtartaRecipes}
                    categoryLink="/kategori/marangtarta"
                />
            </div>
             <div className="bg-surface">
                <FeaturedCategorySection
                    title="Till Hela Sällskapet"
                    intro="När många ska fika är långpannan din bästa vän. Här är mina mest älskade recept som räcker till alla."
                    recipes={langpannaRecipes}
                    categoryLink="/kategori/tarta-i-langpanna"
                />
            </div>
            <div className="bg-background">
                <FeaturedCategorySection
                    title="För Chokladälskaren"
                    intro="Det finns få saker som slår en perfekt kladdig kladdkaka. Här är mina favoriter för en garanterad succé."
                    recipes={kladdkakaRecipes}
                    categoryLink="/kategori/kladdkaka"
                />
            </div>

            <section className="bg-primary text-white py-20 md:py-24">
                 <div className="max-w-3xl mx-auto text-center px-4">
                     <Image src="/images/elsa-lundstrom-portrait.jpg" alt="Elsa Lundström" width={120} height={120} className="rounded-full mx-auto mb-6 shadow-2xl border-4 border-white" />
                     <Header level={2} additionalClasses={['!font-sora !text-3xl !font-bold !text-white']}>
                        Från mitt kök till ditt
                     </Header>
                     <Paragraph additionalClasses={['text-lg text-gray-200 leading-relaxed my-6']}>
                        "Att baka är mitt sätt att visa kärlek. Varje recept på den här sidan är mer än bara en lista med instruktioner – det är en bit av min historia. Jag hoppas att de ska få bli en del av din. Tveka aldrig att höra av dig om du har en fråga eller bara vill dela med dig av din bakglädje!"
                     </Paragraph>
                     <Link href="/om-oss" passHref>
                        <Button label="Läs min historia" variant="secondary" />
                     </Link>
                </div>
            </section>
        </Layout>
    );
};

export async function getStaticProps() {
   const [recipesResponse, categoriesData, siteConfigData] = await Promise.all([
        getAllRecipes(),
        getCategoriesData(),
        getSiteConfigData() // <-- جلب إعدادات الموقع
    ]);

    const allRecipes = recipesResponse ? replaceUndefinedWithNull(recipesResponse.data) : [];
    
    const marangtartaRecipes = allRecipes.filter(r => r.recipeCategory?.toLowerCase().includes('marängtårta')).slice(0, 3);
    const langpannaRecipes = allRecipes.filter(r => r.recipeCategory?.toLowerCase().includes('långpannekaka')).slice(0, 3);
    const kladdkakaRecipes = allRecipes.filter(r => r.recipeCategory?.toLowerCase().includes('kladdkaka')).slice(0, 3);
    const featuredRecipe = allRecipes.length > 0 ? allRecipes[0] : null;
    const latestRecipes = allRecipes.slice(0, 3);

    return {
        props: {
            featuredRecipe,
            latestRecipes,
            marangtartaRecipes,
            langpannaRecipes,
            kladdkakaRecipes,
            allRecipes,
            categories: categoriesData || [],
            siteConfig: siteConfigData || {},
        },
        revalidate: 3600,
    };
}

export default HomePage;