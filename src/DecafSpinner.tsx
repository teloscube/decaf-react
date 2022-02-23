import React from 'react';

export type DecafSpinnerType = {
  title?: string;
  color?: string;
  size?: number;
  titleColor?: string;
};
/**
 *
 * @param title string
 * @param color string
 * @param size number
 * @param titleColor string
 * @returns JSX.Element
 */
export default function DecafSpinner(props: DecafSpinnerType) {
  const style = `
    .spinner-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      flex-direction: column;
    }
    .spinner-text {
      color: ${props.titleColor || '#255d91'};
    }
    .spinner {
      width: ${props.size || '40px'};
      height: ${props.size || '40px'};
      position: relative;
      margin: 10px auto;
    }

    .double-bounce1,
    .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: ${props.color || '#1890ff'};
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;

      -webkit-animation: sk-bounce 2s infinite ease-in-out;
      animation: sk-bounce 2s infinite ease-in-out;
    }

    .double-bounce2 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    @-webkit-keyframes sk-bounce {
      0%,
      100% {
        -webkit-transform: scale(0);
      }
      50% {
        -webkit-transform: scale(1);
      }
    }

    @keyframes sk-bounce {
      0%,
      100% {
        transform: scale(0);
        -webkit-transform: scale(0);
      }
      50% {
        transform: scale(1);
        -webkit-transform: scale(1);
      }
    }
  `;
  return (
    <div className="spinner-wrapper">
      <style>{style}</style>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      {props.title && <p className="spinner-text">{props.title}</p>}
    </div>
  );
}
