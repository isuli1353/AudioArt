import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AudioCreatePage.css';

function AudioCreatePage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="container">
      <div className="left-panel">
        <button
          className="rotate-button"
          onClick={handleGoBack}
        >
          ↻
        </button>

        <div className="setting">
          <label>Visualization type</label>
          <hr />
          <div className="option">
            <label>
             Waveform <input type="checkbox" />
            </label>
          </div>
          <div className="option">
            <label>
             Spectrum <input type="checkbox" />
            </label>
          </div>
          <div className="option">
            <label>
             Circular Spectrum <input type="checkbox" />
            </label>
          </div>
        </div>

        <div className="setting">
          <label>Color</label>
          <hr />
          <div className="option">
            <label>배경 색상</label>
            <input type="color" />
          </div>
          <div className="option">
            <label>파형/스펙트럼 색상</label>
            <input type="color" />
          </div>
          <div className="option">
            <label>
              <input type="checkbox" /> Use Gradient
            </label>
          </div>
          <div className="option">
            <label>시작 색상</label>
            <input type="color" />
          </div>
          <div className="option">
            <label>끝 색상</label>
            <input type="color" />
          </div>
          <div className="option">
            <label>그라데이션 방향</label>
            <select>
              <option value="left-to-right">좌에서 우</option>
              <option value="top-to-bottom">상에서 하</option>
              <option value="diagonal">대각선</option>
            </select>
          </div>
        </div>

        <div className="setting">
          <label>Sound</label>
          <hr />
          <div className="option">
            <label>Size</label>
            <input type="range" min="1" max="100" />
          </div>
          <div className="option">
            <label>
              Noise <input type="checkbox" />
            </label>
          </div>
        </div>
      </div>

      <div className="center-panel">
        <h2>Output</h2>
      </div>

      <div className="right-panel">
        <h2>Right Settings</h2> 
      </div>
    </div>
  );
}

export default AudioCreatePage;
