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
                width: '100vw',
                height: '100vh',
                minWidth: '100%',
                minHeight: '100%',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) translateZ(0)',
                zIndex: -1
            }}
        />
    );
});

export default BackgroundVideo;
