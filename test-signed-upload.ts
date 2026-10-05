import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'sqtbra0p',
  api_key: '915995262718817',
  api_secret: 'jNk2yxdjjgX0k9n18Ic-aAIjyZw',
});

async function testUploadCloudinary() {
  console.log("Generating signature...");
  const timestamp = Math.round((new Date).getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'illharlee_products' },
    'jNk2yxdjjgX0k9n18Ic-aAIjyZw'
  );

  const uploadData = new FormData();
  // dummy 1 pixel image
  const dummyPixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  const blob = new Blob([dummyPixel], { type: 'image/png' });
  uploadData.append('file', blob);
  uploadData.append('timestamp', timestamp.toString());
  uploadData.append('signature', signature);
  uploadData.append('api_key', '915995262718817');
  uploadData.append('folder', 'illharlee_products');

  console.log("Uploading with signed request...");
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/sqtbra0p/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch(e) {
    console.error("Fetch Error:", e);
  }
}

testUploadCloudinary();
