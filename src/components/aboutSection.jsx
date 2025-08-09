"use client";
import React from "react";
import Image from "next/image";

const videos = [
  {
    src: "https://go.screenpal.com/player/cTjeF6nIC7F?width=100%&height=100%&ff=1&title=0&controls=0&a=1&m=1",
    title: "Tentang GGG - Video 1",
  },
  {
    src: "https://go.screenpal.com/player/cTjQ1KnIW3b?width=100%&height=100%&ff=1&title=0&controls=0&a=1&m=1",
    title: "baru"
  },
  {
    src: "https://go.screenpal.com/player/cTjeDqnICGq?width=100%&height=100%&ff=1&title=0&controls=0&a=1&m=1&embed=1",
    title: "Tentang GGG - Video 2",
  },
  {
    src: "https://go.screenpal.com/player/cTjebxnICd4?width=100%&height=100%&ff=1&title=0&controls=0&a=1&m=1",
    title: "Tentang GGG - Video 3",
  },
  {
    src: "https://go.screenpal.com/player/cTjebknICKh?width=100%&height=100%&ff=1&title=0&controls=0&a=1&m=1",
    title: "Tentang GGG - Video 4"
  }
];

const AboutSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);
  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const videoContainerRef = React.useRef(null);

  // Fullscreen toggle
  const handleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const goToPrevVideo = () => {
    setIframeLoaded(false);
    setCurrentVideoIndex(
      currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1
    );
  };

  const goToNextVideo = () => {
    setIframeLoaded(false);
    setCurrentVideoIndex(
      currentVideoIndex === videos.length - 1 ? 0 : currentVideoIndex + 1
    );
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-0 md:p-0 m-0 rounded-none relative overflow-x-hidden">
      <div
        className="absolute left-0 bottom-0 w-full z-[0]"
        style={{
          height: "30%",
          backgroundColor: "#f5f5f7",
        }}
      />

      {/* Left Video Carousel */}
      <div className="w-full md:w-1/2 h-56 sm:h-80 md:h-[600px] flex-shrink-0 flex items-center justify-center relative">
        <div
          ref={videoContainerRef}
          className={`relative w-full h-56 sm:h-80 md:h-[600px] ${
            isFullscreen ? "bg-black" : ""
          } rounded-tr-4xl overflow-hidden`}
        ><>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-60 rounded-tr-4xl">
                  <div className="flex flex-col items-center">
                    <svg
                      className="animate-spin h-12 w-12 text-[#FFAC12] mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span className="text-white font-semibold">Memuat video...</span>
                  </div>
                </div>
              )}
              <iframe
                className={`w-full h-full z-10 ${
                  isFullscreen ? "rounded-none" : "rounded-tr-4xl"
                }`}
                src={videos[currentVideoIndex].src}
                title={videos[currentVideoIndex].title}
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{
                  border: "none",
                }}
                onLoad={() => setIframeLoaded(true)}
              ></iframe>

              {/* Fullscreen Button */}
              {/* <button
                onClick={handleFullscreen}
                className={`absolute bottom-1 right-1 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300`}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button> */}

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevVideo}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Previous Video"
              >
                &#10094;
              </button>
              <button
                onClick={goToNextVideo}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Next Video"
              >
                &#10095;
              </button>
            </>
        </div>
      </div>

      {/* Right Text */}
      <div className="w-full md:w-1/2 px-4 sm:px-8 md:px-0 md:pr-8 lg:pr-16 mt-8 md:mt-0 ml-0 md:ml-6 lg:ml-10 flex flex-col z-[1]">
        <div className="mb-4 h-1 w-24 sm:w-30 bg-gradient-to-r from-[#FFAC12] to-black rounded-full" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700">About GGG</h2>

        <p className="text-gray-600 mb-8 text-base sm:text-lg">
          GGG (Graha Gloria Grup) adalah perusahaan pengembang properti yang berfokus pada pembangunan hunian berkualitas tinggi dengan desain modern dan lingkungan yang asri. Kami berkomitmen memberikan solusi tempat tinggal terbaik bagi keluarga Indonesia melalui inovasi, integritas, dan pelayanan profesional. Bersama GGG, Anda dapat mewujudkan impian memiliki rumah yang nyaman, aman, dan bernilai investasi tinggi.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/about"
            className="flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold rounded-tl-2xl rounded-br-2xl rounded-tr-lg rounded-bl-lg shadow hover:bg-gray-900 transition-all duration-200 text-base sm:text-lg"
          >
            Learn more
            <span className="ml-2 text-[#FFAC12] text-lg sm:text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
