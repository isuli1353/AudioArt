import React from 'react';
function LeftSetting({
  visualizationType,
  setVisualizationType,
  barColor,
  setBarColor,
  gradientColor,
  setGradientColor,
  useGradient,
  setUseGradient,
  handleGoBack,
  backgroundColor,
  setBackgroundColor,
  gradientDirection,
  setGradientDirection
}) {
  return (
    <>
      <button className="rotate-button" onClick={handleGoBack}>&#8592;</button>

      <div className="setting">
        <label>Visualization type</label>
        <hr />
        <div className="option">
          <label>
            Circular Spectrum <input type="radio" name="visualization" value="circle" 
              checked={visualizationType === 'circle'} 
              onChange={(e) => setVisualizationType(e.target.value)} 
            />
          </label>
        </div>
        <div className="option">
          <label>
            Dots <input type="radio" name="visualization" value="dots" 
              checked={visualizationType === 'dots'} 
              onChange={(e) => setVisualizationType(e.target.value)} 
            />
          </label>
        </div>
        <div className="option">
          <label>
            Spiral <input type="radio" name="visualization" value="spiral" 
              checked={visualizationType === 'spiral'} 
              onChange={(e) => setVisualizationType(e.target.value)} 
            />
          </label>
        </div>
      </div>

      <div className="setting">
        <label>Color</label>
        <hr />
        <div className="option">
          <label>BackgrounColor</label>
          <input 
            type="color" 
            value={backgroundColor} 
            onChange={(e) => setBackgroundColor(e.target.value)} 
          />
        </div>
        <div className="option">
          <label>Color</label>
          <input 
            type="color" 
            value={barColor} 
            onChange={(e) => setBarColor(e.target.value)} 
          />
        </div>

        <div className="option">
          <label>
            Use Gradient <input 
              type="checkbox" 
              checked={useGradient} 
              onChange={(e) => setUseGradient(e.target.checked)} 
            />
          </label>
        </div>

        {useGradient && (
          <>
            <hr />
            <div className="option">
              <label>Start Color</label>
              <input 
                type="color" 
                value={gradientColor.start} 
                onChange={(e) => setGradientColor({ ...gradientColor, start: e.target.value })} 
              />
            </div>
            <div className="option">
              <label>End Color</label>
              <input 
                type="color" 
                value={gradientColor.end} 
                onChange={(e) => setGradientColor({ ...gradientColor, end: e.target.value })} 
              />
            </div>
            <hr />
            <div className="option">
              <label>
                Horizontal <input type="radio" name="gradientDirection" value="horizontal"
                  checked={gradientDirection === 'horizontal'}
                  onChange={(e) => setGradientDirection(e.target.value)} 
                />
              </label>
            </div>
            <div className="option">
              <label>
                Vertical <input type="radio" name="gradientDirection" value="vertical"
                  checked={gradientDirection === 'vertical'}
                  onChange={(e) => setGradientDirection(e.target.value)} 
                />
              </label>
            </div>
            <div className="option">
              <label>
                Diagonal (Left to Right) <input type="radio" name="gradientDirection" value="diagonal-ltr"
                  checked={gradientDirection === 'diagonal-ltr'}
                  onChange={(e) => setGradientDirection(e.target.value)} 
                />
              </label>
            </div>
            <div className="option">
              <label>
                Diagonal (Right to Left) <input type="radio" name="gradientDirection" value="diagonal-rtl"
                  checked={gradientDirection === 'diagonal-rtl'}
                  onChange={(e) => setGradientDirection(e.target.value)} 
                />
              </label>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default LeftSetting;
