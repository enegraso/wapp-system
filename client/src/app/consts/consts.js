// require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint
export const REACT_APP_AUTHOR = process.env.REACT_APP_AUTHOR //endpoint

// Users

export const allUsersEndpoint = REACT_APP_API + 'users/'
export const getUserEndpoint = REACT_APP_API + 'users/login'
export const addUserEndpoint = REACT_APP_API + 'users/add'
export const getQRUserEndpoint = REACT_APP_API + 'users/qrcode'
export const updUserssEndpoint = REACT_APP_API + 'users/update/';
export const updadmUserssEndpoint = REACT_APP_API + 'users/updateadm/';
export const delUsersEndpoint = REACT_APP_API + 'users/delete/';


//contacts
export const allContactsEndpoint = REACT_APP_API + 'contacts/';
export const userContactsEndpoint = REACT_APP_API + 'contacts/byuser/'
export const addContactsEndpoint = REACT_APP_API + 'contacts/add';
export const delContactsEndpoint = REACT_APP_API + 'contacts/delete/';
export const updContactsEndpoint = REACT_APP_API + 'contacts/update/';
export const byidContactsEndpoint = REACT_APP_API + 'contacts/byid/';

//configs

export const allConfigsEndpoint = REACT_APP_API + 'configs/';
export const addConfigsEndpoint = REACT_APP_API + 'configs/add/';
export const updConfigsEndpoint = REACT_APP_API + 'configs/update/';
export const usrConfigsEndpoint = REACT_APP_API + 'configs/byuser/';

//groups

export const allGroupsEndpoint = REACT_APP_API + 'categories/';
export const userGroupsEndpoint = REACT_APP_API + 'categories/byuser/'
export const addGroupsEndpoint = REACT_APP_API + 'categories/add';
export const delGroupsEndpoint = REACT_APP_API + 'categories/delete/';
export const updGroupsEndpoint = REACT_APP_API + 'categories/update/';

//messages

export const allMessagesEndpoint = REACT_APP_API + 'messages/';
export const userMessagesEndpoint = REACT_APP_API + 'messages/byuser/'
export const addMessagesEndpoint = REACT_APP_API + 'messages/add';
export const delMessagesEndpoint = REACT_APP_API + 'messages/delete/';
export const updMessagesEndpoint = REACT_APP_API + 'messages/update/';
export const resMessagesEndpoint = REACT_APP_API + 'messages/result/';
export const senMessagesEndpoint = REACT_APP_API + 'messages/sended/';
export const queMessagesEndpoint = REACT_APP_API + 'messages/queue/';

// Families
export const allFamiliesEndpoint = REACT_APP_API + 'families';
export const addFamilyEndpoint = REACT_APP_API + 'families/add';
export const delFamilyEndpoint = REACT_APP_API + 'families/delete';
export const updateFamilyEndpoint = REACT_APP_API + 'families/update';

// receipts

export const userReceiptsEndpoint = REACT_APP_API + 'receipts/byuser/'
export const delReceiptsEndpoint = REACT_APP_API + 'receipts/delete/';

// Sorts

export const ASC = 'Contacts-A-Z';
export const DES = 'Contacts-Z-A';