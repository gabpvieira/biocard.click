import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const useMetaTags = ({ title, description, image, url }: MetaTagsProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'profile', true);
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }
    
    if (image) {
      updateMetaTag('og:image', image, true);
      updateMetaTag('og:image:width', '1200', true);
      updateMetaTag('og:image:height', '630', true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = 'Biocard - Link na Bio Premium';
    };
  }, [title, description, image, url]);
};
