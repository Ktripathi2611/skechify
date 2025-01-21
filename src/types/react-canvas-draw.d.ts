declare module 'react-canvas-draw' {
  import * as React from 'react';

  export interface CanvasDrawProps {
    onChange?: (canvas: CanvasDraw) => void;
    loadTimeOffset?: number;
    lazyRadius?: number;
    brushRadius?: number;
    brushColor?: string;
    catenaryColor?: string;
    gridColor?: string;
    backgroundColor?: string;
    hideGrid?: boolean;
    canvasWidth?: number;
    canvasHeight?: number;
    disabled?: boolean;
    imgSrc?: string;
    saveData?: string;
    immediateLoading?: boolean;
    hideInterface?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }

  export default class CanvasDraw extends React.Component<CanvasDrawProps> {
    canvas: {
      drawing: HTMLCanvasElement;
      temp: HTMLCanvasElement;
    };
    clear: () => void;
    undo: () => void;
    getSaveData: () => string;
    getCanvas: () => HTMLCanvasElement;
    loadSaveData: (saveData: string, immediate: boolean) => void;
  }
}
