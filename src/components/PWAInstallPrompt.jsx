import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FaDownload, FaTimes } from 'react-icons/fa';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <Alert 
      variant="warning" 
      className="position-fixed bottom-0 start-50 translate-middle-x mb-3 mx-3"
      style={{ zIndex: 1050, maxWidth: '400px' }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <FaDownload className="me-2" />
          <div>
            <strong>Install App</strong>
            <div className="small">Add this app to your home screen for quick access</div>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button 
            size="sm" 
            variant="outline-warning" 
            onClick={handleInstallClick}
          >
            Install
          </Button>
          <Button 
            size="sm" 
            variant="outline-secondary" 
            onClick={handleDismiss}
          >
            <FaTimes />
          </Button>
        </div>
      </div>
    </Alert>
  );
} 