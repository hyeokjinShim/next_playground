import '../styles/globals.css';
import App, {AppContext, AppProps} from 'next/app';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import {useEffect} from 'react';
import createEmotionCache from '@/lib/createEmotionCache';
import {CacheProvider, EmotionCache} from '@emotion/react';
import muiTheme from '@/lib/theme/muiTheme';
import Head from 'next/head';
import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import emotionTheme from '@/lib/theme/emotionTheme';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const {Component, pageProps, emotionCache = clientSideEmotionCache} = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <StyledEngineProvider injectFirst>
        <Head>
          <title>GAME</title>
        </Head>
        <EmotionThemeProvider theme={emotionTheme}>
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </MuiThemeProvider>
        </EmotionThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
  };
};
