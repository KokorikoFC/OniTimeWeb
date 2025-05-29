import React, { useState } from "react";
import "./FQA.css";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";


const faqData = [
  {
    q: "¿Cómo puedo descargar la aplicación?",
    a: "Puedes descargar la aplicación directamente desde esta página o a través de la tienda de aplicaciones en tu dispositivo.",
  },
  {
    q: "¿La aplicación es gratuita?",
    a: "Sí, la aplicación es completamente gratuita y no requiere pagos para acceder a sus funciones principales.",
  },
  {
    q: "¿En qué dispositivos está disponible la aplicación?",
    a: "Actualmente, la aplicación está disponible para dispositivos Android.",
  },
  {
    q: "¿Puedo cambiar el tema o el idioma de la aplicación?",
    a: "Sí, puedes personalizar tanto el tema como el idioma desde el menú de configuración dentro de la app.",
  },
  {
    q: "¿Es necesario registrarse para usar la aplicación?",
    a: "No es obligatorio registrarse para explorar la app. Sin embargo, algunas funciones personalizadas solo estarán disponibles si creas una cuenta.",
  },
];


function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <li
            className={`faq_item ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
        >
            <div className="faq_question">
                <p>{question}</p>
                <span className={`faq_toggle_icon ${open ? "rotated" : ""}`}>
                    <IoIosArrowDown />
                </span>
            </div>
            <AnimatePresence>
  {open && (
    <motion.div
      className="faq_answer"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span>{answer}</span>
    </motion.div>
  )}
</AnimatePresence>

        </li>
    );
}

export default function FAQ() {
    return (
        <div className="faq_container">
            <ul className="faq_list">
                {faqData.map((item, index) => (
                    <React.Fragment key={index}>
                        <FAQItem question={item.q} answer={item.a} />
                        <hr />
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}
