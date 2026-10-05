import fs from 'fs';

async function testLargeUploadLocal() {
  const uploadData = new FormData();
  
  // Create a 3MB dummy string to simulate large image (although it's text, we just want to see if Next.js rejects it on size)
  const size = 3 * 1024 * 1024;
  const dummyBuffer = Buffer.alloc(size, 'a');
  
  const dummyFile = new Blob([dummyBuffer], { type: 'image/jpeg' });
  uploadData.append('file', dummyFile);

  console.log("Uploading 3MB file to local /api/upload...");
  try {
    const response = await fetch(`http://localhost:3000/api/upload`, {
      method: 'POST',
      body: uploadData,
    });
    
    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", text);
  } catch(e) {
    console.error("Fetch Error:", e);
  }
}

testLargeUploadLocal();
