// components/Header.js
import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { MenuIcon, XIcon, ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import config from '../lib/config';
import { useRouter } from 'next/router';
import SearchWidget from './SearchWidget';

// مكون الهيدر الآن يقبل "categories" كـ prop
const PageHeader = ({ allRecipesForSearch = [], categories = [] }) => {
    const router = useRouter();

    // 1. بناء قائمة الفئات المنسدلة ديناميكيًا من البيانات القادمة
    const categorySubLinks = categories.map(cat => ({
        name: cat.name,
        href: `/kategori/${cat.slug}`
    }));

    // 2. تحديث هيكل التنقل الرئيسي لاستخدام القائمة الديناميكية
    const navigationLinks = [
        { name: 'Hem', href: '/', type: 'link' },
        { name: 'Alla Recept', href: '/recept', type: 'link' },
        // فقط إذا كانت هناك تصنيفات، أظهر القائمة المنسدلة
        ...(categorySubLinks.length > 0 ? [{
            name: 'Kategorier',
            type: 'dropdown',
            subLinks: categorySubLinks, // <-- استخدام القائمة الديناميكية
        }] : []),
        { name: 'Om Elsa', href: '/om-oss', type: 'link' },
        { name: 'Kontakt', href: '/kontakta-oss', type: 'link' },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Disclosure as="nav" className="bg-surface shadow-md sticky top-0 z-50">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-24">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/" passHref>
                                    <div className="cursor-pointer">
                                        <Image
                                            src="/assets/bakatarta-logo.png"
                                            alt={`${config.siteMetadata.title} Logotyp`}
                                            width={160}
                                            height={60}
                                            priority
                                        />
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
                                {navigationLinks.map((item) =>
                                    item.type === 'link' ? (
                                        <Link key={item.name} href={item.href} passHref>
                                            <div className={classNames(
                                                router.pathname === item.href ? 'text-secondary border-secondary' : 'text-primary hover:text-secondary border-transparent',
                                                'inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold font-sora transition-all duration-150 ease-in-out'
                                            )}>
                                                {item.name}
                                            </div>
                                        </Link>
                                    ) : (
                                        <Menu as="div" className="relative" key={item.name}>
                                            <Menu.Button className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-semibold font-sora text-primary hover:text-secondary group transition-all duration-150 ease-in-out">
                                                <span>{item.name}</span>
                                                <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400 group-hover:text-primary transition-transform" />
                                            </Menu.Button>
                                            <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                                                    {item.subLinks.map((subLink) => (
                                                        <Menu.Item key={subLink.name}>
                                                            {({ active }) => (
                                                                <Link href={subLink.href} passHref>
                                                                    <div className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-3 text-sm text-primary hover:bg-gray-extra-light')}>
                                                                        {subLink.name}
                                                                    </div>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    )
                                )}
                            </div>

                            {/* Desktop Search & Mobile Menu Button */}
                            <div className="flex items-center">
                                <div className="hidden md:ml-4 md:flex md:items-center">
                                    <SearchWidget allRecipesData={allRecipesForSearch} placeholder="Sök recept..." />
                                </div>
                                <div className="md:hidden ml-4">
                                    <Disclosure.Button className="p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                                        <span className="sr-only">Öppna huvudmenyn</span>
                                        {open ? <XIcon className="block h-7 w-7" aria-hidden="true" /> : <MenuIcon className="block h-7 w-7" aria-hidden="true" />}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Panel */}
                    <Disclosure.Panel className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigationLinks.map((item) => (
                                <Fragment key={item.name}>
                                    {item.type === 'link' ? (
                                        <Disclosure.Button
                                            as={Link}
                                            href={item.href}
                                            className={classNames(
                                                router.pathname === item.href ? 'bg-secondary text-white' : 'text-primary hover:bg-gray-extra-light hover:text-secondary',
                                                'block px-3 py-2 rounded-md text-base font-semibold'
                                            )}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ) : (
                                        // التعامل مع القائمة المنسدلة في وضع الموبايل
                                        <div className="pt-2">
                                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.name}</h3>
                                            <div className="mt-1 space-y-1">
                                                {item.subLinks.map((subLink) => (
                                                     <Disclosure.Button
                                                        key={subLink.name}
                                                        as={Link}
                                                        href={subLink.href}
                                                        className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-extra-light hover:text-secondary"
                                                    >
                                                        {subLink.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                        {/* Mobile Search */}
                        <div className="pt-4 pb-3 border-t border-gray-200 px-4">
                            <SearchWidget allRecipesData={allRecipesForSearch} placeholder="Sök recept..." />
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default PageHeader;