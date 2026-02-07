"use client";

import { useState, useEffect } from "react";
import styles from "./GalleryModal.module.css";

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
    // Placeholder images - typically this would come from an API or prop
    // Since we created public/assets/gallery, we explain how to use it
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";

            // Images found in public/assets/gallery
            setImages([
                "/assets/gallery/poster1.jpg",
                "/assets/gallery/poster2.jpeg"
            ]);

        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleImageClick = (img: string) => {
        setSelectedImage(img);
    };

    const handleCloseLightbox = () => {
        setSelectedImage(null);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeModalBtn} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.galleryHeader}>
                    <h2 className={styles.galleryTitle}>Movie Gallery</h2>
                </div>

                <div className={styles.galleryGrid}>
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <div key={index} className={styles.galleryItem} onClick={() => handleImageClick(img)}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img} alt={`Gallery ${index + 1}`} className={styles.galleryImage} />
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>No images found in gallery.</p>
                            <p className={styles.uploadHint}>
                                Upload your pictures to <code>public/assets/gallery</code> folder.
                                (Note: You will need to manually map them in the code for now unless we add a server-side list)
                            </p>
                            {/* 
                      TODO: To make this dynamic without a backend, 
                      we either need a JSON manifest of images or just hardcode a list here for the user to edit.
                    */}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <div className={styles.lightboxOverlay} onClick={handleCloseLightbox}>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeLightboxBtn} onClick={handleCloseLightbox}>
                            ✕
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={selectedImage} alt="Full size" className={styles.lightboxImage} />
                    </div>
                </div>
            )}
        </div>
    );
}
