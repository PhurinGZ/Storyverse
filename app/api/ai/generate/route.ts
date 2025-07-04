// 📁 app/api/ai/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateSystemPrompt, generateUserPrompt } from '@/app/api/ai/utils/promptGenerators';
import { getMaxTokens, getTemperature } from '@/app/api/ai/utils/tokenUtils';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, prompt, genre = 'general', tone = 'neutral', length = 'medium', language = 'thai', context = {} } = body;

    if (!type || !prompt) {
      return NextResponse.json({ error: 'Type and prompt are required' }, { status: 400 });
    }

    const systemPrompt = generateSystemPrompt(type, genre, tone, language, context);
    const userPrompt = generateUserPrompt(type, prompt, length, context, language);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: getMaxTokens(length),
      temperature: getTemperature(type),
    });

    const content = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      content,
      type,
      usage: completion.usage,
      metadata: { genre, tone, length, language }
    });
  } catch (error: any) {
    console.error('AI Generate Error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
