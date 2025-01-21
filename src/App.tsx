import React, { useState, useRef, useEffect, useMemo } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { PulseLoader } from 'react-spinners';
import { 
  TrashIcon, 
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Square2StackIcon,
  ArrowPathIcon,
  BackspaceIcon,
  SwatchIcon,
  PlayIcon
} from '@heroicons/react/24/solid';
import { analyzeDrawing } from './utils/geminiAPI';

const COLORS = [
  { name: 'Black', value: '#1e293b' },  // slate-800
  { name: 'Blue', value: '#3b82f6' },   // blue-500
  { name: 'Red', value: '#ef4444' },    // red-500
  { name: 'Green', value: '#22c55e' },  // green-500
];

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [toolbarOpen, setToolbarOpen] = useState(true);
  const [brushColor, setBrushColor] = useState('#1e293b');
  const [brushSize, setBrushSize] = useState(4);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(40); 
  const canvasRef = useRef<CanvasDraw | null>(null);

  const getCanvasDimensions = () => {
    const availableWidth = window.innerWidth - 320; 
    const availableHeight = window.innerHeight - 80; 
    return {
      width: Math.max(availableWidth - 8, 400), 
      height: Math.max(availableHeight - 80, 300) 
    };
  };

  const gridStyle = useMemo(() => {
    if (!showGrid) return {};
    return {
      backgroundImage: `
        linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: `${gridSize}px ${gridSize}px`
    };
  }, [showGrid, gridSize]);

  const handleAnalyze = async () => {
    if (!canvasRef.current) {
      setError('Canvas not initialized');
      return;
    }
    
    setIsAnalyzing(true);
    setError('');
    setResult('');
    
    try {
      const canvas = canvasRef.current.canvas.drawing;
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvas, 0, 0);
      
      const imageData = tempCanvas.toDataURL('image/png');
      const analysis = await analyzeDrawing(imageData);
      setResult(analysis);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error analyzing drawing. Please try again.';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setResult('');
      setError('');
    }
  };

  const handleUndo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div className="h-full flex flex-col">
        <header className="flex-none py-3 text-center bg-white/50 backdrop-blur-sm border-b border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Smart Drawing Analysis
          </h1>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 flex p-0.5 overflow-hidden relative">
            {/* Drawing Area */}
            <div className="flex-1 flex flex-col bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden mr-0.5">
              {/* Canvas Container */}
              <div className="flex-1 relative">
                {/* Fixed Footer */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg z-40">
                  <div className="flex justify-center gap-3 max-w-lg mx-auto">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-1 flex items-center justify-center px-6 py-2.5 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                    >
                      {isAnalyzing ? (
                        <PulseLoader color="#ffffff" size={8} />
                      ) : (
                        <>
                          <PlayIcon className="h-5 w-5 mr-2" />
                          Analyze Drawing
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleClear}
                      className="flex items-center justify-center px-6 py-2.5 text-base font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors shadow-lg shadow-slate-500/10"
                    >
                      <TrashIcon className="h-5 w-5 mr-2" />
                      Clear
                    </button>
                  </div>
                </div>

                {/* Canvas with Bottom Padding for Footer */}
                <div className="absolute inset-0 bottom-[72px] p-0.5">
                  <div 
                    className="h-full border border-blue-200/50 rounded-lg overflow-hidden bg-white"
                    style={gridStyle}
                  >
                    <CanvasDraw
                      ref={canvasRef}
                      brushColor={brushColor}
                      brushRadius={brushSize}
                      canvasWidth={getCanvasDimensions().width}
                      canvasHeight={getCanvasDimensions().height}
                      className="touch-none"
                      backgroundColor="#FFFFFF"
                      hideGrid={!showGrid}
                      lazyRadius={0}
                      catenaryColor="rgba(59, 130, 246, 0.2)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Area */}
            <div className="w-[300px] bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-3 overflow-hidden flex flex-col">
              <h2 className="flex-none text-lg font-bold text-slate-800 mb-3">
                Analysis Result
              </h2>
              <div className="flex-1 overflow-y-auto">
                {error ? (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                ) : result ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-slate-700 whitespace-pre-line">{result}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-slate-400 text-sm">
                      Draw something and click Analyze to see the result
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Toolbar */}
            <div className={`
              absolute left-0 top-0 bottom-0 z-50
              w-[280px] bg-white/95 backdrop-blur-md shadow-2xl
              transition-transform duration-300 border-r border-slate-200
              ${toolbarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <button
                onClick={() => setToolbarOpen(!toolbarOpen)}
                className="absolute right-0 top-20 transform translate-x-full bg-white/95 backdrop-blur-sm p-2 rounded-r-lg shadow-lg hover:bg-blue-50 transition-colors border border-l-0 border-slate-200 z-50"
              >
                {toolbarOpen ? (
                  <ChevronLeftIcon className="h-5 w-5 text-blue-600" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-blue-600" />
                )}
              </button>

              <div className="h-full p-4 overflow-y-auto">
                {/* Colors */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center mb-3">
                    <SwatchIcon className="h-5 w-5 mr-2 text-blue-600" />
                    <p className="text-sm font-semibold text-slate-700">Colors</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {COLORS.map(color => (
                      <button
                        key={color.value}
                        onClick={() => setBrushColor(color.value)}
                        className={`flex items-center p-2 rounded-lg transition-all ${
                          brushColor === color.value 
                            ? 'bg-blue-50 ring-2 ring-blue-500 ring-offset-2' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div 
                          className="w-6 h-6 rounded-full ring-2 ring-slate-200"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="ml-2 text-sm text-slate-600">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center mb-3">
                    <PencilIcon className="h-5 w-5 mr-2 text-blue-600" />
                    <p className="text-sm font-semibold text-slate-700">Tools</p>
                  </div>
                  <button
                    onClick={() => setBrushColor('#FFFFFF')}
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                      brushColor === '#FFFFFF' 
                        ? 'bg-blue-50 ring-2 ring-blue-500 ring-offset-2' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <BackspaceIcon className="h-5 w-5 text-slate-600" />
                    <span className="ml-2 text-sm text-slate-600">Eraser</span>
                  </button>
                </div>

                {/* Brush Size */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center mb-3">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center">
                      <div 
                        className="rounded-full bg-blue-600"
                        style={{ 
                          width: Math.min(20, brushSize), 
                          height: Math.min(20, brushSize) 
                        }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">
                      Brush Size: {brushSize}px
                    </p>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Grid Controls */}
                <div className="space-y-3">
                  <div className="flex items-center mb-3">
                    <Square2StackIcon className="h-5 w-5 mr-2 text-blue-600" />
                    <p className="text-sm font-semibold text-slate-700">Grid</p>
                  </div>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`w-full flex items-center justify-center p-3 rounded-lg transition-all ${
                      showGrid 
                        ? 'bg-blue-50 ring-2 ring-blue-500 ring-offset-2' 
                        : 'hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span className="text-sm text-slate-600">
                      {showGrid ? 'Hide Grid' : 'Show Grid'}
                    </span>
                  </button>
                  <div className={`space-y-2 transition-all ${showGrid ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-slate-500">Grid Size: {gridSize}px</p>
                      <p className="text-xs text-slate-400">{gridSize}px</p>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="20"
                      value={gridSize}
                      onChange={(e) => setGridSize(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
