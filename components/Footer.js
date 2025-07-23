// components/Footer.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '../lib/config';

const Footer = ({ siteConfig }) => ( // تمت إضافة siteConfig هنا ليكون متوافقاً مع layout.js
    // --- بداية التعديل الرئيسي ---
    // تغيير الخلفية من bg-primary إلى bg-background-pink
    <footer className="bg-background-pink">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                    <Image
                        // تغيير شعار الموقع من الأبيض إلى الشعار الأساسي
                        src="/assets/bakatarta-logo.png" 
                        alt={`${(siteConfig && siteConfig.title) || config.siteMetadata.title} Logotyp`}
                        width={180}
                        height={65}
                    />
                    {/* تغيير لون النص إلى الداكن */}
                    <p className="text-primary text-base">
                        Din guide till den perfekta kakan. Recept skapade med kärlek av Elsa Lundström.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            {/* تغيير لون العنوان الفرعي */}
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Navigation</h3>
                            <ul className="mt-4 space-y-4">
                                {/* تغيير ألوان الروابط */}
                                <li><Link href="/recept"><div className="text-base text-primary hover:text-secondary">Alla Recept</div></Link></li>
                                <li><Link href="/om-oss"><div className="text-base text-primary hover:text-secondary">Om Elsa</div></Link></li>
                                <li><Link href="/kontakta-oss"><div className="text-base text-primary hover:text-secondary">Kontakt</div></Link></li>
                            </ul>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Guider</h3>
                            <ul className="mt-4 space-y-4">
                               {/* تغيير ألوان الروابط */}
                               <li><Link href="/marangtarta"><div className="text-base text-primary hover:text-secondary">Marängtårtor</div></Link></li>
                               <li><Link href="/tarta-i-langpanna"><div className="text-base text-primary hover:text-secondary">Tårtor i Långpanna</div></Link></li>
                               <li><Link href="/kladdkaka"><div className="text-base text-primary hover:text-secondary">Kladdkakor</div></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* تغيير لون الخط الفاصل ونص حقوق النشر */}
            <div className="mt-12 border-t border-gray-extra-light pt-8">
                <p className="text-base text-gray-500 text-center">
                    © {new Date().getFullYear()} {(siteConfig && siteConfig.title) || config.siteMetadata.title}. Alla rättigheter förbehållna.
                </p>
            </div>
        </div>
    </footer>
    // --- نهاية التعديل الرئيسي ---
);

export default Footer;