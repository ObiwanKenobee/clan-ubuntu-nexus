
import { useState, useEffect } from 'react';

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  large: number;
}

const breakpoints: BreakpointConfig = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
};

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large';

export function useResponsive() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      
      if (width < breakpoints.mobile) {
        setDeviceType('mobile');
      } else if (width < breakpoints.tablet) {
        setDeviceType('tablet');
      } else if (width < breakpoints.desktop) {
        setDeviceType('desktop');
      } else {
        setDeviceType('large');
      }
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop' || deviceType === 'large';
  const isLarge = deviceType === 'large';

  return {
    deviceType,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    breakpoints,
  };
}

export function useBreakpoint(breakpoint: keyof BreakpointConfig) {
  const [isAbove, setIsAbove] = useState(false);

  useEffect(() => {
    function updateBreakpoint() {
      setIsAbove(window.innerWidth >= breakpoints[breakpoint]);
    }

    window.addEventListener('resize', updateBreakpoint);
    updateBreakpoint();

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [breakpoint]);

  return isAbove;
}
