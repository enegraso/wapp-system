import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactsView from "../features/contacts/ContactsView";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import Error from "../pages/Error";
import AddContact from "../features/contacts/AddContact";
import Main from "../Components/Main";
import EditContact from "../features/contacts/EditContact";
import EditConfig from "../features/config/EditConfig";
import ConfigsView from "../features/config/ConfigsView";
import GroupsView from "../features/groups/GroupsView";
import AddGroup from "../features/groups/AddGroup";
import EditGroup from "../features/groups/EditGroup";
import MessagesView from "../features/messages/MessagesView";
import Next from "../pages/Next";
import AddMessage from "../features/messages/AddMessage";
import LogIn from "../Components/LogIn";
import Register from "../Components/Register";
import UsersView from "../features/users/UsersView";
import EditUser from "../features/users/EditUser";
import QueuedView from "../features/messages/QueueView";
import SendedView from "../features/messages/SendedView";
import ReceiptsView from "../features/receipts/ReceiptsView";
import EditMessage from "../features/messages/EditMessage";
import FamiliesView from "../features/families/FamiliesView";
import AddFamily from "../features/families/AddFamilies";
import EditFamily from "../features/families/EditFamilies";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col inherit flex-grow">
      <Navbar />
      {children}
      <div className=" bottom-0 w-full"><Footer /></div>
    </div>
  );
};

const Index = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/building" element={<Next />} />
          <Route path="/register" element={<Register />} />

          <Route path="/show-messages" element={<MessagesView />} />
          <Route path="/add-message" element={<AddMessage />} />
          <Route path="/queue-messages" element={<QueuedView />} />
          <Route path="/sended-messages" element={<SendedView />} />
          <Route path="/edit-message" element={<EditMessage />} />

          <Route path="/show-groups" element={<GroupsView />} />
          <Route path="/add-group" element={<AddGroup />} />
          <Route path="/edit-group" element={<EditGroup />} />

          <Route path="/show-families" element={<FamiliesView />} />
          <Route path="/add-families" element={<AddFamily />} />
          <Route path="/edit-families" element={<EditFamily/>} />

          <Route path="/show-contacts" element={<ContactsView />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact" element={<EditContact />} />

          <Route path="/show-configs" element={<ConfigsView />} />
          <Route path="/edit-config" element={<EditConfig />} />

          <Route path="/show-users" element={<UsersView />} />
          <Route path="/edit-user" element={<EditUser />} />

          <Route path="/show-receipts" element={<ReceiptsView />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Index;
