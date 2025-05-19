// Force Node.js runtime (critical for file uploads)
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Missing file or title' }, { status: 400 });
    }

    const blob = await put(`lucas-${randomUUID()}`, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      title,
      description,
    });
  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
