const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'data', 'index.ts');
let content = fs.readFileSync(file, 'utf8');

const unsplashImages = [
  'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800'
];

let counter = 0;
content = content.replace(/'\/products\/[^']+'/g, () => {
  const url = unsplashImages[counter % unsplashImages.length];
  counter++;
  return "'" + url + "'";
});

fs.writeFileSync(file, content, 'utf8');
console.log('Done replacing images in data/index.ts');
