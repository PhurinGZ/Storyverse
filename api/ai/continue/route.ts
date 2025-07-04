// 📁 app/api/ai/continue/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getMaxTokens } from '@/app/api/ai/utils/tokenUtils';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentContent, tone = 'neutral', length = 'medium', direction = 'auto', language = 'thai' } = body;

    if (!currentContent) {
      return NextResponse.json({ error: 'Current content is required' }, { status: 400 });
    }

    const systemPrompt = `${language === 'thai' ? 'คุณเป็นนักเขียนที่ต่อเรื่องได้ลื่นไหลและสอดคล้องกัน' : 'You are a writer who continues stories smoothly and consistently'}`;
    const userPrompt = `${language === 'thai' ? 'กรุณาต่อเรื่องจากเนื้อหานี้:' : 'Please continue the story from:'}\n\n${currentContent}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: getMaxTokens(length),
      temperature: 0.8
    });

    const continuation = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      continuation,
      usage: completion.usage
    });
  } catch (error: any) {
    console.error('AI Continue Error:', error);
    return NextResponse.json({ error: 'Failed to continue content' }, { status: 500 });
  }
}
