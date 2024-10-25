import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserContacts } from '../../app/actions/contacts';
import { getConfig } from '../../app/actions/configs?';
import { getUserCategories } from '../../app/actions/categories';
import { getUserMessages } from '../../app/actions/messages';
import { getAllUsers, getQRUser, userUpdateAdm } from '../../app/actions/users';
import { getUserReceipts } from '../../app/actions/receipts';
import Spinner from '../spinner';
import contacto from '../../assets/images/contactos.jpg';
import mensaje from '../../assets/images/mensajes.jpg';
import reloj from '../../assets/images/reloj.jpg';
import receipts from '../../assets/images/recibidos.avif';
import config from '../../assets/images/configuracion.webp';
import proveedores from '../../assets/images/proveedores1.jpg';
import clientes from '../../assets/images/clientes.jpg';

import enviados from "../../assets/images/whatsapp-enviado.webp";
import autoreplys from "../../assets/images/autoreply.jpg";
import bots from "../../assets/images/botswapp.webp";
import { ImCross } from "react-icons/im";
import { getConfigbyUser } from '../../app/actions/configs';

const Main = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const configs = useSelector((state) => state.configsReducer.configs);
  const login = useSelector((state) => state.usersReducer.login);
  const [isloading, setIsLoading] = useState(true);

  async function fetchData() {
    if (login.id) {
      try {
        // Intenta obtener los datos
        const configResponse = await dispatch(getConfigbyUser(login.id));
        if (configResponse && configResponse.data) {
          console.log('Config data:', configResponse.data);
        } else {
          console.error('No config data available');
        }
  
        const contactsResponse = await dispatch(getUserContacts(login.id));
        if (contactsResponse && contactsResponse.data) {
          console.log('Contacts data:', contactsResponse.data);
        } else {
          console.error('No contacts data available');
        }
  
        const categoriesResponse = await dispatch(getUserCategories(login.id));
        if (categoriesResponse && categoriesResponse.data) {
          console.log('Categories data:', categoriesResponse.data);
        } else {
          console.error('No categories data available');
        }
  
        const messagesResponse = await dispatch(getUserMessages(login.id));
        if (messagesResponse && messagesResponse.data) {
          console.log('Messages data:', messagesResponse.data);
        } else {
          console.error('No messages data available');
        }
  
        if (login.isAdmin) {
          await dispatch(getAllUsers());
        }
  
        if (login.backwa) {
          const options = { method: 'GET', headers: { accept: 'application/json', authorization: 'Bearer AoGFVf56BAaI3ROzBuByrqpwjvyKI1BFgdgtjm1Adaeb1b81' } };
          fetch('https://waapi.app/api/v1/instances/' + login.backwa + '/client/me', options)
            .then(response => response.json())
            .then(async (response) => {
              const status = response.me.status;
              if (status === "success" && login.vinculated === false) {
                const objUser = {
                  id: login.id,
                  vinculated: true,
                  qr: "",
                  backwa: login.backwa
                }
                await dispatch(userUpdateAdm(objUser))
              }
            })
            .catch(err => console.error(err));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      navigate("/login");
    }
  }
  

  return (
    <div className="container mx-auto px-4 md:px-12 my-12">
      <header className="text-center mb-8 flex flex-col gap-2 justify-between lg:flex-row lg:gap-0">
        <h1 className="hidden md:flex text-3xl font-bold">
          {i18n.language === 'en' ? `${configs?.business}'s Control Panel` : `Panel de control de ${configs?.business}`}
        </h1>

        <div className="flex items-center justify-center gap-10">
          <div className="flex items-center justify-center">
            <span>{!login.vinculated ? t("main.deniedVincMessage") : t("main.successVincMessage")} </span>
            {login.vinculated ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 text-[#0e6fa5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
        </div>
      </header>


      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
        {[
          { src: proveedores, title: t("main.contactGroup"), text: t("main.contactGroupDescription"), link: '/show-groups' },
          { src: contacto, title: t("main.contact"), text: t("main.contactDescription"), link: '/show-contacts' },
          { src: mensaje, title: t("main.message"), text: t("main.messageDescription"), link: '/show-messages' },
          { src: clientes, title: t("main.queue"), text: t("main.queueDescription"), link: '/queue-messages' },
          { src: enviados, title: t("main.sentMessages"), text: t("main.sentMessagesDescription"), link: '/sended-messages' },
          { src: receipts, title: t("main.receivedMessages"), text: t("main.receivedMessagesDescription"), link: '/show-receipts' },
          { src: config, title: t("main.settings"), text: t("main.settingsDescription"), link: '/show-configs?' },
          // { src: autoreplys, title: t("main.autoReply"), text: t("main.autoReplyDescription"), link: login.autoreplys ? '/building' : '/opcional' },
          // { src: bots, title: t("main.bots"), text: t("main.botsDescription"), link: login.autobots ? '/building' : '/opcional' }
        ].map((item, index) => (
          <div
            key={index}
            className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-4 m-2 flex flex-col items-center border border-gray-200" style={{ minWidth: '400px' }}
          >
            <img className="w-full h-48 object-cover mb-4 rounded-md" src={item.src} alt={item.title} />
            <div className="w-full px-4 text-center">
              <h5 className="font-bold text-lg mb-1 text-[#0e6fa5]">{item.title}</h5>
              <p className="text-[gray-700] text-base mb-4">{item.text}</p>
              <button
                className="bg-[#0e6fa5] hover:bg-[#3bc7f3] text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
                onClick={() => navigate(item.link)}
              >
                {item.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="ml-2 h-5 w-5"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {/* {login.isAdmin && (
          <>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-4 m-2 flex flex-col items-center border border-gray-200" style={{ minWidth: '400px' }}>
              <img className="w-full h-48 object-cover mb-4 rounded-md" src={contacto} alt="Usuarios" />
              <div className="w-full px-4 text-center">
                <h5 className="font-bold text-lg mb-1 text-green-600">{t("main.users")}</h5>
                <p className="text-gray-700 text-base mb-4">{t("main.usersDescription")}</p>
                <button
                  className="bg-[#0e6fa5] hover:bg-[#3bc7f3] text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
                  onClick={() => navigate("/show-users")}
                >
                  {t("main.users")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="ml-2 h-5 w-5"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-4 m-2 flex flex-col items-center border border-gray-200" style={{ minWidth: '400px' }}>
              <img className="w-full h-48 object-cover mb-4 rounded-md" src={contacto} alt="Contactos" />
              <div className="w-full px-4 text-center">
                <h5 className="font-bold text-lg mb-1 text-green-600">{t("main.userContacts")}</h5>
                <p className="text-gray-700 text-base mb-4">{t("main.userContactsDescription")}</p>
                <button
                  className="bg-[#0e6fa5] hover:bg-[#3bc7f3] text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
                  onClick={() => navigate("/show-allcontacts")}
                >
                  {t("main.userContacts")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="ml-2 h-5 w-5"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-4 m-2 flex flex-col items-center border border-gray-200" style={{ minWidth: '400px' }}>
              <img className="w-full h-48 object-cover mb-4 rounded-md" src={contacto} alt="Grupos" />
              <div className="w-full px-4 text-center">
                <h5 className="font-bold text-lg mb-1 text-green-600">{t("main.userGroups")}</h5>
                <p className="text-gray-700 text-base mb-4">{t("main.userGroupsDescription")}</p>
                <button
                  className="bg-[#0e6fa5] hover:bg-[#3bc7f3] text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
                  onClick={() => navigate("/show-allgroups")}
                >
                  {t("main.userGroups")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="ml-2 h-5 w-5"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default Main;
