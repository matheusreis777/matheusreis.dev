const DataFlowDivider = () => {
  return (
    <div className="relative w-full h-16 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full flex items-center">
        <svg
          width="320"
          height="32"
          viewBox="0 0 320 32"
          fill="none"
          className="opacity-30"
        >
          <line
            x1="0"
            y1="16"
            x2="320"
            y2="16"
            stroke="hsl(142 70% 45%)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          <circle cx="80" cy="16" r="2" fill="hsl(142 70% 45%)">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="160" cy="16" r="3" fill="hsl(142 70% 45%)">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.4s"
            />
            <animate
              attributeName="r"
              values="2;3.5;2"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.4s"
            />
          </circle>
          <circle cx="240" cy="16" r="2" fill="hsl(142 70% 45%)">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.8s"
            />
          </circle>

          <circle cx="0" cy="16" r="1.5" fill="hsl(142 70% 45%)">
            <animate
              attributeName="cx"
              values="0;320"
              dur="3s"
              repeatCount="indefinite"
              begin="0s"
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              dur="3s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="0" cy="16" r="1" fill="hsl(142 70% 45%)">
            <animate
              attributeName="cx"
              values="320;0"
              dur="4s"
              repeatCount="indefinite"
              begin="1s"
            />
            <animate
              attributeName="opacity"
              values="0;0.6;0.6;0"
              dur="4s"
              repeatCount="indefinite"
              begin="1s"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default DataFlowDivider;
