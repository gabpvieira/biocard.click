import { BioPage } from "@/types/page";

const PAGES_LIST_KEY = "pages-list";
const PAGE_PREFIX = "page:";

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
    return data ? JSON.parse(data) : null;
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

// Initialize with default page if empty
export const initializeDefaultPage = (): void => {
  if (storage.getPagesList().length === 0) {
    const defaultPage: BioPage = {
      slug: "mozeli-barbeiro",
      name: "Mozeli Barbeiro",
      photo: "",
      description: "Barbeiro profissional especializado há mais de 5 anos. Transformando vidas através da autoestima e excelência no corte.",
      ctaText: "Conheça meus cursos ou entre em contato!",
      cards: [
        {
          id: "card-zapcorte",
          image: "",
          link: "https://www.zapcorte.com.br?src=MozeliBarbeiro"
        },
        {
          id: "card-cursos",
          image: "",
          link: "https://mozelibarbeiro-cursos.vercel.app/"
        },
        {
          id: "card-platinado",
          image: "",
          link: "https://pay.cakto.com.br/3c2nivy_525940?src=bio-tiktok-insta"
        },
        {
          id: "card-instagram",
          image: "",
          link: "https://www.instagram.com/mozeli_barbeiro/"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    storage.setPage(defaultPage);
  }
};
