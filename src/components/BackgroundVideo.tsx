import React, { useEffect, useRef, memo } from 'react';

interface BackgroundVideoProps {
    src: string;
    className?: string;
    poster?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = memo(({ src, className, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Optimize loading
        video.preload = "metadata";
        video.disablePictureInPicture = true;

        const playVideo = async () => {
            try {
                if (video.paused && video.readyState >= 2) {
                    await video.play();
                }
            } catch (err) {
                console.warn("Video autoplay prevented:", err);
            }
        };

        // Optimized event listeners
        const handleCanPlay = () => {
            playVideo();
            video.preload = "auto";
        };

        const handleVisibilityChange = () => {
            if (!document.hidden && video.paused) {
                playVideo();
            }
        };

        // Attach optimized listeners
        video.addEventListener('canplay', handleCanPlay, { once: true });
        video.addEventListener('visibilitychange', handleVisibilityChange);

        // Initial play attempt
        playVideo();

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            className={className}
            src={src}
            poster={poster}
            playsInline
            autoPlay
            muted
            loop
            preload="metadata"
            disablePictureInPicture
            style={{
                pointerEvents: 'none',
                objectFit: 'cover',
                objectPosition: 'center center',
                width: '100%',
                height: '100%',
                transform: 'translateZ(0)', // Force GPU acceleration
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
                // Ensure video maintains aspect ratio and covers container
                minHeight: '100%',
                minWidth: '100%'
            }}
        />
    );
});

export default BackgroundVideo;
