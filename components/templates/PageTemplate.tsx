import React, {FC} from 'react';

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({children}) => {
  return <div>{children}</div>;
};

export default PageTemplate;
