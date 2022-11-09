import '../styles/globals.css';
import App, {AppContext, AppProps} from 'next/app';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import {useEffect, useLayoutEffect} from 'react';
import createEmotionCache from '@/lib/createEmotionCache';
import {CacheProvider, EmotionCache} from '@emotion/react';
import muiTheme from '@/lib/theme/muiTheme';
import Head from 'next/head';
import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import emotionTheme from '@/lib/theme/emotionTheme';
import {RecoilRoot} from 'recoil';

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

  useLayoutEffect(() => {
    // ios 100vh 스크롤 이슈 -> height: 100vh => height: calc(var(--vh, 1vh) * 100);
    let vh = 0;
    const setVh = () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <Head>
            <title>GAME</title>
            <meta name="theme-color" content="#000000" />
          </Head>
          <EmotionThemeProvider theme={emotionTheme}>
            <MuiThemeProvider theme={muiTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </EmotionThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
  };
};
