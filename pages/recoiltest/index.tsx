import useMyToken from '@/lib/recoil/token';
import {Button, NoSsr, TextField} from '@mui/material';
import React, {useRef} from 'react';

const RecoilTestPage = () => {
  const [token, setToken] = useMyToken();
  const ref = useRef<HTMLInputElement>(null);
  console.log(token);

  const onClick = () => {
    if (!ref.current || ref.current.value.length === 0) {
      alert('내용을 입력해');
      return;
    }
    setToken(ref.current.value);
  };

  return (
    <NoSsr>
      <div>
        <h2>
          입력한 값은 sessionStorage로 저장됨과 동시에 상태관리로 유지되어짐
        </h2>
        <input type="text" ref={ref} placeholder="입력해" />
        <Button variant="outlined" onClick={onClick}>
          Set Token
        </Button>
        <h1>Token is {!token ? 'null' : token}</h1>
      </div>
    </NoSsr>
  );
};

export default RecoilTestPage;
