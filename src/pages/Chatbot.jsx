// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react"; // Importamos useRef y useEffect

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Color principal de tu web
    const primaryColor = "#d5deaf"; // Verde/amarillo pastel
    const textColor = "#333333"; // Un gris oscuro para texto, más suave que el negro puro
    const accentColor = "#808080"; // Un gris para el texto del bot

    const backendUrl = "https://backend-54972464273.us-central1.run.app"; // ¡TU URL DE CLOUD RUN!

    // Referencia para el historial de chat para hacer scroll automático
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Efecto para hacer scroll al final cada vez que el historial de chat cambia
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, loading]); // También cuando el estado de carga cambia (para ver "escribiendo...")

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
                if (
                    response.status === 422 &&
                    errorData &&
                    Array.isArray(errorData.detail)
                ) {
                    errorMessage +=
                        ", Detalles: " +
                        errorData.detail
                            .map((err) => `${err.loc.join(".")} -> ${err.msg}`)
                            .join("; ");
                } else if (errorData && errorData.detail) {
                    errorMessage += `, Mensaje: ${
                        typeof errorData.detail === "string"
                            ? errorData.detail
                            : JSON.stringify(errorData.detail)
                    }`;
                } else {
                    errorMessage += `, Mensaje: ${JSON.stringify(errorData)}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Datos recibidos del backend:", data);
            const botMessage = {
                sender: "bot",
                text:
                    data.answer.trim() ||
                    "No se pudo obtener una respuesta de la IA.",
            };
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (err) {
            console.error("Error al comunicarse con el backend:", err);
            setChatHistory((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: `Error: ${
                        err.message || "No se pudo conectar con la IA."
                    }`,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Botón flotante para abrir el chatbot */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: "fixed",
                        bottom: "30px",
                        right: "30px",
                        width: "60px",
                        height: "63px",
                        borderRadius: "50%",
                        backgroundColor: "white", // Fondo blanco
                        color: textColor, // Color de texto para el botón (sin cambios)
                        border: "3px solid #987d62", // Borde marrón
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        fontSize: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 1000,
                        transition: "transform 0.3s ease-in-out",
                        transform: isOpen ? "scale(0)" : "scale(1)",
                        outline: "none", 
                    }}
                    title="Abrir Chatbot"
                >
                    <img
                        src="/assets/images/chat_icon_2.png"
                        alt=""
                        style={{
                            maxHeight: "100%",
                            display: "block",
                            margin: "auto",
                        }}
                    />
                </button>
            )}

            {/* Contenedor del Chatbot principal */}
            <div
                style={{
                    fontFamily: "Arial, sans-serif",
                    position: "fixed",
                    bottom: isOpen ? "20px" : "-500px", // Posición final al abrir, posición inicial al cerrar
                    right: isOpen ? "20px" : "-500px", // Posición final al abrir, posición inicial al cerrar
                    width: "380px",
                    height: "500px",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 999,
                    // **Asegúrate de que esta línea esté configurada así:**
                    transition:
                        "bottom 0.4s ease-out, right 0.4s ease-out, opacity 0.4s ease-out, visibility 0.4s ease-out", // Transiciones para todas las propiedades
                    // **Y estas también:**
                    visibility: isOpen ? "visible" : "hidden", // Controla la visibilidad
                    opacity: isOpen ? 1 : 0, // Controla la opacidad
                }}
            >
                {/* Cabecera del Chatbot con el botón de cerrar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 18px", // Más padding
                        backgroundColor: primaryColor, // Usa el color principal
                        color: textColor, // Texto oscuro sobre color principal
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        fontSize: "1.2rem", // Tamaño de fuente relativo
                        fontWeight: "bold",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Sombra suave en la cabecera
                    }}
                >
                    <span>Asistente Oni</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            background: "none",
                            border: "none",
                            color: textColor, // 'X' oscura
                            fontSize: "28px", // 'X' un poco más grande
                            cursor: "pointer",
                            padding: "0 8px",
                            lineHeight: "1", // Alineación vertical mejorada
                            fontWeight: "normal", // No tan negrita
                        }}
                        title="Cerrar Chatbot"
                    >
                        &times;
                    </button>
                </div>

                {/* Área de historial de chat */}
                <div
                    style={{
                        flexGrow: 1,
                        overflowY: "auto",
                        padding: "15px",
                        backgroundColor: "#f9f9f9", // Fondo claro para el chat
                        borderBottom: "1px solid #eee",
                    }}
                >
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                textAlign:
                                    msg.sender === "user" ? "right" : "left",
                                margin: "10px 0",
                            }}
                        >
                            <div
                                style={{
                                    display: "inline-block",
                                    padding: "10px 15px", // Más padding en los mensajes
                                    borderRadius: "20px", // Bordes más redondeados para los mensajes
                                    backgroundColor:
                                        msg.sender === "user"
                                            ? primaryColor
                                            : "#EBEBEB", // Color principal para usuario, gris suave para bot
                                    color:
                                        msg.sender === "user"
                                            ? textColor
                                            : accentColor, // Texto oscuro para usuario, gris oscuro para bot
                                    maxWidth: "85%", // Mensajes un poco más anchos
                                    wordBreak: "break-word",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)", // Sombra suave en los mensajes
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ textAlign: "left", margin: "10px 0" }}>
                            <div
                                style={{
                                    display: "inline-block",
                                    padding: "10px 15px",
                                    borderRadius: "20px",
                                    backgroundColor: "#EBEBEB",
                                    color: accentColor,
                                    maxWidth: "85%",
                                }}
                            >
                                Escribiendo...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />{" "}
                    {/* Elemento para hacer scroll al final */}
                </div>

                {/* Mensajes de error */}
                {error && (
                    <p
                        style={{
                            color: "red",
                            textAlign: "center",
                            padding: "0 15px 5px",
                            fontSize: "12px",
                        }}
                    >
                        {error}
                    </p>
                )}

                {/* Área de input y botón */}
                <div
                    style={{
                        display: "flex",
                        padding: "15px",
                        borderTop: "1px solid #eee",
                    }}
                >
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
                        style={{
                            flexGrow: 1,
                            padding: "12px",
                            border: "1px solid #ccc",
                            borderRadius: "25px", // Input de texto más redondeado
                            marginRight: "10px",
                            fontSize: "16px",
                            outline: "none", // Quitar borde de enfoque por defecto
                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)", // Sombra interna suave
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading}
                        style={{
                            padding: "12px 20px",
                            backgroundColor: primaryColor, // Botón con el color principal
                            color: textColor, // Texto oscuro para el botón
                            border: "none",
                            borderRadius: "25px", // Botón más redondeado
                            cursor: loading ? "not-allowed" : "pointer",
                            fontSize: "16px",
                            minWidth: "80px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Sombra en el botón
                            transition: "background-color 0.2s ease-in-out",
                            // Efecto hover
                            ":hover": {
                                backgroundColor: "#c0c89e", // Un tono ligeramente más oscuro del primaryColor al pasar el ratón
                            },
                        }}
                    >
                        {loading ? "..." : "Enviar"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chatbot;
