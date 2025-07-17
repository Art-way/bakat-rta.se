// components/Footer.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import config from '../lib/config';

const Footer = () => (
    <footer className="bg-primary text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                    <Image
                        src="/assets/bakatarta-logo-white.png" // شعار أبيض للخلفية الداكنة
                        alt={`${config.siteMetadata.title} Logotyp`}
                        width={180}
                        height={65}
                    />
                    <p className="text-gray-300 text-base">
                        Din guide till den perfekta kakan. Recept skapade med kärlek av Elsa Lundström.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Navigation</h3>
                            <ul className="mt-4 space-y-4">
                                <li><Link href="/recept"><div className="text-base text-gray-300 hover:text-white">Alla Recept</div></Link></li>
                                <li><Link href="/om-oss"><div className="text-base text-gray-300 hover:text-white">Om Elsa</div></Link></li>
                                <li><Link href="/kontakta-oss"><div className="text-base text-gray-300 hover:text-white">Kontakt</div></Link></li>
                            </ul>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Guider</h3>
                            <ul className="mt-4 space-y-4">
                               <li><Link href="/marangtarta"><div className="text-base text-gray-300 hover:text-white">Marängtårtor</div></Link></li>
                               <li><Link href="/tarta-i-langpanna"><div className="text-base text-gray-300 hover:text-white">Tårtor i Långpanna</div></Link></li>
                               <li><Link href="/kladdkaka"><div className="text-base text-gray-300 hover:text-white">Kladdkakor</div></Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* Social links can be added here if needed */}
                </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8">
                <p className="text-base text-gray-400 text-center">
                    © {new Date().getFullYear()} {config.siteMetadata.title}. Alla rättigheter förbehållna.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;