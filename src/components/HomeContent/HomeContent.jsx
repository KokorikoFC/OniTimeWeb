import React from 'react'

function HomeContent( children, bgColor  ) {
  return (
    <section
      style={{
        backgroundColor: bgColor,
        padding: "2rem",
        color: bgColor === "white" ? "#000" : "#fff",
      }}
    >
      {children}
    </section>
  );
}

export default HomeContent