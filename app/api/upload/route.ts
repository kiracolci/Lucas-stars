export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    console.log('🧾 Incoming form data:');
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}


    const file = formData.get('file');
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!(file instanceof File)) {
      console.error("❌ 'file' is not a File instance:", file);
      return NextResponse.json({ error: 'Invalid file format' }, { status: 400 });
    }

    if (!title) {
      console.error("❌ Missing title field");
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Vercel Blob
    const blob = await put(`lucas-${randomUUID()}`, buffer, {
      access: 'public',
      contentType: file.type,
    });

    console.log("✅ Upload successful:", blob.url);

    return NextResponse.json({
      url: blob.url,
      title,
      description,
    });
  } catch (err) {
    console.error('🔥 Upload failed with error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
