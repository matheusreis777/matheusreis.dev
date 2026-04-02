import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const FloatingWhatsApp = () => {
  const location = useLocation();
  
  // Ocultar o botão se estiver na página da Bíblia
  if (location.pathname.startsWith('/biblia')) {
    return null;
  }

  return (
    <a
      href="https://wa.me/5567991431860"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 transition-transform duration-300 hover:scale-110 hover:shadow-green-500/50 animate-fade-up stagger-5"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default FloatingWhatsApp;
