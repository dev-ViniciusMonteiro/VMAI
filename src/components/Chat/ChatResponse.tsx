import "@/styles/home.css";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const ChatResponse = ({
  history,
  loading,
  messageListRef,
}: {
  history: ChatMessage[];
  loading: boolean;
  messageListRef?: React.RefObject<HTMLDivElement | null>;
}) => {
  const formatResponse = (text: string) => {
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/https?:\/\/[^\s)>\]]+/g, (url) => {
        // remove trailing punctuation or mismatched enclosing characters commonly attached to URLs
        const cleanUrl = url.replace(/[)\]\.,!?:;"']*$/g, "");
        return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="chat-link">${cleanUrl}</a>`;
      });
    return { __html: formattedText };
  };

  return (
    <div className="chat-message-list" ref={messageListRef}>
      {history.map((message, index) => (
        <div
          key={`${message.role}-${index}`}
          className={`chat-bubble ${message.role === "user" ? "user" : "assistant"}`}
        >
          <div dangerouslySetInnerHTML={formatResponse(message.content)} />
        </div>
      ))}
      {loading && (
        <div className="chat-bubble assistant typing">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
};

export default ChatResponse;
