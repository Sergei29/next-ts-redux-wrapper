import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createEmotionCache, theme } from "../src/Theme";
import CssReset from "../src/modules/common/CssReset";

/**
 * @description  Client-side cache, shared for the whole session of the user in the browser.
 */
const clientSideEmotionCache = createEmotionCache();

type Props = {
  emotionCache?: EmotionCache;
} & AppProps;

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) => (
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssReset />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

export default MyApp;
