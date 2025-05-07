import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "./ContactsSlice";
import { useNavigate } from "react-router-dom";
import { contactAdd } from "../../app/actions/contacts";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FileInput from "../../Components/files";

const AddContact = () => {
  const login = useSelector((state) => state.usersReducer.login);
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cellphon, setCellphon] = useState("");
  const [country, setCountry] = useState("Argentina 549");
  const [input, setInput] = useState({
    categories: [],
  });
  let data = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    const groups = input.categories;
    if (groups.length <= 0) {
      alert("Por favor asigne uno o mas grupos al contacto");
    } else {
      const cellphone = cellphon.slice(1, 3) + "9" + cellphon.slice(3, 13);
      const userid = login.id;
      const contact = { name, cellphone, country, groups, userid };
      dispatch(contactAdd(contact));
      navigate("/show-contacts", { replace: true });
    }
  };

  function handleChangeSelect(e) {
    var tempera = input.categories.find((temp) => temp === e.target.value);
    console.log(tempera);
    if (!tempera && e.target.value !== "0") {
      data = [...input.categories];
      data.push(e.target.value);
      setInput({ ...input, categories: data });
      var seltempe = document.getElementById("seleccategory");
      console.log(seltempe);
      var strtempe = seltempe.options[seltempe.selectedIndex].text;
      var artempes = document.getElementById("areatempe");
      artempes.value += artempes.value.length > 0 ? ", " + strtempe : strtempe;
      console.log("estas seleccionando:" + data);
    } else alert("La categoría ya fue agregada");
  }

  const handleClick = () => {
    console.log("DATA", data);
    let eliminado = data.pop();
    console.log("Elimine", eliminado);
    var artempes = document.getElementById("areatempe");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenarea = artempes.value.split(",");
    // setInput(input.categories.pop())
    textoenarea.pop();
    console.log("Text area", textoenarea);
    artempes.value = textoenarea;
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
                <FileInput />
      <h2
        className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5"
        style={{ letterSpacing: "2px" }}
      >
        Agregar contacto
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="name"
          >
            Nombre:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="cellphon"
          >
            Numero de celular:
          </label>
          <PhoneInput
            id="cellphon"
            defaultCountry="AR"
            enableSearch={true}
            value={cellphon}
            inputStyle={{
              height: "19px",
              width: "inherit",
            }}
            onChange={(phone) => {
              setCellphon(phone);
            }}
            placeholder="Número de celular"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="seleccategory"
          >
            Seleccione grupo/s
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="categories"
            value={input.categories}
            onChange={handleChangeSelect}
            id="seleccategory"
          >
            <option value="">Group of contact</option>
            {groups &&
              groups.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.category}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="areatempe"
          >
            Grupos seleccionados:
          </label>
          <textarea
            className="shadow form-textarea mt-1 block w-full rounded"
            id="areatempe"
            disabled
            rows="1"
            cols="35"
            readonly
          >
            {data.join(", ")}
          </textarea>
          <div
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleClick}
          >
            {" "}
            -{" "}
          </div>
        </div>

        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          type="submit"
        >
          Agregar Contacto
        </button>
      </form>
    </div>
  );
};

export default AddContact;
