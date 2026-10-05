import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const unsplashImages = [
  'https://images.unsplash.com/photo-1599643478524-498188af26d5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1605100804706-24ae51f379ea?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800'
];

async function updateCategoryImages() {
  const { data: categories } = await supabase.from('categories').select('id, slug');
  if (!categories) return;

  for (let i = 0; i < categories.length; i++) {
    const url = unsplashImages[i % unsplashImages.length];
    await supabase.from('categories').update({ image: url }).eq('id', categories[i].id);
    console.log(`Updated category ${categories[i].slug} with ${url}`);
  }
}
updateCategoryImages();
