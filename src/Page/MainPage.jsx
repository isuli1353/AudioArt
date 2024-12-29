import React, { useRef, useState } from 'react';
import './MainPage.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Main() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

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
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const boxes = [...Array(20)].map((_, index) => ({
    id: index,
    text: (index % 5) + 1,
  }));

  return (
    <div>
      {/* 배너 섹션 */}
      <section className="banner">
        <div className="banner-video-container">
          <video className="banner-video" autoPlay loop muted>
            <source src="/videos/header.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="banner-overlay">
          <h1 className="banner-title">AudioArt</h1>
          <button className="start-button">지금 시작하기</button>
        </div>
      </section>

      {/* 스크롤 박스 섹션 */}
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