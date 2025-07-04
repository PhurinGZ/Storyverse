// 📁 app/api/ai/utils/promptGenerators.ts
import { LENGTH_INSTRUCTIONS, getLangKey } from './languageUtils';

export function generateUserPrompt(type: string, prompt: string, length: string, context: any, language: string): string {
  const langKey = getLangKey(language);
  const lengthText = LENGTH_INSTRUCTIONS[langKey][length as keyof typeof LENGTH_INSTRUCTIONS["thai"]];

  let contextInfo = '';
  if (context.characters) contextInfo += `\n\n${language === 'thai' ? 'ตัวละคร' : 'Characters'}: ${context.characters}`;
  if (context.setting) contextInfo += `\n\n${language === 'thai' ? 'สถานที่' : 'Setting'}: ${context.setting}`;
  if (context.previousEvents) contextInfo += `\n\n${language === 'thai' ? 'เหตุการณ์ก่อนหน้า' : 'Previous events'}: ${context.previousEvents}`;

  return `${prompt}\n\n${language === 'thai' ? 'ความยาว' : 'Length'}: ${lengthText}${contextInfo}`;
}
