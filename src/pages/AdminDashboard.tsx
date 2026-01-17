import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { storage, initializeDefaultPage } from "@/lib/storage";
import { BioPage } from "@/types/page";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  LogOut,
  ExternalLink,
  FileText,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const [pages, setPages] = useState<BioPage[]>([]);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }

    initializeDefaultPage();
    loadPages();
  }, [isAuthenticated, navigate]);

  const loadPages = () => {
    setPages(storage.getAllPages());
  };

  const handleDelete = () => {
    if (deleteSlug) {
      storage.deletePage(deleteSlug);
      loadPages();
      toast({
        title: "Página excluída",
        description: "A página foi removida com sucesso.",
      });
      setDeleteSlug(null);
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/15 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[130px] translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie suas páginas de bio link
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/admin/editor")}
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Página
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-border/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Pages List */}
        {pages.length === 0 ? (
          <div className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma página criada
            </h2>
            <p className="text-muted-foreground mb-6">
              Comece criando sua primeira página de bio link
            </p>
            <Button
              onClick={() => navigate("/admin/editor")}
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Página
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {pages.map((page) => (
              <div
                key={page.slug}
                className="bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-4 md:p-6 transition-all hover:border-accent/30"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  {/* Page Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {page.photo ? (
                      <img
                        src={page.photo}
                        alt={page.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-accent/30 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-accent" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground truncate">
                        {page.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        /{page.slug}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        {page.cards.length} card{page.cards.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/${page.slug}`, "_blank")}
                      className="flex-1 md:flex-initial border-border/50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyLink(page.slug)}
                      className="flex-1 md:flex-initial border-border/50"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/editor/${page.slug}`)}
                      className="flex-1 md:flex-initial border-border/50"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteSlug(page.slug)}
                      className="flex-1 md:flex-initial border-destructive/50 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteSlug} onOpenChange={() => setDeleteSlug(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta página? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border/50">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
