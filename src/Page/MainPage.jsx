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
    autoplaySpeed: 5000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: '40px',
    draggable: false,
  };


  // 예비 설정
  const boxes = [
    {
      id: 0,
      settings: {
        visualizationType: 'circle',    // 시각화 타입
        useGradient: true,              // 그라데이션 여부
        gradientColor: {
          start: '#e91b1b',
          end: '#0000ff',
        },
        gradientDirection: 'vertical', // 그라데이션 방향
        circleSettings: {
          radiusMultiplier: 8,         // 원 반지름
          lineWidth: 3,                // 라인 두께
          lineStyle: 'solid',          // 라인 스타일
          fullCircle: 8,               // 겹치기
          HighFrequency: 3,            // 높은음 감지
          MinFrequency: 1              // 낮은음 감지
        }
      },
      image: '../imgs/임시사진1.png'
    },
    {
      id: 1,
      settings: {
        visualizationType: 'dots',        // 시각화 타입
        useGradient: true,                // 그라데이션 여부
        gradientColor: {                  // 그라데이션 색상
          start: '#00ff2f',
          end: '#ff0000',
        },
        gradientDirection: 'diagonal-ltr', // 그라데이션 방향
        dotsSettings: {
          Degree: 200,                     // 중심점으로 부터 떨어지는 거리
          Radius: 100,                     // 반지름
          DotsNumber: 100,                 // 점 갯수
          DotsSize: 3,                     // 점 사이즈
        }
      },
      image: '../imgs/임시사진2.png'
    },
    {
      id: 2,
      settings: {
        visualizationType: 'spiral', // 시각화 타입
        useGradient: false,          // 그라데이션 여부
        barColor : '#ffffff',      // 단색 색상
        spiralSettings: {
          spiralFactor: 1,            // 퍼짐의 정도
          angleIncrement: 0.1,        // 나선 각도
          barHeightFactor: 3,         // 소리에 대한 민감도
          showWhenNoSound: false,      // 소리가 없을 때 표시 여부
        }
      },
      image: '../imgs/임시사진3.png'
    },
    {
      id: 3,
      settings: {
        visualizationType: 'circle',  // 시각화 타입
        useGradient: false,           // 그라데이션 여부
        barColor : '#ff0000',       // 단색 색상
        circleSettings: {
          radiusMultiplier: 8,        // 원 반지름
          lineWidth: 3,               // 라인 두께
          lineStyle: 'dashed',        // 라인 스타일
          fullCircle: 8,              // 겹치기
          HighFrequency: 3,           // 높은음 감지
          MinFrequency: 1             // 낮은음 감지
        }
      },
      image: '../imgs/임시사진4.png'
    }
  ];
  
  const handleBoxClick = (settings) => {
    navigate('/audioCreate', { state: { settings } });
  };

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
            <div key={box.id} className="scroll-box" onClick={() => handleBoxClick(box.settings)}>
              <img
                src={box.image}
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
