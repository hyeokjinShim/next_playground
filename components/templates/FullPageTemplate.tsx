import {Box, BoxProps, css, Grid, GridProps, styled} from '@mui/material';
import React, {
  FC,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useInView} from 'react-intersection-observer';
import {throttle} from 'lodash';

interface FullPageTemplateProps extends GridProps {}

const Root = styled(Grid)`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: hidden;
  background-color: black;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }

  *::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar-thumb {
    /* background-color: red !important; */
    display: none !important;
  }
  *::-webkit-scrollbar-track {
    /* background: transparent !important; */
    display: none !important;
  }
`;

const Container = styled(Grid)<{step: number}>`
  width: 100%;

  transition: all 0.5s ease;
  ${({step}) => css`
    transform: translateY(calc(((var(--vh, 1vh) * 100) * -${step})));
  `}

  ${({theme}) => theme.breakpoints.down('mobile')} {
    transition-duration: 1s;
  }
`;

const FullPageComponent = styled(Box)`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  color: #fff;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullPage = (props: BoxProps) => {
  return <FullPageComponent {...props} />;
};

const FullPageTemplate: FC<FullPageTemplateProps> = ({children, ...props}) => {
  const [step, setStep] = useState<number>(0);
  const [maxStep, setMaxStep] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef<boolean>(false);

  const onStepDown = () => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setStep((step) => {
      if (step === 0) {
        isScrolling.current = false;
        return step;
      }
      return step - 1;
    });
  };

  const onStepUp = () => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setStep((step) => {
      if (step === maxStep) {
        isScrolling.current = false;
        return step;
      }
      return step + 1;
    });
  };

  useEffect(() => {
    if (!children) return;
    if (!Array.isArray(children)) return;

    setMaxStep(children.length - 1);
  }, [children]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener('transitionend', () => {
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    });
  }, []);

  if (Array.isArray(children)) {
    if (children.filter((item) => item.type.name !== 'FullPage').length > 0) {
      return <Grid>FullPage 으로만 넘겨</Grid>;
    }
    return (
      <Root>
        <Container ref={containerRef} step={step} {...props}>
          {children.map((item, index) => (
            <FullPageSection
              key={index}
              onStepDown={onStepDown}
              onStepUp={onStepUp}
            >
              {item}
            </FullPageSection>
          ))}
        </Container>
      </Root>
    );
  } else {
    return (
      <Root>
        <Container ref={containerRef} step={step} {...props}>
          {children}
        </Container>
      </Root>
    );
  }
};

export default FullPageTemplate;

const ObserverBox = styled(Box)`
  position: absolute;
  width: 100%;
  height: 10px;
  /* background-color: red; */
`;

interface FullPageSectionProps extends BoxProps {
  onStepDown: () => void;
  onStepUp: () => void;
}
const FullPageSection: FC<FullPageSectionProps> = ({
  onStepDown,
  onStepUp,
  children,
  sx,
  ...props
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartPosition = useRef<{x: number; y: number}>();

  const {ref: topRef, inView: topInView} = useInView({});
  const {ref: bottomRef, inView: bottomInView} = useInView({});

  const onWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      if (!bottomInView) return;
      onStepUp();
    }

    if (event.deltaY < 0) {
      if (!topInView) return;
      onStepDown();
    }
  };

  const throttledScroll = useMemo(
    () =>
      throttle((event: WheelEvent) => {
        onWheel(event);
      }, 500),
    [onWheel],
  );

  const onTouchStart = (event: TouchEvent) => {
    const touchStartX = event.changedTouches[0].pageX;
    const touchStartY = event.changedTouches[0].pageY;
    touchStartPosition.current = {x: touchStartX, y: touchStartY};
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (!touchStartPosition.current) return;

    const touchEndY = event.changedTouches[0].pageY;

    const touchStartY = touchStartPosition.current.y;

    if (touchEndY - touchStartY < -130) {
      if (!bottomInView) return;
      onStepUp();
      touchStartPosition.current = undefined;
    }

    if (touchStartY - touchEndY < -130) {
      if (!topInView) return;
      onStepDown();
      touchStartPosition.current = undefined;
      return;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.scrollRestoration = 'manual';
    if (!sectionRef.current) return;

    sectionRef.current.addEventListener('wheel', throttledScroll);

    sectionRef.current.addEventListener('touchstart', onTouchStart);

    sectionRef.current.addEventListener('touchend', onTouchEnd);

    return () => {
      window.history.scrollRestoration = 'auto';
      sectionRef.current?.removeEventListener('wheel', throttledScroll);
      sectionRef.current?.removeEventListener('touchstart', onTouchStart);
      sectionRef.current?.removeEventListener('touchend', onTouchEnd);
    };
  }, [topInView, bottomInView]);

  return (
    <Box
      ref={sectionRef}
      className="100vh-section"
      component="section"
      sx={{
        height: 'calc(var(--vh, 1vh) * 100)',
        overflowY: 'scroll',
        ...sx,
      }}
      {...props}
    >
      <Grid
        className="100vh-inner"
        sx={{
          position: 'relative',
          width: '100%',
        }}
      >
        <ObserverBox ref={topRef} sx={{top: 0}} />
        {children}
        <ObserverBox ref={bottomRef} sx={{bottom: 0}} />
      </Grid>
    </Box>
  );
};
