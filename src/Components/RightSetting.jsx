import React from 'react';
import { Checkbox } from "@mui/material";

function RightSetting({
  visualizationType,
  circleSettings,
  setCircleSettings,
  dotsSettings,
  setDotsSettings,
  spiralSettings,
  setSpiralSettings,
}) {
  return (
    <div className="right-panel">
      {visualizationType === 'circle' && (
        <>
          <div className="option">
            <label>Radius Multiplier</label>
            <input 
              type="range" 
              min="6" 
              max="18" 
              step="0.1" 
              value={circleSettings.radiusMultiplier} 
              onChange={(e) => setCircleSettings({ ...circleSettings, radiusMultiplier: parseFloat(e.target.value) })}
            />
          </div>
          <div className="option">
            <label>Line Width</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={circleSettings.lineWidth} 
              onChange={(e) => setCircleSettings({ ...circleSettings, lineWidth: parseInt(e.target.value) })}
            />
          </div>
          <div className="option">
            <label>Line Style</label>
            <select 
              value={circleSettings.lineStyle} 
              onChange={(e) => setCircleSettings({ ...circleSettings, lineStyle: e.target.value })}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
            </select>
          </div>
          <div className="option">
            <label>FullCircle</label>
            <input 
              type="range" 
              min="1" 
              max="30" 
              step="1"
              value={circleSettings.fullCircle} 
              onChange={(e) => setCircleSettings({ ...circleSettings, fullCircle: parseInt(e.target.value) })}
            />
          </div>
          <div className="option">
            <label>HighFrequency</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.1"
              value={circleSettings.HighFrequency} 
              onChange={(e) => setCircleSettings({ ...circleSettings, HighFrequency: parseInt(e.target.value) })}
            />
          </div>
          <div className="option">
            <label>MinFrequency</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="0.1"
              value={circleSettings.MinFrequency} 
              onChange={(e) => setCircleSettings({ ...circleSettings, MinFrequency: parseInt(e.target.value) })}
            />
          </div>
        </>
      )}

      {visualizationType === 'dots' && (
        <>
          <div className="option">
    <label>Radius</label>
    <input 
      type="range" 
      min="20" 
      max="250" 
      step="10"
      value={dotsSettings.Radius} 
      onChange={(e) => setDotsSettings({ ...dotsSettings, Radius: parseInt(e.target.value) })} 
    />
  </div>
  <div className="option">
    <label>DotsNumber</label>
    <input 
      type="range" 
      min="10" 
      max="150" 
      step="1"
      value={dotsSettings.Dots} 
      onChange={(e) => setDotsSettings({ ...dotsSettings, DotsNumber: parseInt(e.target.value) })} 
    />
  </div>
  <div className="option">
    <label>Degree</label>
    <input 
      type="range" 
      min="50" 
      max="500" 
      step="10"
      value={dotsSettings.Degree} 
      onChange={(e) => setDotsSettings({ ...dotsSettings, Degree: parseInt(e.target.value) })} 
    />
  </div>
  <div className="option">
    <label>DotsSize</label>
    <input 
      type="range" 
      min="1" 
      max="5" 
      step="1"
      value={dotsSettings.DotsSize} 
      onChange={(e) => setDotsSettings({ ...dotsSettings, DotsSize: parseInt(e.target.value) })} 
    />
  </div>
        </>
      )}

      {visualizationType === 'spiral' && (
        <>
          <div className="option">
            <label>Spiral Factor</label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={spiralSettings.spiralFactor}
              onChange={(e) =>
                setSpiralSettings({ ...spiralSettings, spiralFactor: parseFloat(e.target.value) })
              }
            />
          </div>

          <div className="option">
            <label>Angle Increment</label>
            <input
              type="range"
              min="0.01"
              max="1"
              step="0.01"
              value={spiralSettings.angleIncrement}
              onChange={(e) =>
                setSpiralSettings({ ...spiralSettings, angleIncrement: parseFloat(e.target.value) })
              }
            />
          </div>

          <div className="option">
            <label>Bar Height Factor</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={spiralSettings.barHeightFactor}
              onChange={(e) =>
                setSpiralSettings({ ...spiralSettings, barHeightFactor: parseFloat(e.target.value) })
              }
            />
          </div>
          <Checkbox
  checked={spiralSettings.showWhenNoSound}
  onChange={(e) => {
    setSpiralSettings({
      ...spiralSettings,
      showWhenNoSound: e.target.checked,
    });
  }}
  label="소리가 없을 때 시각화 표시"
 />

        </>
      )}
    </div>
  );
}

export default RightSetting;
