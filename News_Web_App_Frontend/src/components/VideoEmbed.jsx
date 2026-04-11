import React from "react";
import "../styles/VideoEmbed.css";

function VideoEmbed({videoLink}) {
    
    if(videoLink != "") // Renders video frame only if a video link exists
    {
        return (
            <div className="video-frame">
                <h3>Video</h3>
                    <iframe 
                    width="100%" 
                    height="355px"
                    src={videoLink}
                    title="YouTube video player"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                    </iframe>
            </div>
        );
    }
}

export default VideoEmbed; 
