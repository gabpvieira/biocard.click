import profileImage from "@/assets/profile.png";
import bioPlatinado from "@/assets/bio-platinado.png";
import seguirInstagram from "@/assets/seguir-instagram.png";
import capaCursosGratis from "@/assets/capa-cursos-gratis.png";
import cardZapcorte from "@/assets/card-zapcorte.png";
import { ChevronDown } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/15 rounded-full blur-[100px] translate-x-1/3"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[130px] translate-y-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-56 h-56 bg-primary/15 rounded-full blur-[90px] translate-x-1/4"></div>
      
      <main className="w-full max-w-md mx-auto relative z-10">
        {/* Profile Section */}
        <section className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-6">
            <img
              src={profileImage}
              alt="Mozeli Barbeiro - Barbeiro Profissional"
              className="w-32 h-32 rounded-full object-cover profile-glow mx-auto"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Mozeli Barbeiro
          </h1>
          
          <p className="text-muted-foreground text-sm px-4 leading-relaxed mb-6">
            Barbeiro profissional especializado há mais de 5 anos. 
            Transformando vidas através da autoestima e excelência no corte.
          </p>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-foreground text-lg font-bold text-center">
              Conheça meus cursos<br />
              ou entre em contato!
            </p>
            <ChevronDown className="text-accent animate-pulse" size={32} strokeWidth={3} />
          </div>
        </section>

        {/* Links Section */}
        <section className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* ZapCorte */}
          <a
            href="https://www.zapcorte.com.br?src=MozeliBarbeiro"
            target="_blank"
            rel="noopener noreferrer"
            className="block link-card rounded-2xl overflow-hidden card-enter-1"
            aria-label="Acessar ZapCorte"
          >
            <img
              src={cardZapcorte}
              alt="ZapCorte - Sistema de agendamento para barbearias"
              className="w-full h-auto"
            />
          </a>

          {/* Cursos Grátis */}
          <a
            href="https://mozelibarbeiro-cursos.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block link-card rounded-2xl overflow-hidden card-enter-2"
            aria-label="Acessar cursos grátis"
          >
            <img
              src={capaCursosGratis}
              alt="Cursos Grátis - Acesse nossos cursos gratuitos"
              className="w-full h-auto"
            />
          </a>

          {/* Curso Platinado */}
          <a
            href="https://pay.cakto.com.br/3c2nivy_525940?src=bio-tiktok-insta"
            target="_blank"
            rel="noopener noreferrer"
            className="block link-card rounded-2xl overflow-hidden card-enter-3"
            aria-label="Acessar curso de platinado"
          >
            <img
              src={bioPlatinado}
              alt="Curso Bio Platinado - Aprenda técnicas profissionais de platinado"
              className="w-full h-auto"
            />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mozeli_barbeiro/"
            target="_blank"
            rel="noopener noreferrer"
            className="block link-card rounded-2xl overflow-hidden card-enter-4"
            aria-label="Seguir no Instagram @mozeli_barbeiro"
          >
            <img
              src={seguirInstagram}
              alt="Siga no Instagram - @mozeli_barbeiro"
              className="w-full h-auto"
            />
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8 text-muted-foreground text-xs">
          © 2025 Mozeli Barbeiro - Todos os direitos reservados
        </footer>
      </main>
    </div>
  );
};

export default Index;
