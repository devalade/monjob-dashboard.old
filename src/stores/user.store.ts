import { atom, useAtom } from 'jotai';

type UserAtom = {
  user: User | null;
  profile: Profile | null;
  company: CompanyProfile | null;
};
export const userAtom = atom<UserAtom>({
  user: null,
  profile: null,
  company: null,
});
