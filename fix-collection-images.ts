import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const unsplashImages = [
  'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'
];

async function updateCollectionImages() {
  const { data: collections } = await supabase.from('collections').select('id, slug');
  if (!collections) return;

  for (let i = 0; i < collections.length; i++) {
    const url = unsplashImages[i % unsplashImages.length];
    await supabase.from('collections').update({ image: url }).eq('id', collections[i].id);
    console.log(`Updated ${collections[i].slug} with ${url}`);
  }
}
updateCollectionImages();
