import {atom, SetterOrUpdater, useRecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

//? Default storage is LocalStorage
// const {persistAtom} = recoilPersist({
//   storage: sessionStorage,
// });

const {persistAtom} = recoilPersist({
  storage: sessionStorage,
});

const tokenAtom = atom<string>({
  key: 'tokenAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const useMyToken = (): [string, SetterOrUpdater<string>] => {
  const [tokenState, setTokenState] = useRecoilState(tokenAtom);

  return [tokenState, setTokenState];
};

export default useMyToken;
