import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { storage } from "@/lib/storage";
import { BioPage, PageCard, HeaderLayout, CoverType } from "@/types/page";
import { validatePage, sanitizeSlug, ValidationError } from "@/lib/validation";
import { validateImage, convertToBase64, generateId } from "@/lib/imageUtils";
import { HeaderLayoutPreview } from "@/components/HeaderLayoutPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  Upload,
  X,
  Loader2,
  Palette,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminEditor = () => {
  const { slug: editSlug } = useParams();
  const isEditing = !!editSlug;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<Partial<BioPage>>({
    slug: "",
    name: "",
    photo: "",
    description: "",
    ctaText: "Conheça meus cursos ou entre em contato!",
    cards: [],
    headerConfig: {
      layout: 'bold',
      coverType: 'solid',
      coverColor: '#1a1a1a',
      tags: [],
      showActions: true,
    },
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }

    if (isEditing && editSlug) {
      const page = storage.getPage(editSlug);
      if (page) {
        setFormData(page);
      } else {
        toast({
          title: "Erro",
          description: "Página não encontrada",
          variant: "destructive",
        });
        navigate("/admin/dashboard");
      }
    }
  }, [isAuthenticated, isEditing, editSlug, navigate]);

  const handleSlugChange = (value: string) => {
    setFormData((prev) => ({ ...prev, slug: sanitizeSlug(value) }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      toast({ title: "Erro", description: error, variant: "destructive" });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, photo: base64 }));
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao processar imagem",
        variant: "destructive",
      });
    }
  };

  const handleCardImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    cardId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      toast({ title: "Erro", description: error, variant: "destructive" });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setFormData((prev) => ({
        ...prev,
        cards: prev.cards?.map((card) =>
          card.id === cardId ? { ...card, image: base64 } : card
        ),
      }));
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao processar imagem",
        variant: "destructive",
      });
    }
  };

  const addCard = () => {
    const newCard: PageCard = {
      id: generateId(),
      image: "",
      link: "",
    };
    setFormData((prev) => ({
      ...prev,
      cards: [...(prev.cards || []), newCard],
    }));
  };

  const removeCard = (cardId: string) => {
    setFormData((prev) => ({
      ...prev,
      cards: prev.cards?.filter((card) => card.id !== cardId),
    }));
  };

  const updateCardLink = (cardId: string, link: string) => {
    setFormData((prev) => ({
      ...prev,
      cards: prev.cards?.map((card) =>
        card.id === cardId ? { ...card, link } : card
      ),
    }));
  };

  const moveCard = (index: number, direction: "up" | "down") => {
    const cards = [...(formData.cards || [])];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return;

    [cards[index], cards[newIndex]] = [cards[newIndex], cards[index]];
    setFormData((prev) => ({ ...prev, cards }));
  };

  const handleSave = async () => {
    const validationErrors = validatePage(
      formData,
      isEditing ? editSlug : undefined
    );
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      toast({
        title: "Erro de validação",
        description: validationErrors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const now = new Date().toISOString();
    const pageData: BioPage = {
      slug: formData.slug!,
      name: formData.name!,
      photo: formData.photo!,
      description: formData.description!,
      ctaText: formData.ctaText || "Conheça meus cursos ou entre em contato!",
      cards: formData.cards!,
      createdAt: isEditing
        ? storage.getPage(editSlug!)?.createdAt || now
        : now,
      updatedAt: now,
    };

    if (isEditing && editSlug !== formData.slug) {
      storage.updatePageSlug(editSlug!, formData.slug!, pageData);
    } else {
      storage.setPage(pageData);
    }

    toast({
      title: isEditing ? "Página atualizada!" : "Página criada!",
      description: "As alterações foram salvas com sucesso.",
    });

    navigate("/admin/dashboard");
    setIsSaving(false);
  };

  const getFieldError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/15 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[130px] translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/dashboard")}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              {isEditing ? "Editar Página" : "Nova Página"}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="border-border/50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-accent hover:bg-accent/90"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Slug */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
            <Label className="text-foreground mb-2 block">Slug da URL</Label>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">/</span>
              <Input
                value={formData.slug || ""}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="minha-pagina"
                className="bg-background/50 border-border/50"
              />
            </div>
            {getFieldError("slug") && (
              <p className="text-destructive text-sm mt-2">
                {getFieldError("slug")}
              </p>
            )}
            <p className="text-muted-foreground text-xs mt-2">
              URL: {window.location.origin}/{formData.slug || "slug"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-foreground">
              Informações do Perfil
            </h2>

            {/* Photo */}
            <div>
              <Label className="text-foreground mb-2 block">
                Foto de Perfil
              </Label>
              <div className="flex items-center gap-4">
                {formData.photo ? (
                  <div className="relative">
                    <img
                      src={formData.photo}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-accent/30"
                    />
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, photo: "" }))
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-destructive-foreground" />
                    </button>
                  </div>
                ) : (
                  <label className="w-20 h-20 rounded-full border-2 border-dashed border-border/50 flex items-center justify-center cursor-pointer hover:border-accent/50 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
                {!formData.photo && (
                  <p className="text-muted-foreground text-sm">
                    JPG, PNG ou WebP. Máx 2MB
                  </p>
                )}
              </div>
              {getFieldError("photo") && (
                <p className="text-destructive text-sm mt-2">
                  {getFieldError("photo")}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <Label className="text-foreground mb-2 block">Nome</Label>
              <Input
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Nome do profissional"
                className="bg-background/50 border-border/50"
              />
              {getFieldError("name") && (
                <p className="text-destructive text-sm mt-2">
                  {getFieldError("name")}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="text-foreground mb-2 block">Descrição</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Uma breve descrição sobre você..."
                className="bg-background/50 border-border/50 min-h-[100px]"
              />
              {getFieldError("description") && (
                <p className="text-destructive text-sm mt-2">
                  {getFieldError("description")}
                </p>
              )}
            </div>

            {/* CTA Text */}
            <div>
              <Label className="text-foreground mb-2 block">
                Texto do CTA (opcional)
              </Label>
              <Input
                value={formData.ctaText || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ctaText: e.target.value }))
                }
                placeholder="Ex: Conheça meus cursos!"
                className="bg-background/50 border-border/50"
              />
            </div>
          </div>

          {/* Header Layout Configuration */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-accent" />
              <h2 className="font-semibold text-foreground">
                Configuração do Header
              </h2>
            </div>

            {/* Layout Selection */}
            <div>
              <Label className="text-foreground mb-3 block">Estilo do Header</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['clean', 'bold', 'minimal'] as HeaderLayout[]).map((layout) => (
                  <HeaderLayoutPreview
                    key={layout}
                    layout={layout}
                    isSelected={formData.headerConfig?.layout === layout}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        headerConfig: { ...prev.headerConfig!, layout },
                      }))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Cover Type */}
            <div>
              <Label className="text-foreground mb-3 block">Tipo de Capa</Label>
              <div className="grid grid-cols-3 gap-3">
                {(['solid', 'image', 'pattern'] as CoverType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        headerConfig: { ...prev.headerConfig!, coverType: type },
                      }))
                    }
                    className={`p-3 rounded-lg border transition-all ${
                      formData.headerConfig?.coverType === type
                        ? 'border-accent bg-accent/10'
                        : 'border-border/50 hover:border-accent/50'
                    }`}
                  >
                    <div className="text-sm text-foreground capitalize">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Color (if solid) */}
            {formData.headerConfig?.coverType === 'solid' && (
              <div>
                <Label className="text-foreground mb-2 block">Cor da Capa</Label>
                <div className="flex gap-3">
                  <Input
                    type="color"
                    value={formData.headerConfig?.coverColor || '#1a1a1a'}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        headerConfig: {
                          ...prev.headerConfig!,
                          coverColor: e.target.value,
                        },
                      }))
                    }
                    className="w-20 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formData.headerConfig?.coverColor || '#1a1a1a'}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        headerConfig: {
                          ...prev.headerConfig!,
                          coverColor: e.target.value,
                        },
                      }))
                    }
                    placeholder="#1a1a1a"
                    className="flex-1 bg-background/50 border-border/50"
                  />
                </div>
              </div>
            )}

            {/* Cover Image (if image) */}
            {formData.headerConfig?.coverType === 'image' && (
              <div>
                <Label className="text-foreground mb-2 block">Imagem de Capa</Label>
                {formData.headerConfig?.coverImage ? (
                  <div className="relative inline-block">
                    <img
                      src={formData.headerConfig.coverImage}
                      alt="Cover preview"
                      className="h-24 w-auto rounded-lg object-cover"
                    />
                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          headerConfig: {
                            ...prev.headerConfig!,
                            coverImage: undefined,
                          },
                        }))
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-destructive-foreground" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border/50 rounded-lg cursor-pointer hover:border-accent/50 transition-colors w-fit">
                    <Upload className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Upload imagem de capa
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const error = validateImage(file);
                        if (error) {
                          toast({ title: "Erro", description: error, variant: "destructive" });
                          return;
                        }
                        try {
                          const base64 = await convertToBase64(file);
                          setFormData((prev) => ({
                            ...prev,
                            headerConfig: {
                              ...prev.headerConfig!,
                              coverImage: base64,
                            },
                          }));
                        } catch {
                          toast({
                            title: "Erro",
                            description: "Falha ao processar imagem",
                            variant: "destructive",
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            )}

            {/* Tags */}
            <div>
              <Label className="text-foreground mb-2 block">
                Tags de Destaque
              </Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag (ex: Criador de Conteúdo)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.currentTarget;
                        const value = input.value.trim();
                        if (value && (formData.headerConfig?.tags.length || 0) < 5) {
                          setFormData((prev) => ({
                            ...prev,
                            headerConfig: {
                              ...prev.headerConfig!,
                              tags: [...(prev.headerConfig?.tags || []), value],
                            },
                          }));
                          input.value = '';
                        }
                      }
                    }}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.headerConfig?.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            headerConfig: {
                              ...prev.headerConfig!,
                              tags: prev.headerConfig!.tags.filter((_, idx) => idx !== i),
                            },
                          }))
                        }
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Pressione Enter para adicionar. Máximo 5 tags.
                </p>
              </div>
            </div>

            {/* Show Actions Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Mostrar Ações Rápidas</Label>
                <p className="text-xs text-muted-foreground">
                  Botões de copiar, compartilhar e contato
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    headerConfig: {
                      ...prev.headerConfig!,
                      showActions: !prev.headerConfig?.showActions,
                    },
                  }))
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.headerConfig?.showActions
                    ? 'bg-accent'
                    : 'bg-border/50'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    formData.headerConfig?.showActions
                      ? 'translate-x-6'
                      : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Cards Section */}
          <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Cards</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={addCard}
                className="border-border/50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Card
              </Button>
            </div>

            {getFieldError("cards") && (
              <p className="text-destructive text-sm">{getFieldError("cards")}</p>
            )}

            <div className="space-y-4">
              {formData.cards?.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-background/30 border border-border/30 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    {/* Reorder buttons */}
                    <div className="flex flex-col gap-1 pt-2">
                      <button
                        onClick={() => moveCard(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <GripVertical className="w-4 h-4 text-muted-foreground mx-auto" />
                      <button
                        onClick={() => moveCard(index, "down")}
                        disabled={index === (formData.cards?.length || 0) - 1}
                        className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* Card Image */}
                      <div>
                        <Label className="text-sm text-muted-foreground mb-2 block">
                          Imagem do Card
                        </Label>
                        {card.image ? (
                          <div className="relative inline-block">
                            <img
                              src={card.image}
                              alt={`Card ${index + 1}`}
                              className="h-20 w-auto rounded-lg object-cover"
                            />
                            <button
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  cards: prev.cards?.map((c) =>
                                    c.id === card.id ? { ...c, image: "" } : c
                                  ),
                                }))
                              }
                              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-destructive-foreground" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border/50 rounded-lg cursor-pointer hover:border-accent/50 transition-colors w-fit">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Upload imagem
                            </span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={(e) =>
                                handleCardImageUpload(e, card.id)
                              }
                              className="hidden"
                            />
                          </label>
                        )}
                        {getFieldError(`card-${index}-image`) && (
                          <p className="text-destructive text-sm mt-1">
                            {getFieldError(`card-${index}-image`)}
                          </p>
                        )}
                      </div>

                      {/* Card Link */}
                      <div>
                        <Label className="text-sm text-muted-foreground mb-2 block">
                          URL do Link
                        </Label>
                        <Input
                          value={card.link}
                          onChange={(e) =>
                            updateCardLink(card.id, e.target.value)
                          }
                          placeholder="https://..."
                          className="bg-background/50 border-border/50"
                        />
                        {getFieldError(`card-${index}-link`) && (
                          <p className="text-destructive text-sm mt-1">
                            {getFieldError(`card-${index}-link`)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCard(card.id)}
                      className="text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {(!formData.cards || formData.cards.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nenhum card adicionado</p>
                  <p className="text-sm">
                    Clique em "Adicionar Card" para começar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h3 className="font-semibold">Preview</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPreview(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              <PreviewContent data={formData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Preview Component
const PreviewContent = ({ data }: { data: Partial<BioPage> }) => {
  return (
    <div className="text-center">
      {data.photo ? (
        <img
          src={data.photo}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-accent/30"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto mb-4" />
      )}
      <h2 className="text-xl font-bold text-foreground mb-2">
        {data.name || "Nome"}
      </h2>
      <p className="text-muted-foreground text-sm mb-4">
        {data.description || "Descrição"}
      </p>
      {data.ctaText && (
        <p className="text-foreground font-medium mb-4">{data.ctaText}</p>
      )}
      <div className="space-y-3">
        {data.cards?.map((card, i) =>
          card.image ? (
            <img
              key={card.id}
              src={card.image}
              alt={`Card ${i + 1}`}
              className="w-full rounded-xl"
            />
          ) : (
            <div
              key={card.id}
              className="w-full h-20 bg-accent/10 rounded-xl flex items-center justify-center text-muted-foreground text-sm"
            >
              Card {i + 1}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminEditor;
