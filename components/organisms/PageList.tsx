import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import React, {FC} from 'react';

interface PageListProps {}

interface PageListItem {
  id: number;
  title?: string;
  pages: {
    name: string;
    url: string;
  }[];
}

const pageList: PageListItem[] = [
  {
    id: 1,
    title: 'example',
    pages: [
      {
        name: 'cardgame',
        url: '/cardgame',
      },
      {
        name: 'fullpage',
        url: '/fullpage',
      },
    ],
  },
];

const Container = styled(List)`
  color: #ffffff;
  .Mui-selected {
    background-color: transparent;
    color: #90caf9;
  }
`;

const PageList: FC<PageListProps> = ({}) => {
  const router = useRouter();

  return (
    <Container>
      <ListItemButton
        sx={{
          fontSize: '20px',
          color: '#fff',
          fontWeight: 700,
        }}
        onClick={() => {
          router.push('/');
        }}
        selected={router.asPath === '/'}
      >
        Home
      </ListItemButton>
      {pageList.map((item) => (
        <Box key={item.id}>
          <ListItemText sx={{padding: '8px 16px', margin: 0}}>
            <Typography
              sx={{fontSize: '16px', color: '#a1a1a1', fontWeight: 500}}
            >
              {item.title}
            </Typography>
          </ListItemText>
          {item.pages.map((page) => (
            <ListItemButton
              key={page.url}
              onClick={() => {
                router.push(page.url);
              }}
              selected={router.asPath === page.url}
            >
              {page.name}
            </ListItemButton>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default PageList;
