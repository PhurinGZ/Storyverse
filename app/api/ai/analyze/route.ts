// 📁 app/api/ai/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, analysisType = 'general', language = 'thai' } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const systemPrompt = language === 'thai'
      ? 'คุณเป็นนักวิเคราะห์วรรณกรรมที่เชี่ยวชาญในการวิเคราะห์โครงสร้าง ตัวละคร และธีม'
      : 'You are a literary analyst skilled in analyzing structure, characters, and themes';

    const userPrompt = language === 'thai'
      ? `ช่วยวิเคราะห์เนื้อหานี้ (${analysisType}):\n\n${content}`
      : `Please analyze this content (${analysisType}):\n\n${content}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.4
    });

    const analysis = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      analysis,
      usage: completion.usage
    });
  } catch (error: any) {
    console.error('AI Analyze Error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}