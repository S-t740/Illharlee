import fs from 'fs';

async function testUpload() {
  const uploadData = new FormData();
  
  // Create a tiny dummy image (e.g. 1x1 pixel base64 or just text file to see error)
  const dummyFile = new Blob(['dummy content'], { type: 'text/plain' });
  uploadData.append('file', dummyFile);
  uploadData.append('upload_preset', 'ml_default');

  const cloudName = 'sqtbra0p';

  console.log("Uploading...");
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const data = await response.json();
    console.log(data);
  } catch(e) {
    console.error(e);
  }
}

testUpload();
