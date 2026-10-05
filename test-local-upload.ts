import fs from 'fs';

async function testUploadLocal() {
  const uploadData = new FormData();
  
  // Create a dummy text file Blob
  const dummyFile = new Blob(['dummy content for testing image upload endpoint'], { type: 'text/plain' });
  uploadData.append('file', dummyFile);

  console.log("Uploading to local /api/upload...");
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

testUploadLocal();
