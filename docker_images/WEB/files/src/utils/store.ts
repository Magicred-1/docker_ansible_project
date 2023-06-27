import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage<{
  prenom: string;
  nom: string;
  email: string;
  password: string;
}>('user', {
  prenom: '',
  nom: '',
  email: '',
  password: '',
});
