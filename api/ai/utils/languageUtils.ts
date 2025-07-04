// 📁 app/api/ai/utils/languageUtils.ts
export const LENGTH_INSTRUCTIONS = {
  thai: {
    short: 'สั้นและกระชับ (1-2 ย่อหน้า)',
    medium: 'ความยาวปานกลาง (3-4 ย่อหน้า)',
    long: 'ยาวและมีรายละเอียด (5-6 ย่อหน้า)',
    very_long: 'ยาวมาก (7+ ย่อหน้า)'
  },
  en: {
    short: 'Short and concise (1-2 paragraphs)',
    medium: 'Moderate length (3-4 paragraphs)',
    long: 'Long and detailed (5-6 paragraphs)',
    very_long: 'Very long (7+ paragraphs)'
  }
};

export const getLangKey = (lang: string) => (lang === 'thai' ? 'thai' : 'en');
