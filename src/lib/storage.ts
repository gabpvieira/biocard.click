import { BioPage } from "@/types/page";

const PAGES_LIST_KEY = "pages-list";
const PAGE_PREFIX = "page:";

// DEPRECATED: Este storage usa localStorage e será removido em breve
// Use supabaseStorage.ts para todas as operações de dados
export const storage = {
  getPagesList: (): string[] => {
    const data = localStorage.getItem(PAGES_LIST_KEY);
    return data ? JSON.parse(data) : [];
  },

  setPagesList: (slugs: string[]): void => {
    localStorage.setItem(PAGES_LIST_KEY, JSON.stringify(slugs));
  },

  getPage: (slug: string): BioPage | null => {
    const data = localStorage.getItem(`${PAGE_PREFIX}${slug}`);
    if (!data) return null;
    
    const page = JSON.parse(data);
    
    // Garantir que headerConfig existe (migração de dados antigos)
    if (!page.headerConfig) {
      page.headerConfig = {
        layout: 'bold',
        coverType: 'solid',
        coverColor: '#1a1a1a',
        tags: [],
        showActions: true,
      };
    }
    
    return page;
  },

  setPage: (page: BioPage): void => {
    localStorage.setItem(`${PAGE_PREFIX}${page.slug}`, JSON.stringify(page));
    
    const slugs = storage.getPagesList();
    if (!slugs.includes(page.slug)) {
      slugs.push(page.slug);
      storage.setPagesList(slugs);
    }
  },

  deletePage: (slug: string): void => {
    localStorage.removeItem(`${PAGE_PREFIX}${slug}`);
    
    const slugs = storage.getPagesList();
    const filtered = slugs.filter(s => s !== slug);
    storage.setPagesList(filtered);
  },

  getAllPages: (): BioPage[] => {
    const slugs = storage.getPagesList();
    return slugs
      .map(slug => storage.getPage(slug))
      .filter((page): page is BioPage => page !== null);
  },

  slugExists: (slug: string): boolean => {
    return storage.getPagesList().includes(slug);
  },

  updatePageSlug: (oldSlug: string, newSlug: string, page: BioPage): void => {
    storage.deletePage(oldSlug);
    storage.setPage({ ...page, slug: newSlug });
  }
};
