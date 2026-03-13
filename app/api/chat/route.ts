import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { ChatMessage } from '@/lib/types';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = 'You are the Cloudsurfing Jupiter AI assistant. Help authenticated users understand and use the features of the Cloudsurfing Jupiter platform: the music library (High Strung Music Library), lessons, and contact features. Be warm, helpful, and on-brand with the space/cosmic theme.';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];

    const completion = await client.responses.create({
      model: 'gpt-4.1',
      input: [
        { role: 'system', content: systemPrompt },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });

    return NextResponse.json({ reply: completion.output_text });
  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json({ error: 'Unable to reach the Cloudsurfing Jupiter assistant.' }, { status: 500 });
  }
}
