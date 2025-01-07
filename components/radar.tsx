'use client'
import { Rocket } from 'lucide-react';
import React from 'react';

const RadialPatternWithRadar = () => {
  const numLines = 7;
  const numCircles = 5;
  const trailAngle = 120; // Degrees between main line and trail line

  // Calculate lines
  const lines = Array.from({ length: numLines }, (_, i) => {
    const lineAngle = (Math.PI * i) / (numLines - 1);
    const x2 = 200 + Math.cos(lineAngle) * 400;
    const y2 = 300 - Math.sin(lineAngle) * 400;
    return { x2, y2 };
  });

  return (
    <div className="relative w-full h-[350px] bg-black overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-[90%]"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          {Array.from({ length: numCircles }, (_, i) => {

            return (
              <radialGradient
                key={`gradient-${i}`}
                id={`gradient-${i}`}
                cx="50%"
                cy="100%"
                r="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgb(255, 140, 0)"
                  stopOpacity={0.2 - i * 0.03}
                />
                <stop
                  offset="100%"
                  stopColor="rgb(139, 69, 19)"
                  stopOpacity={0.15 - i * 0.02}
                />
              </radialGradient>
            );
          })}
          {/* Sweep gradient */}
          <linearGradient
            id="sweepGradient"
            gradientUnits="userSpaceOnUse"
            x1="200"
            y1="0"
            x2={200 - Math.sin(trailAngle * Math.PI / 180) * 300}
            y2={300 - Math.cos(trailAngle * Math.PI / 180) * 300}
          >
            <stop offset="0%" stopColor="rgb(255, 140, 0)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="rgb(255, 140, 0)" stopOpacity="0" />

          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Radial Lines */}
        {lines.map((line, i) => (
          <line
            key={`line-${i}`}
            x1="200"
            y1="300"
            x2={line.x2}
            y2={line.y2}
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}

        {/* Semi-circles */}
        {Array.from({ length: numCircles }, (_, i) => {
          const radius = ((i + 1) * 300) / numCircles;
          return (
            <path
              key={`circle-${i}`}
              d={`M ${200 - radius} 300 A ${radius} ${radius} 0 0 1 ${200 + radius} 300`}
              fill={`url(#gradient-${i})`}

            />
          );
        })}

        {/* First Rotating Radar Group - Just the sweep area */}
        <g style={{
          transformOrigin: '200px 300px',
          transform: 'rotate(-90deg)',
          animation: 'radarSpin 2s linear infinite'
        }}>
          {/* Sweep area between lines */}
          <path
            d={`M 200 300 
               L 200 0 
               A 300 300 0 0 0 ${200 - Math.sin(trailAngle * Math.PI / 180) * 300} ${300 - Math.cos(trailAngle * Math.PI / 180) * 300}
               Z`}
            stroke="none"
            fill="url(#sweepGradient)"
          />
        </g>

        {/* Second Rotating Radar Group - Lines only */}
        <g style={{
          transformOrigin: '200px 300px',
          transform: 'rotate(-90deg)',
          animation: 'radarSpin 2s linear infinite'
        }}>
          {/* Trail line */}
          <line
            x1="200"
            y1="300"
            x2="200"
            y2="0"
            stroke="rgb(255, 140, 0)"
            strokeWidth="2"
            strokeOpacity="0"
            transform={`rotate(-${trailAngle} 200 300)`}
          />

          {/* Main line */}
          <line
            x1="200"
            y1="300"
            x2="200"
            y2="0"
            stroke="rgb(255, 140, 0)"
            strokeWidth="2"
            strokeOpacity="0"
          />

          {/* Main line glow */}
          <line
            x1="200"
            y1="300"
            x2="200"
            y2="0"

            stroke="rgb(255, 140, 0)"
            strokeWidth="4"
            strokeOpacity="0.3"
            filter="url(#glow)"
          />
        </g>

        <style>
          {`
            @keyframes radarSpin {
              from {
                transform: rotate(-90deg);
              }
              to {
                transform: rotate(90deg);
              }
            }
          `}
        </style>
      </svg>
      <div className="absolute bottom-[1%] left-1/2 -translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center">
        <Rocket className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </div>
    </div>
  );
};

export default RadialPatternWithRadar;