import FullPageTest from '@/components/fullpage/FullPageTest';
import FullPageTemplate from '@/components/templates/FullPageTemplate';
import {NextPage} from 'next';
import React from 'react';

interface FullPageProps {}

const FullPage: NextPage<FullPageProps> = () => {
  return <FullPageTest />;
};

export default FullPage;
