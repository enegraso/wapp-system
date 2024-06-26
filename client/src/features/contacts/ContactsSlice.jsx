import { createSlice } from "@reduxjs/toolkit";

const initialContacts = {
  loading: 'idle',
  contacts: [],
  admcontacts: [],
  aenviar: {},
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContacts,
  reducers: {
    showContacts: (state) => state,
    allContact: (state, action) => {
      state.contacts = action.payload
    },
    admContact: (state, action) => {
      state.admcontacts = action.payload
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    sendContact: (state, action) => {
      state.aenviar = action.payload;
    },
    updateContact: (state, action) => {
      const { id, name, email, cellphone, address, city, zip, province,  country, } = action.payload;
      const isContactExist = state.contacts.filter((contact) => contact.id === id);

      if (isContactExist) {
        isContactExist[0].name = name;
        isContactExist[0].cellphone = cellphone;
        isContactExist[0].email = email;
        isContactExist[0].address = address;
        isContactExist[0].city = city;
        isContactExist[0].zip = zip;
        isContactExist[0].province = province;
        isContactExist[0].country = country;
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
    logoutContacts: (state, action) => {
      state.contacts = action.payload
    },
    sortContacts: (state, action) => {
      state.contacts = action.payload
    }
  },
});

export const { showContacts, addContact, updateContact, deleteContact, allContact, sendContact, logoutContacts, sortContacts, admContact } = contactsSlice.actions;

export default contactsSlice.reducer;