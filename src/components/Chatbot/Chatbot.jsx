import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css"; // Importa el archivo CSS

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const primaryColor = "#d5deaf";
    const textColor = "#473f34";
    const accentColor = "#808080";
    const backendUrl = "https://backend-54972464273.us-central1.run.app";
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, loading]);

    const sendMessage = async () => {
        if (message.trim() === "") return;

        const userMessage = { sender: "user", text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage("");

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${backendUrl}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question: userMessage.text }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                let errorMessage = `Error HTTP! Estado: ${response.status}`;
                if (response.status === 422 && errorData && Array.isArray(errorData.detail)) {
                    errorMessage += ", Detalles: " + errorData.detail.map((err) => `${err.loc.join(".")} -> ${err.msg}`).join("; ");
                } else if (errorData && errorData.detail) {
                    errorMessage += `, Mensaje: ${typeof errorData.detail === "string" ? errorData.detail : JSON.stringify(errorData.detail)}`;
                } else {
                    errorMessage += `, Mensaje: ${JSON.stringify(errorData)}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Datos recibidos del backend:", data);
            const botMessage = {
                sender: "bot",
                text: data.answer.trim() || "No se pudo obtener una respuesta de la IA.",
            };
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("Error al comunicarse con el backend:", err);
            setChatHistory((prev) => [
                ...prev,
                { sender: "bot", text: `Error: ${err.message || "No se pudo conectar con la IA."}` },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Botón flotante para abrir el chatbot */}
            {!isOpen && (
                <button onClick={() => setIsOpen(true)} className="floating-button" title="Abrir Chatbot">
                    <img src="/assets/images/chat_icon_2.png" alt="" className="chat-icon" />
                </button>
            )}

            {/* Contenedor del Chatbot principal */}
            <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
                {/* Cabecera del Chatbot con el botón de cerrar */}
                <div className="chatbot-header">
                    <span>Asistente Oni</span>
                    <button onClick={() => setIsOpen(false)} className="close-button" title="Cerrar Chatbot">
                        &times;
                    </button>
                </div>

                {/* Área de historial de chat */}
                <div className="chat-history">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`message-container ${msg.sender === "user" ? 'user' : 'bot'}`}>
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message-container bot">
                            <div className="message-bubble loading">
                                Escribiendo...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Mensajes de error */}
                {error && <p className="error-message">{error}</p>}

                {/* Área de input y botón */}
                <div className="input-area">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter" && !loading) {
                                sendMessage();
                            }
                        }}
                        placeholder="Escribe tu mensaje aquí..."
                        disabled={loading}
                        className="message-input"
                    />
                    <button onClick={sendMessage} disabled={loading} className="send-button">
                        {loading ? "..." : "Enviar"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chatbot;