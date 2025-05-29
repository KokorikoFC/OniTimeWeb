import React, { useState } from "react";
import "./FQA.css";
import { IoIosArrowDown } from "react-icons/io";

const faqData = [
    {
        q: "¿Cómo puedo descargar la aplicación?",
        a: "Puedes descargar la aplicación desde la tienda de aplicaciones de tu dispositivo.",
    },
    {
        q: "¿Es gratuita?",
        a: "Sí, la aplicación es completamente gratuita.",
    },
    {
        q: "¿Cómo puedo contactar con soporte?",
        a: "Puedes contactar con nuestro equipo de soporte a través del correo electrónico o redes sociales.",
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
            {open && (
                <div className="faq_answer">
                    <spam>{answer}</spam>
                </div>
            )}
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
