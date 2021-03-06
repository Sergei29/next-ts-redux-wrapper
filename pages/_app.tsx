import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { wrapper } from "../src/redux/store";
import { createEmotionCache, theme } from "../src/theme";
import { CssReset } from "../src/components/common/CssReset";

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

export default wrapper.withRedux(MyApp);
