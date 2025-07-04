// 📁 app/api/ai/brainstorm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, count = 5, type = 'general', genre = 'general', language = 'thai' } = body;

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const systemPrompt = language === 'thai'
      ? 'คุณเป็นนักคิดสร้างสรรค์ที่สามารถระดมไอเดียใหม่ ๆ ได้หลากหลาย'
      : 'You are a creative thinker capable of generating diverse and innovative ideas';

    const userPrompt = language === 'thai'
      ? `ช่วยระดมความคิด ${count} ไอเดีย เกี่ยวกับหัวข้อ "${topic}" (${type} แนว ${genre})`
      : `Please brainstorm ${count} ideas on the topic "${topic}" (${type} type, ${genre} genre)`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.9
    });

    const ideas = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      topic,
      ideas,
      usage: completion.usage
    });
  } catch (error: any) {
    console.error('AI Brainstorm Error:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}