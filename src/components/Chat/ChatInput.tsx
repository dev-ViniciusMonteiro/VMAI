import "@/styles/home.css";

const ChatInput = ({
  userInput,
  setUserInput,
  sendMessage,
  loading,
}: {
  userInput: string;
  setUserInput: (value: string) => void;
  sendMessage: () => void;
  loading: boolean;
}) => (
  <div className="chat-input-container">
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => !loading && e.key === "Enter" && sendMessage()}
      className="chat-input-field"
      placeholder="Digite sua mensagem..."
      disabled={loading}
      aria-label="Mensagem para VMAI"
    />
    <button
      type="button"
      onClick={sendMessage}
      className={`chat-input-button ${loading ? "loading" : ""}`}
      disabled={loading}
      aria-label="Enviar mensagem"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
      <span className="chat-input-button-text">Enviar</span>
    </button>
  </div>
);

export default ChatInput;
