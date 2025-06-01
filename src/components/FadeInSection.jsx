// components/FadeInSection.js
import React from "react";
import { motion } from "framer-motion";

const FadeInSection = ({
    children,
    className = "",
    y = 30,
    duration = 0.6,
    delay = 0,
    ...rest
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration, ease: "easeOut", delay }}
            viewport={{ once: true, amount: 0.2 }}
            {...rest}
        >
            {children}
        </motion.div>
    );
};

export default FadeInSection;
