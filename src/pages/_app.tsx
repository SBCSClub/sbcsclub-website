import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import React from "react";
import { Inter } from '@next/font/google';
import clsx from "clsx";
// import useWindowSize from "../hooks/useWindowSize";

const inter = Inter();

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ "key": "sbcsclub" });

export { augmentDocumentWithEmotionCache };

const MyApp: AppType = ({ Component, pageProps }) => {
  const app = React.useRef<HTMLDivElement | null>(null);

  // const size = useWindowSize();

  // React.useEffect(() => {
  //   if (!app.current) return; 

  //   document.body.style.height = `${
  //     app.current.getBoundingClientRect().height
  //   }px`;
  // }, [size.height]);

  // const skewConfigs = React.useMemo(
  //   () => ({
  //     ease: 0.075,
  //     current: 0,
  //     previous: 0,
  //     rounded: 0
  //   }),
  //   []
  // );

  // const skewScrolling = React.useCallback(() => {
  //   if (!app.current) return; 

  //   skewConfigs.current = window.scrollY;
  //   skewConfigs.previous +=
  //     (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
  //   skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;

  //   const diff = skewConfigs.current - skewConfigs.rounded;
  //   const acceleration = diff / size.width;

  //   const velocity = +acceleration;
  //   const skew = velocity * 10;

  //   app.current.style.transform = `translate3d(0,-${skewConfigs.rounded}px,0) skewY(${skew}deg)`;

  //   requestAnimationFrame(() => skewScrolling());
  // }, [size.width, skewConfigs]);

  // React.useEffect(() => {
  //   requestAnimationFrame(() => skewScrolling());
  // }, [skewScrolling]);

  return (
    <div ref={app} className={clsx(inter.className)}>
      <Component {...pageProps} />
    </div>
  )
};

export default trpc.withTRPC(withAppEmotionCache(MyApp));