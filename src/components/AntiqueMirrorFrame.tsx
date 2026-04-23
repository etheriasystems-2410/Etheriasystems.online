import LazyVideo from './LazyVideo';

interface AntiqueMirrorFrameProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
}

export default function AntiqueMirrorFrame({ videoSrc, posterSrc, className = '' }: AntiqueMirrorFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer shadow glow */}
      <div className="absolute inset-0 rounded-[60%_40%_55%_45%/50%_55%_45%_50%] blur-2xl opacity-30 bg-[#c9a227] scale-110" />
      
      {/* Main mirror container - oval shape */}
      <div className="relative rounded-[60%_40%_55%_45%/50%_55%_45%_50%] p-[6px] bg-gradient-to-br from-[#8b7355] via-[#c9a227] to-[#5c4a2a] shadow-[0_0_60px_rgba(201,162,39,0.15),inset_0_0_40px_rgba(0,0,0,0.8)]">
        
        {/* Inner frame bevel */}
        <div className="rounded-[60%_40%_55%_45%/50%_55%_45%_50%] p-[3px] bg-gradient-to-br from-[#d4af37] via-[#8b6914] to-[#3d2f1a]">
          
          {/* Inner shadow rim */}
          <div className="rounded-[60%_40%_55%_45%/50%_55%_45%_50%] p-[8px] bg-[#0a0a0b] shadow-[inset_0_0_30px_rgba(0,0,0,1),inset_0_0_60px_rgba(201,162,39,0.05)]">
            
            {/* Video container with oval mask */}
            <div className="relative rounded-[60%_40%_55%_45%/50%_55%_45%_50%] overflow-hidden bg-[#0a0a0b] aspect-[3/4]">
              <LazyVideo
                src={videoSrc}
                poster={posterSrc}
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Inner shadow overlay for depth */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 80px 20px rgba(0,0,0,0.9), inset 0 0 150px 40px rgba(10,10,11,0.7)',
                  borderRadius: 'inherit'
                }}
              />
              
              {/* Subtle gold reflection at top */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[30%] bg-gradient-to-b from-[rgba(201,162,39,0.08)] to-transparent pointer-events-none" />
              
              {/* Glass reflection line */}
              <div className="absolute top-[15%] left-[10%] right-[30%] h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,162,39,0.15)] to-transparent rotate-[-15deg] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner ornaments */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-lg">
          <path 
            d="M16 2 C12 8, 4 12, 4 16 C4 12, 8 4, 16 2 C24 4, 28 12, 28 16 C28 12, 20 8, 16 2Z" 
            fill="#c9a227"
            className="opacity-60"
          />
          <circle cx="16" cy="12" r="2" fill="#d4af37" className="opacity-80" />
        </svg>
      </div>

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rotate-180">
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-lg">
          <path 
            d="M16 2 C12 8, 4 12, 4 16 C4 12, 8 4, 16 2 C24 4, 28 12, 28 16 C28 12, 20 8, 16 2Z" 
            fill="#c9a227"
            className="opacity-60"
          />
          <circle cx="16" cy="12" r="2" fill="#d4af37" className="opacity-80" />
        </svg>
      </div>

      {/* Side flourishes */}
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-6 h-12">
        <svg viewBox="0 0 24 48" className="w-full h-full drop-shadow-lg">
          <path 
            d="M20 4 C12 12, 8 20, 8 24 C8 28, 12 36, 20 44 C16 36, 12 28, 12 24 C12 20, 16 12, 20 4Z" 
            fill="#c9a227"
            className="opacity-40"
          />
        </svg>
      </div>

      <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-6 h-12 rotate-180">
        <svg viewBox="0 0 24 48" className="w-full h-full drop-shadow-lg">
          <path 
            d="M20 4 C12 12, 8 20, 8 24 C8 28, 12 36, 20 44 C16 36, 12 28, 12 24 C12 20, 16 12, 20 4Z" 
            fill="#c9a227"
            className="opacity-40"
          />
        </svg>
      </div>

      {/* Ambient shadow beneath */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-black blur-xl opacity-60 rounded-full" />
    </div>
  );
}
