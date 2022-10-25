import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { createEmotionSsrAdvancedApproach } from "tss-react/next";
import React from "react";
import { Inter } from '@next/font/google';
import clsx from "clsx";

const inter = Inter();

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ "key": "sbcsclub" });

export { augmentDocumentWithEmotionCache };

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={clsx(inter.className)}>
      <Component {...pageProps} />
    </div>
  )
};

export default trpc.withTRPC(withAppEmotionCache(MyApp));