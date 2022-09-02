import {NoSsr} from '@mui/material';
import React, {FC} from 'react';
import Header from '@/components/organisms/Header';

interface PageTemplateProps {
  children?: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({children}) => {
  return (
    <NoSsr>
      <Header />
      {children}
    </NoSsr>
  );
};

export default PageTemplate;
