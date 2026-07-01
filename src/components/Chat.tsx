"use client";
import { useState, useEffect, useRef } from "react";
import BackgroundImage from "./Chat/BackgroundImage";
import ChatInput from "./Chat/ChatInput";
import ChatResponse from "./Chat/ChatResponse";
import "../styles/home.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const welcomeMessage =
  "Olá! Sou a VMAI, a assistente pessoal de Vinicius Monteiro. Estou aqui para conversar e falar mais sobre ele, sua carreira, projetos e trajetória.";

const Chat = () => {
  const STORAGE_KEY = "vmai_chat_history_v1";

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as ChatMessage[];
      }
    } catch (err) {
      // ignore parse errors
      void err;
    }
    return [{ role: "assistant", content: welcomeMessage }];
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      }
    } catch (err) {
      // ignore storage errors
      void err;
    }
  }, [history]);

  const messageListRef = useRef<HTMLDivElement | null>(null);

  // scroll to bottom on new messages (like WhatsApp)
  useEffect(() => {
    const el = messageListRef.current;
    if (!el) return;
    // wait for DOM update
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, [history]);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) return;

    const updatedHistory = [...history, { role: "user", content: message }];
    setHistory(updatedHistory);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageHistory: updatedHistory }),
      });

      const data = await res.json();
      setHistory([
        ...updatedHistory,
        {
          role: "assistant",
          content: data.result || "⚠️ Sem resposta da IA.",
        },
      ]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? `Erro: ${err.message}`
          : "Erro: Ocorreu um erro desconhecido.";

      setHistory([...updatedHistory, { role: "assistant", content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <BackgroundImage src="/universe_right_half.png" alt="Vinicius Monteiro" />
      <div className="chat-content">
        <div className="chat-shell">
          <div className="chat-header whatsapp-header">
            <div className="whatsapp-left">
              <img src="/avatar_vinicius.svg" alt="VMAI" className="whatsapp-avatar" />
              <div>
                <div className="whatsapp-name">VMAI — Vinicius Monteiro</div>
                <div className="whatsapp-status">Online</div>
              </div>
            </div>
            <div className="whatsapp-right">⚙️</div>
          </div>
          <ChatResponse history={history} loading={loading} messageListRef={messageListRef} />
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            sendMessage={sendMessage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
