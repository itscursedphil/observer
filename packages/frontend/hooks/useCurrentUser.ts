import { CurrentUserDocument } from './../generated/graphql';
import {
  CurrentUserQuery,
  CurrentUserQueryVariables,
} from '../generated/graphql';
import create from 'zustand';
import { createApolloClient } from '../lib/apolloClient';
import config from '../lib/config';

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
}

export interface CurrentUserStore {
  user: CurrentUser | null;
  initialized: boolean;
  loading: boolean;
  setUser: (user: CurrentUser | null) => void;
  fetchUser: () => void;
  resetUser: () => void;
}

// const { storageKey } = config.authentication;
// TODO: Fix config and dynamically get key from config
const storageKey = 'events_user';

const getUserFromLocalStorage = (): CurrentUser | null => {
  if (typeof window === 'undefined') return null;

  const user = window.localStorage.getItem(storageKey);

  if (!user) return null;

  return JSON.parse(window.atob(user)) as CurrentUser | null;
};

const persistUserToLocalStorage = (user: CurrentUser) => {
  window.localStorage.setItem(storageKey, window.btoa(JSON.stringify(user)));
};

const useCurrentUserStore = create<CurrentUserStore>((set) => {
  const apolloClient = createApolloClient();
  // const initialUser = getUserFromLocalStorage();

  return {
    user: null,
    initialized: false,
    loading: false,
    setUser: (user) => {
      if (user) {
        persistUserToLocalStorage(user);
      } else {
        window.localStorage.removeItem(storageKey);
      }

      set({ user, initialized: true });
    },
    fetchUser: async () => {
      set({
        loading: true,
      });

      try {
        const { data } = await apolloClient.query<
          CurrentUserQuery,
          CurrentUserQueryVariables
        >({
          query: CurrentUserDocument,
          fetchPolicy: 'network-only',
        });

        if (!data?.me) {
          throw new Error('Could not authenticate user');
        }

        const userData = {
          id: data.me.id,
          username: data.me.username,
          email: data.me.email || '',
        };

        persistUserToLocalStorage(userData);

        set({
          user: userData,
          loading: false,
          initialized: true,
        });
      } catch (err) {
        window.localStorage.removeItem(storageKey);
        return set({ user: null, loading: false, initialized: true });
      }
    },
    resetUser: () => {
      window.localStorage.removeItem(storageKey);

      set({
        user: null,
        initialized: true,
      });
    },
  };
});

export default useCurrentUserStore;