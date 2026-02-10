import React, { useEffect, useRef, memo } from 'react';

interface BackgroundVideoProps {
    src: string;
    className?: string;
    poster?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, className, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force high priority loading
        video.preload = "auto";

        const playVideo = async () => {
            try {
                if (video.paused) {
                    await video.play();
                }
            } catch (err) {
                console.warn("Video autoplay prevented:", err);
            }
        };

        // Event listeners to ensure continuous playback
        const handlePause = () => {
            if (!video.paused || video.ended) return;
            playVideo();
        };

        const handleVisibilityChange = () => {
            if (!document.hidden && video.paused) {
                playVideo();
            }
        };

        // Attach listeners
        video.addEventListener('pause', handlePause);
        video.addEventListener('suspend', playVideo); // Retry on suspend
        video.addEventListener('stalled', playVideo); // Retry on stall
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Initial play
        playVideo();

        // Safety heartbeat check
        const intervalId = setInterval(() => {
            if (video.paused && video.readyState > 2) {
                playVideo();
            }
        }, 1500);

        return () => {
            clearInterval(intervalId);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('suspend', playVideo);
            video.removeEventListener('stalled', playVideo);
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
            preload="auto"
            disablePictureInPicture
            style={{
                pointerEvents: 'none',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1
            }}
        />
    );
};

export default memo(BackgroundVideo);
