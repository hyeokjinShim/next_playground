import {Button, Grid} from '@mui/material';
import React, {useRef} from 'react';
import FullPageTemplate, {FullPage} from '../templates/FullPageTemplate';

const FullPageTest = () => {
  return (
    <FullPageTemplate>
      <FullPage bgcolor="#16A552">
        <Grid
          sx={{
            minHeight: '200vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          1
        </Grid>
      </FullPage>
      <FullPage bgcolor="#00B5E3">2</FullPage>
      <FullPage bgcolor="#45436C">3</FullPage>
      <FullPage bgcolor="#8570b1">
        <Grid
          sx={{
            minHeight: '200vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          4
        </Grid>
      </FullPage>
      <FullPage bgcolor="#351a70">5</FullPage>
    </FullPageTemplate>
  );
};

export default FullPageTest;
