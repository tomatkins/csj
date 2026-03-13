import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { ChatMessage } from '@/lib/types';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = 'You are the Cloudsurfing Jupiter AI assistant. Help authenticated users understand and use the features of the Cloudsurfing Jupiter platform: the music library (High Strung Music Library), lessons, and contact features. Be warm, helpful, and on-brand with the space/cosmic theme.';
const MAX_MESSAGE_LENGTH = 4000;
const MAX_MESSAGE_HISTORY = 20;

function isValidRole(role: unknown): role is ChatMessage['role'] {
  return role === 'user' || role === 'assistant';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown };

    if (!Array.isArray(body.messages)) {
      return NextResponse.json({ error: 'Messages must be provided as an array.' }, { status: 400 });
    }

    if (body.messages.length === 0) {
      return NextResponse.json({ error: 'At least one message is required.' }, { status: 400 });
    }

    if (body.messages.length > MAX_MESSAGE_HISTORY) {
      return NextResponse.json({ error: `Message history cannot exceed ${MAX_MESSAGE_HISTORY} messages.` }, { status: 400 });
    }

    const messages: ChatMessage[] = [];

    for (const entry of body.messages) {
      if (!entry || typeof entry !== 'object') {
        return NextResponse.json({ error: 'Each message must be an object.' }, { status: 400 });
      }

      const role = 'role' in entry ? entry.role : undefined;
      const content = 'content' in entry ? entry.content : undefined;

      if (!isValidRole(role) || typeof content !== 'string') {
        return NextResponse.json({ error: 'Each message must include a valid role and string content.' }, { status: 400 });
      }

      const trimmedContent = content.trim();

      if (!trimmedContent) {
        return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400 });
      }

      if (trimmedContent.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json({ error: `Each message must be ${MAX_MESSAGE_LENGTH} characters or less.` }, { status: 400 });
      }

      messages.push({ role, content: trimmedContent });
    }

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
