import { useState } from "react";
import { GALLERY_PHOTOS } from "../data/initialData";

export default function GalleryView() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (GALLERY_PHOTOS.length === 0) {
    return (
      <div className="empty-state album-empty">
        <div className="empty-icon" style={{ fontSize: "40px", marginBottom: "1rem" }}>🖼️</div>
        <h3 style={{ marginBottom: "0.5rem" }}>Your Family Album is Empty</h3>
        <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>
          Since you don't have individual faces, you can add group photos and family memories here!
          <br /><br />
          <strong>How to add photos:</strong><br />
          1. Copy your `.jpg` or `.png` files into the <code>public</code> folder of your project.<br />
          2. Open <code>src/data/initialData.js</code>.<br />
          3. Scroll to the bottom and add your photos to the <code>GALLERY_PHOTOS</code> array!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-view">
        <div className="album-grid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className="album-item"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img src={photo.src} alt={photo.caption} className="album-photo" loading="lazy" />
              {photo.caption && (
                <div className="album-caption">{photo.caption}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="lightbox-overlay open" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>✕</button>
          <img 
            src={selectedPhoto.src} 
            alt={selectedPhoto.caption} 
            className="lightbox-image" 
            onClick={(e) => e.stopPropagation()} 
          />
          {selectedPhoto.caption && (
            <div className="lightbox-caption">{selectedPhoto.caption}</div>
          )}
        </div>
      )}
    </>
  );
}
