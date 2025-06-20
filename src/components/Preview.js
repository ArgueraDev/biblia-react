import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:4000');

const styles = {
    body: {
        margin: 0,
        padding: 0,
        background: "transparent",
        fontFamily: "Arial, sans-serif",
    },
    displayVersiculo: {
        margin: "0 10px",
        fontSize: "2rem",
        padding: "1.5rem 2.5rem",
        background: "linear-gradient(90deg, rgba(30,30,30,0.95) 0%, rgba(60,60,60,0.85) 100%)",
        color: "white",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
        textAlign: "center",
        border: "2px solid rgb(56, 169, 235)",
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "none",
    },
    cita: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        color: "rgb(56, 169, 235)",
        letterSpacing: "1px",
        marginBottom: "0.7rem",
        textShadow: "1px 1px 8px #000, 0 0 2px rgb(56, 169, 235)",
    },
    verso: {
        fontSize: "2rem",
        fontWeight: 400,
        color: "#fff",
        lineHeight: 1.3,
        textShadow: "2px 2px 12px #000, 0 0 2px rgb(56, 169, 235)",
    },
};

function Preview() {
    const citaRef = useRef(null);
    const versoRef = useRef(null);
    const displayRef = useRef(null);

    useEffect(() => {
        function handleVerse(data) {
            if (
                data &&
                (data.citation || data.cita) &&
                (data.verse || data.texto)
            ) {
                if (citaRef.current) citaRef.current.textContent = data.citation || data.cita;
                if (versoRef.current) versoRef.current.textContent = data.verse || data.texto;
                if (displayRef.current) displayRef.current.style.display = "block";
            } else {
                if (displayRef.current) displayRef.current.style.display = "none";
            }
        }
        socket.on("storedVerse", handleVerse);
        return () => {
            socket.off("storedVerse", handleVerse);
        };
    }, []);

    return (
        <div style={styles.body}>
            <div id="displayVersiculo" ref={displayRef} style={styles.displayVersiculo}>
                <div id="cita" ref={citaRef} style={styles.cita}></div>
                <div id="verso" ref={versoRef} style={styles.verso}></div>
            </div>
        </div>
    );
}
export default Preview;