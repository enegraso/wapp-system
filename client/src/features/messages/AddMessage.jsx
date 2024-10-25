import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageAdd, resultMessage } from "../../app/actions/messages";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { REACT_APP_AUTHOR, REACT_APP_API } from "../../app/consts/consts";
import EmojiPicker from 'emoji-picker-react';

let data = []
let dataGroup = [];

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}-${month}-${year}`;
};

const AddMessage = () => {
  const { t } = useTranslation();
  const login = useSelector((state) => state.usersReducer.login)
  const destin = useSelector((state) => state.contactsReducer.contacts);
  const configs = useSelector((state) => state.configsReducer.configs);
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hoy = new Date()/* .toLocaleDateString();  */
  const [textm, setTextM] = useState("");
  const [inmediate, setInmediate] = useState(true);
  const [repite, setRepite] = useState(false);
  const [senddate, setSendDate] = useState(formatDate(hoy));
  const [sendtime, setSendTime] = useState("09:00");
  const [todos, setTodos] = useState(false)
  const [days, setDays] = useState(30)
  const [veces, setVeces] = useState(1)
  const [mensual, setMensual] = useState(false)
  const [xmonths, setXMonths] = useState(1)
  const [openIconModal, setOpenIconModal] = useState(false)
  const allContacts = useSelector((state) => state.contactsReducer.contacts)

  const [input, setInput] = useState({
    categories: [],
    contacts: [],
    groups: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const groups = input.groups // input.categories
    const destins = input.contacts
    let alldestins = []
    var senddates = senddate
    var sendtimes = sendtime

    // si marco la casilla para todos los destinatarios entrará aquí
    if (todos) {
      allContacts && allContacts.map(async (contact) => {
        var senddates = senddate
        var sendtimes = sendtime
        alldestins.push(contact.id)
        console.log(contact.id)
        let texttosend = textm.replaceAll("-NB-", contact.name)
        texttosend = texttosend.replaceAll("-EM-", configs.business)
        texttosend = texttosend.replaceAll("-EMS-", configs.slogan)
        //        replaceVariables(textm, contact.name)
        console.log("Nuevo texto: " + texttosend)
        const message = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact.id, backwa: login.bacwa };
        if (message.inmediate === true) {
          const numbertosend = contact.cellphone + "@c.us"
          const params = {
            chatId: numbertosend,
            message: texttosend
          }
          const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json', authorization: REACT_APP_AUTHOR },
            body: JSON.stringify(params)
          };

          fetch('https://waapi.app/api/v1/instances/' + login.backwa + '/client/action/send-message', options)
            .then(response => response.json())
            .then(async response => {

              console.log(response)
              var datetime = new Date();
              var fecha = datetime.getFullYear() + "-" + (datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + datetime.getDate().toString().padStart(2, "0")
              var hora = datetime.getHours().toString().padStart(2, "0") + ":" + datetime.getMinutes().toString().padStart(2, "0")
              var objMess = {
                ...message,
                sendeddate: fecha,
                sendedtime: hora,
                sended: response.data.status === "success" ? true : false,
                result: response.data.status // "Mensaje enviado con éxito"
              }
              dispatch(messageAdd(objMess));
            })
            .catch(err => console.error(err));
        } else {
          dispatch(messageAdd(message));
        }

        if (repite) {
          console.clear()
          setInmediate(false)
          let sumdays = new Date(senddates)

          let mesobten = parseInt(sumdays.getMonth())
          let elmes = parseInt(mesobten) + parseInt(xmonths)

          for (let i = 0; i < veces; i++) {
            if (mensual) {
              sumdays.setMonth(elmes)
              elmes = parseInt(elmes) + parseInt(xmonths)
            }
            else {
              sumdays.setDate(sumdays.getDate() + parseInt(days))
              console.log("dias", days)
            }
            senddates = sumdays.toISOString().split('T')[0];

            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact.id, backwa: login.bacwa };
            dispatch(messageAdd(messrepite));

          }
        }

      })
    }  // si desmarco la opcion de todos los destinatarios
    else {
      // primero vamos a iterar con los contactos seleccionados
      let selectedcontacts = [] // array auxiliar para guardar a los contactos seleccionados y luego de los grupos seleccionados
      destins && destins.map(async (contact) => {
        const isContactSend = destin.filter((aenviar) => aenviar.id == contact);
        isContactSend.map((destino) => {
          selectedcontacts.push(destino)
        })
      })

      // iterar grupo x grupo, si se han elegido y sus contactos y sumarlos a los contactos elegidos de a uno
      groups && groups.map((grupo) => {
        // console.log(allContacts)
        // console.log(grupo)
        allContacts.map((contact) => {
          // console.log(contact.categories.length)
          // iterar en todos los grupos seleccionados para el contacto
          for (var i = 0; i < contact.categories.length; i++) {
            // si uno de los grupos seleccionados coincide con uno de los grupos del usuario
            if (parseInt(contact.categories[i].id) === parseInt(grupo)) {
              //lo agrego al al listado de contactos a enviar
              selectedcontacts.push(contact)
            }
          }
        }) // este está funcionando perfecto, quizás habria que refactorizar mapeando o filtrando
        console.log("seleccionados: ", selectedcontacts)
      })

      // aquí estaría bueno verificar duplicados, para que no enviar mismo mensaje 2 veces

      // aqui va logica de envio (seria bueno pasarla a funcion y llamarla desde aqui y desde seleccion de todos los contactos)     
      selectedcontacts.map((contacttosend) => {
        var senddates = senddate
        var sendtimes = sendtime

        // const isContactSend = destin.filter((aenviar) => aenviar.id == contact);
        let texttosend = textm.replaceAll("-NB-", contacttosend.name)
        texttosend = texttosend.replaceAll("-EM-", configs.business)
        texttosend = texttosend.replaceAll("-EMS-", configs.slogan)

        // replaceVariables(textm, contacttosend.name)
        console.log("Nuevo texto: " + texttosend)
        const message = { text: texttosend, inmediate, senddates, sendtimes, contactid: contacttosend.id };


        if (message.inmediate === true) {
          console.log(contacttosend.cellphone)
          const numbertosend = contacttosend.cellphone + "@c.us"
          console.log(numbertosend)
          const params = {
            chatId: numbertosend,
            message: texttosend
          }
          const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json', authorization: REACT_APP_AUTHOR },
            body: JSON.stringify(params)
          };

          fetch('https://waapi.app/api/v1/instances/' + login.backwa + '/client/action/send-message', options)
            .then(response => response.json())
            .then(async response => {

              console.log(response)
              var datetime = new Date();
              var fecha = datetime.getFullYear() + "-" + (datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + datetime.getDate().toString().padStart(2, "0")
              var hora = datetime.getHours().toString().padStart(2, "0") + ":" + datetime.getMinutes().toString().padStart(2, "0")
              var objMess = {
                ...message,
                sendeddate: fecha,
                sendedtime: hora,
                sended: response?.data.status === "success" ? true : false,
                result: response?.data.status // "Mensaje enviado con éxito"
              }

              dispatch(messageAdd(objMess));

            })
            .catch(err => console.error(err));
        } else {
          dispatch(messageAdd(message));

        }

        if (repite) {
          console.clear()
          setInmediate(false)
          let sumdays = new Date(senddates)

          let mesobten = parseInt(sumdays.getMonth())
          console.log("Primer mes" + mesobten)
          let elmes = parseInt(mesobten) + parseInt(xmonths)
          console.log("Primer somatorial, elmes", elmes)

          for (let i = 0; i < veces; i++) {
            if (mensual) {
              sumdays.setMonth(elmes)
              elmes = parseInt(elmes) + parseInt(xmonths)
            }
            else {
              sumdays.setDate(sumdays.getDate() + parseInt(days))
              console.log("dias", days)
            }
            senddates = sumdays.toISOString().split('T')[0];
            console.log(senddates)
            console.log("El mes " + elmes)
            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contacttosend.id };
            dispatch(messageAdd(messrepite));

          }
        }

      })

    }

    navigate("/show-messages", { replace: true });
  };
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSendDate(today);
  }, []);

  function handleGroupChangeSelect(e) {
    console.log(input.groups)
    var temperac = input.groups.find((temp) => temp === e?.target?.value);
    console.log(temperac)
    if (!temperac && e?.target?.value !== "0") {
      data = [...input.groups];
      data.push(e?.target?.value);
      setInput({ ...input, groups: data });
      var seltempec = document.getElementById("selecgroup");
      var strtempec = seltempec.options[seltempec.selectedIndex].text;
      var artempesc = document.getElementById("areagruposeleccionados");
      artempesc.value += artempesc?.value?.length > 0 ? ", " + strtempec : strtempec;
    } else alert("El grupo ya fue agregado");
  }

  function handleDestinChangeSelect(e) {
    console.log(input.contacts)
    var temperac = input.contacts.find((temp) => temp === e?.target?.value);
    console.log(temperac)
    if (!temperac && e?.target?.value !== "0") {
      data = [...input.contacts];
      data.push(e?.target?.value);
      setInput({ ...input, contacts: data });
      var seltempec = document.getElementById("seleccontact");
      var strtempec = seltempec.options[seltempec.selectedIndex].text;
      var artempesc = document.getElementById("areatempec");
      artempesc.value += artempesc?.value?.length > 0 ? ", " + strtempec : strtempec;
    } else alert("El contacto ya fue agregado");
  }

  const handleCClick = () => {
    let eliminado = data.pop()
    var artempesc = document.getElementById("areatempec");
    var textoenareac = artempesc.value.split(",");
    textoenareac.pop()
    artempesc.value = textoenareac
  }

  function handleGroupRemoveClick() {
    var artempesc = document.getElementById("areagruposeleccionados");
    var textoenareac = artempesc.value.split(",");
    textoenareac.pop()
    artempesc.value = textoenareac
  }

  if (destin.length === 0) {
    Swal.fire({
      title: "Destinatarios",
      html: "Debe ingresar, al menos, un destinatario<br/>Desea agregar?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/add-contact")
      } else if (result.isDenied) {
        navigate("/")
      }
    });
  }

  const onEmojiClick = (emojiData, event) => {
    if (emojiData && emojiData.emoji) {
      setTextM(prevText => prevText + emojiData.emoji);
    } else {
      console.error('Emoji data is undefined or missing the emoji property');
    }
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar mensaje
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="my-5 flex justify-start items-center gap-5">
          <label className="block text-gray-700 text-sm font-bold flex justify-start items-center gap-5" htmlFor="todos">
            <input className="form-checkbox h-5 w-5 text-indigo-600" type="checkbox" id="todos" checked={todos} onChange={() => setTodos(!todos)} />
            Todos los destinatarios
          </label>
        </div>
        {!todos && (
          <div className="mb-4 flex flex-row gap-20">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seleccontact">
                Seleccione Destinatario/s
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="contacts" value={input.contacts} onChange={handleDestinChangeSelect} id="seleccontact">
                <option value="">Elija contacto</option>
                {destin && destin.map((elem) => (
                  <option key={elem.id} value={elem.id}>{elem.name}</option>
                ))}
              </select>
            </div>
            <div className="ml-7">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selecgroup">
                Seleccione grupo/s
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="groups" value={input.groups} onChange={handleGroupChangeSelect} id="selecgroup">
                <option value="">Elija grupo</option>
                {groups && groups.map((elem) => (
                  <option key={elem.id} value={elem.id}>{elem.category}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        <div className="flex flex-row">
          {!todos && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areatempec">
                Contactos Seleccionados:
              </label>
              <textarea className="form-textarea mt-1 block w-full rounded bg-white" id="areatempec" rows="1" cols="35" disabled readOnly={false}>{data.join(", ")}</textarea>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2" onClick={handleCClick}>
                Borrar contacto
              </button>
            </div>
          )}
          {!todos && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areagruposeleccionados">
                Grupos Seleccionados:
              </label>
              <textarea className="form-textarea mt-1 block w-full rounded bg-white" id="areagruposeleccionados" rows="1" cols="35" disabled readOnly={false}>{input.groups.join(", ")}</textarea>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2" onClick={handleGroupRemoveClick}>
                Eliminar Grupo
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textAreaExample">
            Message
          </label>
          <div className="flex flex-row gap-10">
            <textarea className="form-textarea mt-1 px-1 block w-full border border-gray-300 rounded" id="textAreaExample" rows="4" value={textm} onChange={(e) => setTextM(e.target.value)} required></textarea>
            <div>
              {openIconModal ? (
                <div onClick={() => { setOpenIconModal(false) }} className="flex flex-row gap-2 mb-4 w-[200px]">
                  <img src="/close.png" style={{
                    height: "25px",
                    width: "25px",
                  }} />
                  <label> {t('addMessage.closeIcon')} </label>
                </div>
              ) : <div onClick={() => { setOpenIconModal(true) }} className="flex flex-row gap-2 mb-4 w-[200px]">
                <img src="/plus.png" style={{
                  height: "25px",
                  width: "25px",
                }} />
                <label>{t('addMessage.addIcon')}</label>
              </div>}


              <EmojiPicker onEmojiClick={onEmojiClick} open={openIconModal} />
            </div>
          </div>
        </div>


        <div>
          <p> {t('addMessage.title')} </p>
          <label>{t('addMessage.nb')}</label><br />
          <label>{t('addMessage.em')}</label><br />
          <label>{t('addMessage.ems')}</label><br />
        </div>

        <div className="my-4">
          <div className="flex flex-col justify-between">
            <div className="md:w-1/2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2" id="inmediate" checked={inmediate} onChange={() => setInmediate(!inmediate)} />
                <span className="text-gray-700">Enviar inmediato</span>
              </label>
            </div>
            <div>
              {!inmediate ?
                <div className="form-control">
                  <label>Programar envio:</label><br />
                  Fecha: <input
                    type="date"
                    id="senddate"
                    value={senddate}
                    onChange={(e) => setSendDate(e.target.value)} />
                  <br />
                  Hora:   <input
                    type="time"
                    id="hora"
                    list="times"
                    value={sendtime}
                    onChange={(e) => setSendTime(e.target.value)} />

                  <datalist id="times">
                    <option value="08:00:00" />
                    <option value="08:15:00" />
                    <option value="08:30:00" />
                    <option value="08:45:00" />
                    <option value="09:00:00" />
                    <option value="09:15:00" />
                    <option value="09:30:00" />
                    <option value="09:45:00" />
                    <option value="10:00:00" />
                    <option value="10:15:00" />
                    <option value="10:30:00" />
                    <option value="10:45:00" />
                    <option value="11:00:00" />
                    <option value="10:15:00" />
                    <option value="11:30:00" />
                    <option value="11:45:00" />
                    <option value="12:00:00" />
                    <option value="12:15:00" />
                    <option value="12:30:00" />
                    <option value="12:45:00" />
                    <option value="13:00:00" />
                    <option value="13:15:00" />
                    <option value="13:30:00" />
                    <option value="13:45:00" />
                    <option value="14:00:00" />
                    <option value="14:15:00" />
                    <option value="14:30:00" />
                    <option value="14:45:00" />
                    <option value="15:00:00" />
                    <option value="15:15:00" />
                    <option value="15:30:00" />
                    <option value="15:45:00" />
                    <option value="16:00:00" />
                    <option value="16:15:00" />
                    <option value="16:30:00" />
                    <option value="16:45:00" />
                    <option value="17:00:00" />
                    <option value="17:15:00" />
                    <option value="17:30:00" />
                    <option value="17:45:00" />
                    <option value="18:00:00" />
                    <option value="18:15:00" />
                    <option value="18:30:00" />
                    <option value="18:45:00" />
                    <option value="19:00:00" />
                    <option value="19:15:00" />
                    <option value="19:30:00" />
                    <option value="19:45:00" />
                    <option value="20:00:00" />
                    <option value="20:15:00" />
                    <option value="20:30:00" />
                    <option value="20:45:00" />
                    <option value="21:00:00" />
                    <option value="21:15:00" />
                    <option value="21:30:00" />
                    <option value="21:45:00" />
                  </datalist>
                </div>
                : ""}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2" id="repite" checked={repite} onChange={() => setRepite(!repite)} />
                <span className="text-gray-700">Repetir</span>
              </label>
              {repite && (
                <div className="mt-2 md:mt-0 md:ml-4">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" id="mensual" checked={mensual} onChange={() => setMensual(!mensual)} />
                  <span className="ml-2 text-gray-700">Mensualmente</span>
                  <br />
                  {!mensual ? (
                    <>
                      Cada:<input
                        type="number"
                        id="days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)} />
                      días
                    </>
                  ) : (
                    <>
                      Mismo día de cada mes<br />
                      Cada:<input
                        type="number"
                        id="nonths"
                        value={xmonths}
                        onChange={(e) => setXMonths(e.target.value)} />
                      mes/es
                    </>
                  )}
                  <br />
                  <input
                    type="number"
                    id="veces"
                    value={veces}
                    onChange={(e) => setVeces(e.target.value)} /> Veces
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">
          Enviar Mensaje
        </button>
      </form>
    </div>


  );
};

export default AddMessage;