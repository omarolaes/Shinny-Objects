import React, { useEffect, useRef } from 'react';
import '../assets/RoundButton.css';

const RoundButton = () => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) {
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotionEvent, true);
      }
    } else {
      document.addEventListener('mousemove', handleMouseEvent);
    }
    accessCamera(null, true, 'user');

    return () => {
      if (isMobile) {
        window.removeEventListener('devicemotion', handleMotionEvent, true);
      } else {
        document.removeEventListener('mousemove', handleMouseEvent);
      }
    };
  }, []);

  const accessCamera = (videoId, activateAll, facingMode) => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: facingMode || 'environment',
        },
      })
      .then((stream) => {
        if (activateAll) {
          video1Ref.current.srcObject = stream;
          video2Ref.current.srcObject = stream;
          video1Ref.current.style.opacity = 0.3;
          video2Ref.current.style.opacity = 0.3;
        } else {
          document.querySelector('#' + videoId).srcObject = stream;
        }
      })
      .catch((err) => {
        console.log('Error: ' + err);
      });
  };

  const handleMotionEvent = (event) => {
    const accX = event.accelerationIncludingGravity.x;
    const accY = event.accelerationIncludingGravity.y;
    const accZ = event.accelerationIncludingGravity.z;
    console.log('Acceleration X: ' + accX + ' Y: ' + accY + ' Z: ' + accZ);
  };

  const handleMouseEvent = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  };

  return (
    <>
    <div className="circle_button">
        <a href="#" className="button_reflect">
          <div className="colors"></div>
          <video ref={video1Ref} id="camera-video-1" width="640" height="480" autoPlay></video>
        </a>
      </div>
      <video ref={video2Ref} id="camera-video-2" width="640" height="480" autoPlay></video>
    </>
  );
};

export default RoundButton;