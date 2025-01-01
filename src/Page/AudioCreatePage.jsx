import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import RightSetting from '../Components/RightSetting';
import LeftSetting from '../Components/LeftSetting';
import './AudioCreatePage.css';

function AudioCreatePage() {
  const navigate = useNavigate();
  const [audioFile, setAudioFile] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [visualizationType, setVisualizationType] = useState('circle'); // 시각화 타입
  
  const canvasRef = useRef(null);
  const audioElmRef = useRef(null);

  const [backgroundColor, setBackgroundColor] = useState('#000');  // 배경색상
  const [barColor, setBarColor] = useState('#ffffff'); // 단색
  const [gradientColor, setGradientColor] = useState({   // 그라데이션 색상
    start: '#ff0000',
    end: '#0000ff',
  });

  const [useGradient, setUseGradient] = useState(false); // 그라데이션 사용 여부
  const [gradientDirection, setGradientDirection] = useState('horizontal'); // 그라데이션 방향 설정
  const getGradientCoordinates = (canvas) => { // 그라데이션 방향에 맞게 배치
    switch (gradientDirection) {
      case 'horizontal':
        return [0, canvas.height / 2, canvas.width, canvas.height / 2]; // 가로선
      case 'vertical':
        return [canvas.width / 2, 0, canvas.width / 2, canvas.height]; // 세로선
      case 'diagonal-ltr':
        return [0, 0, canvas.width, canvas.height]; // 왼쪽 위 -> 오른쪽 아래
      case 'diagonal-rtl':
        return [canvas.width, 0, 0, canvas.height]; // 오른쪽 위 -> 왼쪽 아래
      default:
        return [0, 0, canvas.width, canvas.height]; // 기본
    }
  };
  
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);

  // circle 세부설정
  const [circleSettings, setCircleSettings] = useState({
    radiusMultiplier: 8, // 원 반지름
    lineWidth: 3,        // 라인 두께
    lineStyle: 'solid',  // 라인 스타일
    fullCircle: 8,       // 겹치기
    HighFrequency: 3,    // 높은음 감지
    MinFrequency: 1      // 낮은음 감지
  });
  // dots 세부설정
  const [dotsSettings, setDotsSettings] = useState({
    Degree: 200,      // 중심점으로 부터 떨어지는 거리
    Radius: 100,      // 반지름
    DotsNumber: 100,  // 점 갯수
    DotsSize: 3,      // 점 사이즈
  });
  // spiral 세부설정
  const [spiralSettings, setSpiralSettings] = useState({
    spiralFactor: 1,        // 퍼짐의 정도
    angleIncrement: 0.1,    // 나선 각도
    barHeightFactor: 3,     // 소리에 대한 민감도
    minBarRadius: 2,        // ?
    showWhenNoSound: true,  // 소리가 없을 때 표시 여부
  });
  // Downlad 설정
  const [downloadSettings, setDownloadSettings] = useState({
    frameRate: 30,       // 녹화 프레임
    fileFormat: 'webm',  // 추출 파일
  });
  
  // 뒤로가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 파일 업로드
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(URL.createObjectURL(file));
    audioAnalyzer();
  };

  const audioAnalyzer = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;
    const source = audioCtx.createMediaElementSource(audioElmRef.current);
    source.connect(analyzer);
    source.connect(audioCtx.destination);
    source.onended = () => {
      source.disconnect();
    };
    setAudioContext(audioCtx);
    setAnalyser(analyzer);
  };

  // 시각화
  const visualizeAudio = () => {
    if (analyser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      const gradientCoordinates = getGradientCoordinates(canvas);
      const gradient = ctx.createLinearGradient(...gradientCoordinates);
      gradient.addColorStop(0, gradientColor.start);
      gradient.addColorStop(1, gradientColor.end);
  
      const getStrokeStyle = () => useGradient ? gradient : barColor;
  
      // 데이터 섞기
      const mixDataArray = () => {
        const mixedDataArray = [];
        const halfLength = Math.floor(bufferLength / 2);
  
        // 낮은 음과 높은 음을 번갈아서
        for (let i = 0; i < halfLength; i++) {
          mixedDataArray.push(dataArray[i]);
          mixedDataArray.push(dataArray[bufferLength - 1 - i]);
        }
        if (bufferLength % 2 !== 0) {
          mixedDataArray.push(dataArray[halfLength]);
        }
  
        return mixedDataArray;
      };
  
      const draw = () => {
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        const mixedDataArray = mixDataArray();
  
        // 원형 스펙트럼 시각화
        if (visualizationType === 'circle') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          const {
            radiusMultiplier,
            MinFrequency,
            HighFrequency
          } = circleSettings

          const radius = Math.min(canvas.width, canvas.height) / radiusMultiplier;
          const fullCircle = circleSettings.fullCircle * Math.PI;
  
          const adjustIntensity = (value, index, total) => {
            const frequencyRange = total / 2;
  
            // 높은 주파수 낮은 주파수 섞기
            if (index < frequencyRange) {
              return (Math.sqrt(value) / 255) * radius * MinFrequency;
            } else {
              return (value / 255) * radius * HighFrequency;
            }
          };
          
          // 소리가 없을때 최소 두께 
          const minimumHeight = 3;
          for (let i = 0; i < mixedDataArray.length; i++) {
            const angle = (i / mixedDataArray.length) * fullCircle;
            let barHeight = adjustIntensity(mixedDataArray[i], i, mixedDataArray.length);
            if (barHeight < minimumHeight) {
              barHeight = minimumHeight;
            }
  
            const xStart = centerX + Math.cos(angle) * radius;
            const yStart = centerY + Math.sin(angle) * radius;
            const xEnd = centerX + Math.cos(angle) * (radius + barHeight);
            const yEnd = centerY + Math.sin(angle) * (radius + barHeight);
  
            // 선 스타일 변경
            ctx.strokeStyle = getStrokeStyle();
            ctx.lineWidth = circleSettings.lineWidth;
            if (circleSettings.lineStyle === 'dashed') {
              ctx.setLineDash([5, 5]); // 점선 스타일
            } else {
              ctx.setLineDash([]); // 실선
            }
  
            ctx.beginPath();
            ctx.moveTo(xStart, yStart);
            ctx.lineTo(xEnd, yEnd);
            ctx.stroke();
          }
        }
  
        // 원형 점 시각화
        else if (visualizationType === 'dots') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const { Degree, DotsNumber, Radius, DotsSize } = dotsSettings;
  
          // 점 위치 계산
          const calculatePosition = (index, value) => {
            const angle = (index / DotsNumber) * 2 * Math.PI;
            const radius = Math.max((value / 255) * Degree, Radius);
            return {
              x: centerX + Math.cos(angle) * radius,
              y: centerY + Math.sin(angle) * radius,
            };
          };
  
          // 점 그리기
          for (let i = 0; i < DotsNumber; i++) {
            const value = mixedDataArray[i];
            const { x, y } = calculatePosition(i, value);
  
            ctx.fillStyle = getStrokeStyle();
            ctx.beginPath();
            ctx.arc(x, y, DotsSize, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
  
        // 물결
        else if (visualizationType === 'spiral') {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
  
          const {
            spiralFactor,
            angleIncrement,
            barHeightFactor,
            minBarRadius,
            showWhenNoSound,
          } = spiralSettings;
  
          // 그라데이션 설정
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, gradientColor.start);
          gradient.addColorStop(1, gradientColor.end);
  
          for (let i = 0; i < bufferLength; i++) {
            const angle = i * angleIncrement; // 나선의 각도
            const radius = i * spiralFactor + minBarRadius; // 반지름 증가
            const barHeight = (dataArray[i] / 255) * (i / barHeightFactor); // 막대 높이
  
            // 소리가 없을 때 (barHeight가 너무 낮을 때) 표시 여부 결정
            if (barHeight > 0 || showWhenNoSound) {
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;
  
              // 그라데이션
              ctx.fillStyle = useGradient ? gradient : barColor;
              ctx.beginPath();
              ctx.arc(x, y, Math.max(barHeight / 10, 1), 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        }
        requestAnimationFrame(draw);
      };
      draw();
    }
  };

  // 다운로드 설정 변경
  const handleDownloadSettingChange = (e) => {
    const { name, value } = e.target;
    setDownloadSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  useEffect(() => {
    if (audioContext && analyser) {
      const timeoutId = setTimeout(() => {
        visualizeAudio();
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [audioContext, analyser, visualizationType, barColor, gradientColor, gradientDirection, useGradient, circleSettings, dotsSettings, spiralSettings]);

  const handleRecording = () => {
    if (recording) {
      recorder.stop(); // 녹화 중지
      setRecording(false);
    } else {
      const canvas = canvasRef.current;
      const audioElement = audioElmRef.current;
  
      // 캔버스와 오디오 스트림 가져오기
      const canvasStream = canvas.captureStream(downloadSettings.frameRate); // 프레임
      const audioStream = audioElement.captureStream(); // 오디오 스트리밍
  
      // 비디오와 오디오 스트림 합치기
      const mixedStream = new MediaStream([
        ...canvasStream.getTracks(),
        ...audioStream.getTracks(),
      ]);
  
      // MediaRecorder 생성
      const mediaRecorder = new MediaRecorder(mixedStream, {
        mimeType: `video/${downloadSettings.fileFormat}; codecs=vp8`, // 코덱
        videoBitsPerSecond: 3000000, // 비트레이트
      });      

      const recordedChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
  
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: `video/${downloadSettings.fileFormat}` });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AudioArt.${downloadSettings.fileFormat}`;
        a.click();
        URL.revokeObjectURL(url);
      };
  
      // 녹화 시작
      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setRecording(true);
    }
  };

  
  return (
    <div className="container" style={{ backgroundColor: backgroundColor }} >
      <div className="left-panel">
        <LeftSetting
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
          barColor={barColor}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor} 
          setBarColor={setBarColor}
          gradientColor={gradientColor}
          setGradientColor={setGradientColor}
          useGradient={useGradient}
          setUseGradient={setUseGradient}
          handleGoBack={handleGoBack}
          onFileChange={onFileChange}
          gradientDirection={gradientDirection}
          setGradientDirection={setGradientDirection}
        />
        <div className="setting">
          <label>Download Settings</label>
          <hr />
          <div className="option">
            <label>Frame Rate</label>
            <select
              name="frameRate"
              value={downloadSettings.frameRate}
              onChange={handleDownloadSettingChange}
            >
              <option value={15}>15 fps</option>
              <option value={30}>30 fps</option>
              <option value={60}>60 fps</option>
            </select>
          </div>
          <div className="option">
            <label>File Format</label>
            <select
              name="fileFormat"
              value={downloadSettings.fileFormat}
              onChange={handleDownloadSettingChange}
            >
              <option value="webm">webm</option>
              <option value="mp4">mp4</option>
            </select>
          </div>
        </div>
        <label>Audio</label>
        <hr />
        <audio src={audioFile ?? ""} controls ref={audioElmRef} />
          <input
          type="file"
          accept="audio/*"
          onChange={onFileChange}
          style={{ display: "none" }}
          id="upload-button"
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
        >
          오디오 업로드
        </Button>
          <Button
          variant="contained"
          color="primary"
          onClick={handleRecording}
        >
          {recording ? '녹화 중지' : '녹화 시작'}
        </Button>
      </div>

      <div className="center-panel" style={{ backgroundColor: backgroundColor }} >
        <canvas ref={canvasRef} width="956" height="691" style={{ backgroundColor: backgroundColor }} />
      </div>

      <RightSetting
        visualizationType={visualizationType}
        circleSettings={circleSettings}
        setCircleSettings={setCircleSettings}
        dotsSettings={dotsSettings}
        setDotsSettings={setDotsSettings}
        spiralSettings={spiralSettings}
        setSpiralSettings={setSpiralSettings}
      />
    </div>
  );
}

export default AudioCreatePage;
