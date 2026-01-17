import { supabase } from "./supabase";
import { BioPage, PageCard } from "@/types/page";

export const supabaseStorage = {
  // Get all pages
  getAllPages: async (): Promise<BioPage[]> => {
    const { data: pages, error } = await supabase
      .from("bio_pages")
      .select(`
        *,
        cards:page_cards(*)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pages:", error);
      return [];
    }

    return pages.map((page) => ({
      id: page.id,
      slug: page.slug,
      name: page.name,
      photo: page.photo || "",
      description: page.description || "",
      ctaText: page.cta_text || "",
      cards: (page.cards || [])
        .sort((a: any, b: any) => a.position - b.position)
        .map((card: any) => ({
          id: card.id,
          image: card.image || "",
          link: card.link,
        })),
      createdAt: page.created_at,
      updatedAt: page.updated_at,
    }));
  },

  // Get page by slug
  getPage: async (slug: string): Promise<BioPage | null> => {
    const { data: page, error } = await supabase
      .from("bio_pages")
      .select(`
        *,
        cards:page_cards(*)
      `)
      .eq("slug", slug)
      .single();

    if (error || !page) {
      console.error("Error fetching page:", error);
      return null;
    }

    return {
      id: page.id,
      slug: page.slug,
      name: page.name,
      photo: page.photo || "",
      description: page.description || "",
      ctaText: page.cta_text || "",
      cards: (page.cards || [])
        .sort((a: any, b: any) => a.position - b.position)
        .map((card: any) => ({
          id: card.id,
          image: card.image || "",
          link: card.link,
        })),
      createdAt: page.created_at,
      updatedAt: page.updated_at,
    };
  },

  // Check if slug exists
  slugExists: async (slug: string, excludeId?: string): Promise<boolean> => {
    let query = supabase.from("bio_pages").select("id").eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data } = await query.single();
    return !!data;
  },

  // Create or update page
  setPage: async (page: BioPage): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if page exists
      const { data: existingPage } = await supabase
        .from("bio_pages")
        .select("id")
        .eq("slug", page.slug)
        .single();

      const pageData = {
        slug: page.slug,
        name: page.name,
        photo: page.photo,
        description: page.description,
        cta_text: page.ctaText,
      };

      let pageId: string;

      if (existingPage) {
        // Update existing page
        const { error: updateError } = await supabase
          .from("bio_pages")
          .update(pageData)
          .eq("id", existingPage.id);

        if (updateError) throw updateError;
        pageId = existingPage.id;

        // Delete existing cards
        await supabase.from("page_cards").delete().eq("page_id", pageId);
      } else {
        // Insert new page
        const { data: newPage, error: insertError } = await supabase
          .from("bio_pages")
          .insert(pageData)
          .select("id")
          .single();

        if (insertError || !newPage) throw insertError;
        pageId = newPage.id;
      }

      // Insert cards
      if (page.cards && page.cards.length > 0) {
        const cardsData = page.cards.map((card, index) => ({
          page_id: pageId,
          image: card.image,
          link: card.link,
          position: index,
        }));

        const { error: cardsError } = await supabase
          .from("page_cards")
          .insert(cardsData);

        if (cardsError) throw cardsError;
      }

      return { success: true };
    } catch (error: any) {
      console.error("Error saving page:", error);
      return { success: false, error: error.message };
    }
  },

  // Delete page
  deletePage: async (slug: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.from("bio_pages").delete().eq("slug", slug);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting page:", error);
      return { success: false, error: error.message };
    }
  },

  // Upload image to storage
  uploadImage: async (
    file: File,
    path: string
  ): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${path}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("bio-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("bio-images").getPublicUrl(fileName);

      return { success: true, url: publicUrl };
    } catch (error: any) {
      console.error("Error uploading image:", error);
      return { success: false, error: error.message };
    }
  },

  // Delete image from storage
  deleteImage: async (url: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Extract file path from URL
      const urlParts = url.split("/bio-images/");
      if (urlParts.length < 2) {
        return { success: false, error: "Invalid URL" };
      }

      const filePath = urlParts[1];

      const { error } = await supabase.storage.from("bio-images").remove([filePath]);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("Error deleting image:", error);
      return { success: false, error: error.message };
    }
  },
};
