import axios from "axios";
import { ASC, DES, allContactsEndpoint, addContactsEndpoint, delContactsEndpoint, updContactsEndpoint, userContactsEndpoint, byidContactsEndpoint } from "../consts/consts";
import { showContacts, addContact, deleteContact, updateContact, allContact, sendContact, sortContacts } from "../../features/contacts/ContactsSlice";

export const contactAdd = (userNew) => async (dispatch) => {
  // console.log("agregando", userNew);
  try {
    const { data } = await axios.post(`${addContactsEndpoint}`, userNew);
    dispatch({ type: "contacts/addContact", payload: data.user });
    console.log(data)
    localStorage.setItem("userAdded", true)
  } catch (err) {
    localStorage.setItem("userAdded", err?.response?.data.message)
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};


export const getAllContacts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${allContactsEndpoint}`);
    // console.log("ejecutando action getallusers", data)
    dispatch({ type: "contacts/allContact", payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingContacts", true)
  } catch (err) {
    localStorage.setItem("gettingContacts", err?.response?.data.message)
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
}


export const getContactSend = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${byidContactsEndpoint}` + id);
    // console.log("ejecutando action getContactsend", data)
    dispatch({ type: "contacts/sendContact", payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingContacts", true)
  } catch (err) {
    localStorage.setItem("gettingContacts", err?.response?.data.message)
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
}



export const getUserContacts = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${userContactsEndpoint}` + id);
    // console.log("ejecutando action getallusers", data)
    dispatch({ type: "contacts/allContact", payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingContacts", true)
  } catch (err) {
    localStorage.setItem("gettingContacts", err?.response?.data.message)
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
}

export const contactDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`${delContactsEndpoint}${id}`)
    dispatch({ type: "contacts/deleteContact", payload: id });
    localStorage.setItem("contactDeleted", true)
  } catch (err) {
    localStorage.setItem("contactDeleted", err?.response?.data.message)
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    )
  }
};

export const contactUpdate = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updContactsEndpoint}`, { user });
    dispatch({ type: "contacts/updateContact", payload: data.user });
    localStorage.setItem("contactUpdated", true)
  } catch (err) {
    localStorage.setItem("contactUpdated", err?.response?.data.message)
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};


export const contactsSort = (order, breeds) => async (dispatch) => {
  let sortBreed = [...breeds]

  sortBreed.sort(function(a,b){
      var nombreA = a.name.toUpperCase();
      var nombreB = b.name.toUpperCase();

      if(order === ASC){
          if(nombreA < nombreB){
              return -1;
          }
          if(nombreA > nombreB){
              return 1
          }
          return 0
      }
      if(order === DES){
          if(nombreA < nombreB){
              return 1;
          }
          if(nombreA > nombreB){
              return -1
          }
          return 0
      }
  })
  /* return function(dispatch){
 */      dispatch({type: "contacts/sortContacts", payload: sortBreed})
/*   }
 */}
