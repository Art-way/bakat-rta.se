module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layouts/**/*.{js,ts,jsx,tsx}',
        './templates/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // لوحة ألوان ترابية دافئة ومحترفة
                primary: '#4A2C2A', // بني شوكولاتة داكن للنصوص والعناوين الرئيسية
                secondary: '#D4AF37', // ذهبي دافئ للتأكيد والروابط
                background: '#F8F7F4', // أبيض عاجي خفيف للخلفية
                surface: '#FFFFFF', // أبيض نقي لأسطح البطاقات
                'surface-secondary': '#F1EFEA', // لون أفتح قليلاً للخلفيات الثانوية
                'gray-extra-light': '#EAE8E3',
            },
        },
        fontFamily: {
            // استخدام خطوط أنيقة وسهلة القراءة
            sora: ['var(--font-sora)', 'sans-serif'], // للعناوين الرئيسية (H1, H2, H3)
            poppins: ['var(--font-poppins)', 'sans-serif'], // للنصوص والفقرات
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
};