// lib/data-fetchers.js
import { connectToDatabase } from './mongodb';
import replaceUndefinedWithNull from './sanitize';
import fs from 'fs';
import path from 'path';

// --- دوال الصفحات والتصنيفات (تبقى كما هي) ---
export async function getPagesData() {
    const { db } = await connectToDatabase();
    const data = await db.collection('pages').find({}).toArray();
    return replaceUndefinedWithNull(JSON.parse(JSON.stringify(data)));
}

export async function getCategoriesData() {
    const { db } = await connectToDatabase();
    const data = await db.collection('categories').find({}).sort({ name: 1 }).toArray();
    return replaceUndefinedWithNull(JSON.parse(JSON.stringify(data)));
}


// --- الدالة المحدثة لجلب إعدادات الموقع ---
export async function getSiteConfigData() {
    // 1. قراءة الإعدادات الافتراضية من الملف المحلي
    const defaultConfigPath = path.join(process.cwd(), 'data', 'siteConfig.json');
    const defaultConfig = JSON.parse(fs.readFileSync(defaultConfigPath, 'utf8'));

    let dbConfig = {};
    try {
        // 2. محاولة جلب الإعدادات من قاعدة البيانات
        const { db } = await connectToDatabase();
        const dataFromDb = await db.collection('settings').findOne({ key: "main_settings" });
        if (dataFromDb) {
            dbConfig = dataFromDb;
        }
    } catch (error) {
        console.error("Could not fetch settings from DB, using local defaults. Error:", error);
        // في حال فشل الاتصال، سنستخدم فقط الإعدادات الافتراضية
    }

    // 3. دمج الإعدادات: القيم من قاعدة البيانات تتجاوز القيم الافتراضية
    // واستخدام JSON.parse(JSON.stringify(...)) للتخلص من أي أنواع بيانات غير صالحة مثل ObjectId
    const finalConfig = JSON.parse(JSON.stringify({
        ...defaultConfig,
        ...dbConfig
    }));
    
    return replaceUndefinedWithNull(finalConfig);
}