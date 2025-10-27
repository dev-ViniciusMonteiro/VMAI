'use client';

import { useState, useEffect } from 'react';
import './NaturaAvonPopup.css';

export default function NaturaAvonPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleVisitStore = () => {
    window.open('https://loja.vmai.com.br', '_blank');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={handleClose}>×</button>
        <div className="popup-header">
          <h2>🌿 Produtos Natura & Avon</h2>
        </div>
        <div className="popup-body">
          <p>
            Que tal comprar produtos <strong>Natura e Avon</strong> com segurança 
            no conforto da sua casa?
          </p>
          <p>
            Acesse já nosso painel otimizado do consultor!
          </p>
        </div>
        <div className="popup-actions">
          <button className="btn-visit" onClick={handleVisitStore}>
            Acessar Loja
          </button>
          <button className="btn-close" onClick={handleClose}>
            Não, obrigado
          </button>
        </div>
      </div>
    </div>
  );
}