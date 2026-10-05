import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the file to a base64 Data URI that cloudinary can upload directly
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const uploadResult = await cloudinary.uploader.upload(fileUri, {
      folder: 'illharlee_products'
    });

    return NextResponse.json({ secure_url: uploadResult.secure_url });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
