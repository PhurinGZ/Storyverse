// 📁 app/api/ai/improve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getMaxTokens } from '@/app/api/ai/utils/tokenUtils';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function generateImprovePrompt(content: string, type: string, tone: string, language: string): string {
  const prefix = language === 'thai'
    ? 'กรุณาปรับปรุงเนื้อหาต่อไปนี้'
    : 'Please improve the following content';
  const toneInstruction = tone === 'maintain'
    ? (language === 'thai' ? 'โดยรักษาโทนเสียงเดิม' : 'while maintaining the original tone')
    : (language === 'thai' ? `และปรับโทนเสียงให้${tone}` : `and adjust tone to be ${tone}`);
  const typeInstruction = language === 'thai'
    ? `ประเภทการปรับปรุง: ${type}`
    : `Improvement type: ${type}`;

  return `${prefix} (${typeInstruction}, ${toneInstruction}):\n\n${content}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, improvementType = 'general', language = 'thai', tone = 'maintain' } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const systemPrompt = language === 'thai'
      ? 'คุณเป็นนักเขียนและบรรณาธิการที่เชี่ยวชาญในการปรับปรุงงานเขียนให้ดีขึ้น'
      : 'You are an expert editor and writer specialized in improving content';

    const userPrompt = generateImprovePrompt(content, improvementType, tone, language);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const improved = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      original: content,
      improved,
      usage: completion.usage
    });
  } catch (error: any) {
    console.error('AI Improve Error:', error);
    return NextResponse.json({ error: 'Failed to improve content' }, { status: 500 });
  }
}
