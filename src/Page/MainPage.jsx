import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/audioCreate');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: '40px',
  };

  const boxes = [...Array(5)].map((_, index) => ({
    id: index,
    text: (index % 5) + 1,
  }));

  return (
    <div>
      <section className="banner">
        <div className="banner-video-container">
          <video className="banner-video" autoPlay loop muted>
            <source src="/videos/header.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="banner-overlay">
          <h1 className="banner-title">AudioArt</h1>
          <button className="start-button" onClick={handleStartClick}>지금 시작하기</button>
        </div>
      </section>

      <section className="scrolling-boxes">
        <Slider ref={sliderRef} {...settings}>
          {boxes.map((box) => (
            <div key={box.id} className="scroll-box">
              <img
                src={`https://via.placeholder.com/250?text=${box.text}`}
                alt={`Image ${box.text}`}
                className="scroll-image"
              />
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}

export default Main;
