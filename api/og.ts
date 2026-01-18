import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface PageData {
  name: string;
  description: string;
  photo: string;
  slug: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).send('Missing slug parameter');
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch page data
    const { data: pageData, error } = await supabase
      .from('pages')
      .select('name, description, photo, slug')
      .eq('slug', slug)
      .single();

    if (error || !pageData) {
      return res.status(404).send('Page not found');
    }

    const page = pageData as PageData;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'biocard.click';
    const siteUrl = `${protocol}://${host}`;
    const pageUrl = `${siteUrl}/${page.slug}`;
    const imageUrl = page.photo || `${siteUrl}/iconfavoricon.png`;
    const escapedName = page.name.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedDescription = (page.description || 'Confira meus links e conteúdos').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Generate HTML with meta tags
    const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>${escapedName} | Biocard</title>
    <meta name="title" content="${escapedName} | Biocard" />
    <meta name="description" content="${escapedDescription}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="profile" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:title" content="${escapedName}" />
    <meta property="og:description" content="${escapedDescription}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Biocard" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${pageUrl}" />
    <meta name="twitter:title" content="${escapedName}" />
    <meta name="twitter:description" content="${escapedDescription}" />
    <meta name="twitter:image" content="${imageUrl}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${pageUrl}" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/iconfavoricon.png" />
    <link rel="apple-touch-icon" href="/iconfavoricon.png" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Redirect to actual page for browsers -->
    <script>
      // Only redirect if not a bot/crawler
      if (!/bot|crawler|spider|crawling/i.test(navigator.userAgent)) {
        window.location.href = '/${page.slug}';
      }
    </script>
    <noscript>
      <meta http-equiv="refresh" content="0; url=/${page.slug}" />
    </noscript>
  </head>
  <body>
    <div id="root">
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #fff; font-family: 'Poppins', sans-serif;">
        <div style="text-align: center; max-width: 400px; padding: 2rem;">
          ${page.photo ? `<img src="${page.photo}" alt="${escapedName}" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 1.5rem; object-fit: cover;" />` : ''}
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">${escapedName}</h1>
          <p style="color: #999; margin-bottom: 2rem;">${escapedDescription}</p>
          <p style="color: #666; font-size: 0.875rem;">Carregando...</p>
        </div>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error generating OG page:', error);
    return res.status(500).send('Internal server error');
  }
}
