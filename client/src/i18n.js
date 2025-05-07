// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traducciones
const resources = {
  en: {
    translation: {
      configuration: {
        systemConfiguration: "System Configuration",
      },

      translation: {
        // Añadir nuevas traducciones aquí si es necesario
        familieView: {
          name: "Family Name",
          description: "Description",
          actions: "Actions",
          addFamilies: "Add Family",
          listFamily: "Family List",
        },
      },
      login: {
        user: "User",
        password: "Password",
        login: "Login",
        register: "You don't have an account?",
        register1: "Register",
      },
      navbar: {
        home: "Home",
        groups: "Groups",
        contacts: "Contacts",
        messages: "Messages",
        stack: "Stack",
        sent: "Sent",
        received: "Received",
        settings: "Settings",
        logout: "Logout",
      },
      main: {
        panelControl: " 's Control Panel",
        successVincMessage: "Your account is linked to WhatsApp",
        deniedVincMessage: "Your WhatsApp is not linked",
        contactGroup: "Contact Group",
        contactGroupDescription:
          "ABM of groups. Enter the groups here to assign recipients.",
        contact: "Contacts",
        contactDescription:
          "ABM of contacts. Enter the recipients of your system here.",
        message: "Messages",
        messageDescription:
          "ABM of messages. Here you can upload your immediate or scheduled messages.",
        queue: "Message Queue",
        queueDescription:
          "List of messages that are scheduled or have not yet been sent. You can edit them before sending.",
        sentMessages: "Sent Messages",
        sentMessagesDescription:
          "List of messages that have already been sent.",
        receivedMessages: "Received Messages",
        receivedMessagesDescription:
          "Here you can see the received messages (although you will also see them on the associated cell phone)",
        settings: "Settings",
        settingsDescription:
          "Edit your company data. And it will also be used to link WhatsApp®",
        autoReply: "Auto Replies",
        autoReplyDescription: "Define auto-replies according to triggers.",
        bots: "Bots",
        botsDescription: "Generate custom bots.",
        users: "Users",
        usersDescription: "System user control.",
        usersList: "User List",
        usersListDescription: "View list of registered users.",
        addUser: "Add User",
        addUserDescription: "Add a new user to the system.",
        userContacts: "User Contacts",
        userContactsDescription: "Contacts of the users.",
        userGroups: "User Groups",
        userGroupsDescription: "Contact Groups of the users.",
      },
      groupView: {
        name: "Group",
        description: "Description",
        actions: "Actions",
        addGroup: "Add Group",
        listGroup: "List Group",
      },
      contactsView: {
        name: "Name",
        wanumber: "WA Number",
        actions: "Actions",
        addContact: "Add Contact",
        order: "Order By",
        contactList: "Contact List",
        selectOrder: "Select Order",
        groups: "Groups",
        filter: "Filter Groups",
        search: "Search",
        selectFilter: "Select Filter",
      },
      messagesView: {
        text: "Text",
        to: "To",
        send: "Send",
        time: "Time",
        action: "Action",
        addMessage: "Add Message",
        messageList: "Message List",
      },
      queue: {
        text: "Text",
        to: "To",
        send: "Send",
        time: "Time",
        action: "Action",
        addMessage: "Add Message",
        queueList: "List of waiting messages",
      },
      send: {
        text: "Text",
        to: "To",
        send: "Send",
        result: "Result",
        action: "Action",
        addMessage: "Add Message",
        sentList: "List of sent messages",
        firstPage: "First Page",
        before: "Back",
        after: "Next",
        lastPage: "Last Page",
        page: "Page",
      },
      received: {
        n: "N",
        text: "Text",
        to: "To",
        from: "From",
        day: "Day",
        action: "Action",
        addMessage: "Add Message",
        receivedList: "List of received messages",
      },
      config: {
        bussiness: "Bussiness",
        slogan: "Slogan",
        action: "Action",
      },
      addMessage: {
        title: "Use these variables in the message",
        nb: "-NB- : Name of the contact",
        em: "-EM- : Name of the business",
        ems: "-EMS- : Slogan of the business",
        addIcon: "Add Icon",
        closeIcon: "Close Modal Icon",
      },
    },
  },
  es: {
    translation: {
      configuration: {
        systemConfiguration: "Configuracion del sistema",
      },

      
      login: {
        user: "Usuario",
        password: "Contraseña",
        login: "Ingresar",
        register: "No tienes cuenta? ",
        register1: "Registrate",
      },
      familieView: {
        name: "Nombre de la familia",
        description: "Descripción",
        actions: "Acciones",
        addFamilies: "Agregar Familia",
        listFamily: "Lista de Familias",
      },
      navbar: {
        home: "Inicio",
        groups: "Proveedores",
        contacts: "Empresa",
        messages: "Productos",
        stack: "Clientes",
        sent: "Movimientos",
        received: "Cuentas Corrientes",
        settings: "Ventas",
        logout: "Salir",
      },
      main: {
        panelControl: "Panel de control de",
        successVincMessage: "Su cuenta esta vinculada a WhatsApp",
        deniedVincMessage: "Aun no se ha vinculado su WhatsApp",
        contactGroup: "Proveedores",
        contactGroupDescription:
          "Aqui podrás administrar y asignar a tus proveedores para garantizar un flujo continuo de materiales y repuestos esenciales.",
        contact: "Empresa Propietaria",
        contactDescription:
          " Ingresa los detalles de la empresa principal que gestiona las operaciones. Administra la información clave de la empresa propietaria, asegurando un manejo eficiente de los recursos.",
        message: "Productos",
        messageDescription:
          "Aqui podrás agregar y gestionar los productos y artículos que ofreces, actualizando fácilmente el stock disponible.",
        queue: "Clientes",
        queueDescription:
          "Aquí podrás gestionar los datos de contacto de tus clientes y hacer seguimiento a las ventas realizadas, además de mantener la comunicación fluida con ellos.",
        sentMessages: "Movimientos de caja",
        sentMessagesDescription:
          "Mantén un registro claro de las transacciones diarias para garantizar que todas las operaciones financieras estén ordenadas y disponibles para consulta.",
        receivedMessages: "Movimientos cuentas corrientes",
        receivedMessagesDescription:
          "Lleva un registro de pagos, cobros y cualquier otra transacción vinculada a tu cuenta corriente, facilitando el control de los balances pendientes.",
        settings: "Venta de productos",
        settingsDescription:
          "Edite datos de su empresa. Y además se usará para vincular el WhatsApp®",
        autoReply: "Autorespuestas",
        autoReplyDescription: "Defina autorespuestas según disparador.",
        bots: "Bots",
        botsDescription: "Genere bots personalizados.",
        users: "Usuarios",
        usersDescription: "Control de usuarios del sistema.",
        usersList: "Listado de usuarios",
        usersListDescription: "Ver lista de usuarios registrados.",
        addUser: "Agregar Usuario",
        addUserDescription: "Agregar un nuevo usuario al sistema.",
        userContacts: "Contactos",
        userContactsDescription: "Contacto de los usuarios.",
        userGroups: "Grupos",
        userGroupsDescription: "Grupos de Contacto de los usuarios.",
      },
      groupView: {
        name: "Nombre",
        description: "Numero",
        actions: "Acciones",
        addGroup: "Agregar Proveedor",
        listGroup: "Listado de Proveedores",
      },
      contactsView: {
        name: "Nombre",
        wanumber: "Número de WA",
        actions: "Acción",
        addContact: "Agregar Contacto",
        order: "Ordenar por",
        contactList: "Lista de Contactos",
        selectOrder: "Seleccionar orden",
        group: "Grupos",
        filter: "Filtrar Grupos",
        search: "Buscar",
        selectFilter: "Seleccionar Filtro",
      },
      messagesView: {
        text: "Nombre",
        to: "Nombre",
        //  send: "",
        // time: "",
        action: "Acción",
        addMessage: "Agregar Productos",
        messageList: "Lista de Productos",
      },
      queue: {
        text: "Nombre",
        to: "Nombre",
        //  send: "",
        //  time: "",
        action: "Acción",
        addMessage: "Agregar Productos",
        queueList: "Registro de empleados",
      },
      send: {
        text: "Texto",
        to: "Para",
        send: "Enviar",
        result: "Resultado",
        time: "Hora",
        action: "Acción",
        addMessage: "Agregar Productos",
        sentList: "Listado de mensajes enviados",
        firstPage: "Primer Pagina",
        before: "Anterior",
        after: "Siguiente",
        lastPage: "Ultima Pagina",
        page: "Pagina",
      },
      received: {
        n: "N",
        text: "Texto",
        from: "De",
        send: "Enviar",
        day: "Dia",
        action: "Acción",
        addMessage: "Agregar Mensaje",
        receivedList: "Listado de mensajes recibidos",
      },
      config: {
        bussiness: "Negocio",
        slogan: "Eslogan",
        action: "Acción",
      },
      addMessage: {
        title: "Usa las siguiente variables en el mensaje",
        nb: "-NB- : Nombre del contacto",
        em: "-EM- : Nombre del negocio",
        ems: "-EMS- : Eslogan del negocio",
        addIcon: "Agregar Iconos",
        closeIcon: "Cerrar Modal de Iconos",
      },
    },
  },
};

i18n
  .use(initReactI18next) // Inicializa i18next con react-i18next
  .init({
    resources, // Recursos de traducción
    lng: "es", // Idioma inicial
    fallbackLng: "es", // Idioma por defecto si no se encuentra la traducción
    debug: true, // Activa mensajes de depuración en consola
    interpolation: {
      escapeValue: false, // React ya maneja la protección contra XSS
    },
  });

export default i18n;
