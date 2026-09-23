import { useEffect, useState } from "react";

function SafeImage({ src, alt = "", fallback = "/favicon.svg", ...props }) {
  const [imageSrc, setImageSrc] = useState(src || fallback);

  useEffect(() => {
    setImageSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (imageSrc !== fallback) setImageSrc(fallback);
      }}
    />
  );
}

export default SafeImage;
