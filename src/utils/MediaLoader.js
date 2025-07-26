// Utility functions for handling media in blog posts

/**
 * Validates if a URL is accessible and returns the correct media type
 * @param {string} url - The URL to validate
 * @returns {Promise<{valid: boolean, type?: string, error?: string}>}
 */
export const validateMediaUrl = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      return { valid: false, error: 'URL not accessible' };
    }
    
    const contentType = response.headers.get('content-type');
    return { valid: true, type: contentType };
  } catch (error) {
    return { valid: false, error: 'Network error' };
  }
};

/**
 * Gets the file extension from a URL
 * @param {string} url - The URL to extract extension from
 * @returns {string} - The file extension
 */
export const getFileExtension = (url) => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = pathname.split('.').pop().toLowerCase();
    return extension;
  } catch {
    return '';
  }
};

/**
 * Determines the appropriate audio MIME type based on file extension
 * @param {string} url - The audio file URL
 * @returns {string} - The MIME type
 */
export const getAudioMimeType = (url) => {
  const extension = getFileExtension(url);
  const mimeTypes = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'webm': 'audio/webm',
    'm4a': 'audio/mp4',
    'aac': 'audio/aac'
  };
  return mimeTypes[extension] || 'audio/mpeg';
};

/**
 * Determines the appropriate image MIME type based on file extension
 * @param {string} url - The image file URL
 * @returns {string} - The MIME type
 */
export const getImageMimeType = (url) => {
  const extension = getFileExtension(url);
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml'
  };
  return mimeTypes[extension] || 'image/jpeg';
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - YouTube video ID or null if invalid
 */
export const extractYouTubeId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtu\.be\/([^?\n#]+)/,
    /youtube\.com\/embed\/([^?\n#]+)/,
    /youtube\.com\/v\/([^?\n#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Validates if a URL is a valid YouTube URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is a valid YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
  return extractYouTubeId(url) !== null;
};

/**
 * Creates a YouTube embed URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {Object} options - Embed options
 * @returns {string} - YouTube embed URL
 */
export const createYouTubeEmbedUrl = (videoId, options = {}) => {
  const {
    autoplay = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0,
    showinfo = 0,
    start = 0,
    end = 0,
    loop = 0,
    playlist = '',
    mute = 0
  } = options;
  
  let embedUrl = `https://www.youtube.com/embed/${videoId}?`;
  embedUrl += `autoplay=${autoplay}&`;
  embedUrl += `controls=${controls}&`;
  embedUrl += `modestbranding=${modestbranding}&`;
  embedUrl += `rel=${rel}&`;
  embedUrl += `showinfo=${showinfo}&`;
  embedUrl += `start=${start}&`;
  embedUrl += `loop=${loop}&`;
  embedUrl += `mute=${mute}`;
  
  if (end > 0) {
    embedUrl += `&end=${end}`;
  }
  
  if (playlist) {
    embedUrl += `&playlist=${playlist}`;
  }
  
  return embedUrl;
};

/**
 * Creates a fallback element for when media fails to load
 * @param {string} type - The type of media ('image' or 'audio')
 * @param {string} alt - Alternative text
 * @returns {JSX.Element} - The fallback element
 */
export const createMediaFallback = (type, alt = '') => {
  if (type === 'image') {
    return (
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        color: '#888',
        border: '1px dashed #444'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', marginBottom: '8px' }}>🖼️</div>
          <div>Image not available</div>
          {alt && <div style={{ fontSize: '0.8em', marginTop: '4px' }}>{alt}</div>}
        </div>
      </div>
    );
  }
  
  if (type === 'audio') {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        textAlign: 'center',
        color: '#888',
        border: '1px dashed #444'
      }}>
        <div style={{ fontSize: '2em', marginBottom: '8px' }}>🎵</div>
        <div>Audio not available</div>
      </div>
    );
  }
  
  if (type === 'youtube') {
    return (
      <div style={{
        width: '100%',
        height: '300px',
        backgroundColor: '#2a2a2a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        color: '#888',
        border: '1px dashed #444'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', marginBottom: '8px' }}>📺</div>
          <div>YouTube video not available</div>
        </div>
      </div>
    );
  }
  
  return null;
};

/**
 * Validates a URL format
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 