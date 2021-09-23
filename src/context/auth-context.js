import React, { useEffect, useState, createContext, useContext, useReducer } from 'react';
import { firebase } from '../firebase/firebase';
import accountReducer from '../reducer/account';
import database from '../firebase/firebase';

const AuthContext = createContext();

const DEFAULT_ACCOUNT = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  addressDetail: '',
  city: '',
  province: '',
  postalCode: '',
  phone: '',
  paymentOption: '',
  creditCardNumber: '',
  expirationDate: '',
  cvvNumber: '',
  fullNameOfCard: '',
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [account, dispatchAccount] = useReducer(accountReducer, DEFAULT_ACCOUNT);
  // Use loading state?

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        database.ref(`users/${user.uid}/account`).once('value')
        .then(snapshot => {
          dispatchAccount({
            type: "SET_ACCOUNT",
            account: snapshot.val() ? snapshot.val() : DEFAULT_ACCOUNT
          })
        })
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, account, dispatchAccount }} >
      { children }
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider as default };