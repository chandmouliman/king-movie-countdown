import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

export default function Contact() {
    return (
        <div className={styles.container}>
            <main className={styles.main} style={{ alignItems: "flex-start", padding: "4rem 2rem", overflowY: "auto" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", color: "#fff", fontFamily: "var(--font-inter)" }}>
                    <h1 style={{ fontFamily: "var(--font-cinzel)", color: "#d4af37", fontSize: "3rem", marginBottom: "2rem" }}>
                        Contact Us
                    </h1>

                    <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "rgba(255,255,255,0.9)" }}>
                        Have questions, feedback, or suggestions about this countdown website? We'd love to hear from you!
                    </p>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Get in Touch</h2>
                        <p>You can reach us via email:</p>
                        <a href="mailto:srkhydfans@gmail.com" style={{
                            color: "#d4af37",
                            fontSize: "1.2rem",
                            textDecoration: "underline",
                            marginTop: "0.5rem",
                            display: "inline-block"
                        }}>
                            srkhydfans@gmail.com
                        </a>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Response Time</h2>
                        <p>We typically respond within 24 hours. Please be patient as this is a fan-made project maintained in our spare time.</p>
                    </section>

                    <section style={{ marginBottom: "3rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Follow Us</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {/* Instagram Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </div>
                                <a href="https://www.instagram.com/srkhydfan/" target="_blank" rel="noopener noreferrer" style={{ color: "#d4af37", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold" }}>
                                    @srkhydfan
                                </a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {/* X (Twitter) Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#d4af37">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </div>
                                <a href="https://x.com/SRKHydFans" target="_blank" rel="noopener noreferrer" style={{ color: "#d4af37", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold" }}>
                                    @SRKHydFans
                                </a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {/* Facebook Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </div>
                                <a href="https://www.facebook.com/SRKHydFans" target="_blank" rel="noopener noreferrer" style={{ color: "#d4af37", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold" }}>
                                    SRKHydFans
                                </a>
                            </div>
                        </div>
                    </section>

                    <Link href="/" style={{
                        display: "inline-block",
                        padding: "1rem 2rem",
                        border: "1px solid #d4af37",
                        borderRadius: "30px",
                        color: "#d4af37",
                        textDecoration: "none",
                        fontFamily: "var(--font-cinzel)",
                        fontWeight: "bold",
                        transition: "all 0.3s ease"
                    }}>
                        ← BACK TO COUNTDOWN
                    </Link>
                </div>
            </main>
        </div>
    );
}
