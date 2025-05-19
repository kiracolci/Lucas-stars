// Force Node.js runtime (critical for file uploads)
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    // Convert the File to a Buffer so we can upload it
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const blob = await put(`lucas-${randomUUID()}`, buffer, {
      access: 'public',
      contentType: file.type,
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
