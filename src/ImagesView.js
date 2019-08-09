import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageThumbnail from './components/ImageThumbnail';

export default function ImageView(props) {
  const [album, setAlbum] = useState({
    images: []
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const albumId = props.match.params.albumId;

  function testForErrors(res) {
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };
  
  useEffect(() => {
    fetch(`/gallery/albums/${albumId}`)
    .then(res => testForErrors(res))
    .then(data => setAlbum(data))
    .catch(error => {
      console.error(error);
    });
  }, [albumId]);

  const sortedImages = album.images.sort();

  function showSlide(n) {
    console.log(n);
    // Enalble lightbox slides to wrap around
    n = n % sortedImages.length;
    if (n < 0) {
      n += sortedImages.length;
    }
  
    // Disable scrollbars on background elements
    document.body.style.overflow = 'hidden';
  
    setCurrentSlide(n);
    setLightboxVisible(true);
  }
  
  function hideSlide() {
    document.body.style.overflow = 'visible';
    setLightboxVisible(false);
  }
  
  return (
    <main>
      <div className="images-meta">
        <h1 className="name">{album.name}</h1>
        <span className="date">{album.date}</span>
        <span className="author"> | av {album.author}</span>
        <p className="description">{album.description}</p>
      </div>
      <div className="wrapper wrapper-images">
        {sortedImages.map((image, index) => (
          <ImageThumbnail 
            album={album.id} 
            image={image} 
            key={image} 
            onClick={() => {
              showSlide(index);
            }}
          />
        ))}
      </div>
      <div className="back-button">
        <Link to="/">
          &lt; Tillbaka
        </Link>
      </div>

      <div className="lightbox-wrapper" style={{ display: lightboxVisible ? 'block' : 'none' }}>
        <div className="lightbox-head">
         <a href={`/files/${album.id}/${sortedImages[currentSlide]}`}>
            <div className="lightbox-button lightbox-viewfull">
              &#9974;
            </div>
          </a>
          <div className="lightbox-button lightbox-close" onClick={hideSlide}>
            &#215;
          </div>
        </div>
        <div className="lightbox-main">
          <div
            className="lightbox-button lightbox-arrow lightbox-arrow-left"
            onClick={() => {
              showSlide(currentSlide - 1);
            }}
          >
            &#10094;
          </div>
          <img 
            className="lightbox-image" 
            src={`/gallery/files/${album.id}/${sortedImages[currentSlide]}`} 
            alt={sortedImages[currentSlide]}
          />
          <div
            className="lightbox-button lightbox-arrow lightbox-arrow-right"
            onClick={() => {
              showSlide(currentSlide + 1);
            }}
          >
            &#10095;
          </div>
        </div>
      </div>
    </main>
  );
}