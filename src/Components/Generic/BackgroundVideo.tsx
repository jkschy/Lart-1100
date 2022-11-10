import React, {useEffect, useRef} from "react";

const BackgroundVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, [])

    return <video autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src={"video.mp4"}
                  style={{position: "absolute",
                          left: "0",
                          width: "100vw",
                          height: "100vh"}}
                  ref={videoRef}/>
}

export default BackgroundVideo
