import Link from "next/link";
import styles from "../page.module.css";

export default function PrivacyPolicy() {
    return (
        <div className={styles.container}>
            <main className={styles.main} style={{ alignItems: "flex-start", padding: "4rem 2rem", overflowY: "auto" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto", color: "#fff", fontFamily: "var(--font-inter)" }}>
                    <h1 style={{ fontFamily: "var(--font-cinzel)", color: "#d4af37", fontSize: "3rem", marginBottom: "2rem" }}>
                        Privacy Policy
                    </h1>

                    <p style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.7)" }}>
                        <strong>Effective Date:</strong> February 7, 2026
                    </p>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Information We Collect</h2>
                        <p>This website does not directly collect personal information from users. However, we use third-party services that may collect information used to identify you.</p>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Google AdSense</h2>
                        <p>This website uses Google AdSense, a service for displaying advertisements. Google AdSense uses cookies, including the DoubleClick cookie, to show ads to users based on their visits to this and other websites on the Internet.</p>
                        <p style={{ marginTop: "0.5rem" }}>Users may opt out of personalized advertising by visiting Google Ads Settings.</p>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Cookies</h2>
                        <p>This website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings, though this may affect certain features of the website.</p>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Third-Party Links</h2>
                        <p>This website may contain links to external sites. We are not responsible for the content or privacy practices of those sites.</p>
                    </section>

                    <section style={{ marginBottom: "2rem" }}>
                        <h2 style={{ color: "#d4af37", marginBottom: "1rem" }}>Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
                    </section>

                    <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "3rem 0" }} />

                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", marginBottom: "2rem" }}>
                        This is a fan-made countdown website. All rights belong to their respective owners. This site is not affiliated with or endorsed by the official King movie production.
                    </p>

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
