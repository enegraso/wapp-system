import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { contactUpdate } from "../../app/actions/contacts";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const EditContact = () => {
  const location = useLocation();
  const categs = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const [id] = useState(location.state.id);
  const [name, setName] = useState(location.state.name);
  const editphone = location.state.cellphone.substring(0, 2) === "54" ? "+" + location.state.cellphone.slice(0, 2) + location.state.cellphone.slice(3, 13) : "+" + location.state.cellphone // location.state.cellphone.slice(3, 13);
  const valuephone = "+" + location.state.cellphone.slice(0, 2) + location.state.cellphone.slice(3, 13);
  const [cellphone, setCellphone] = useState(editphone);
  const [groups, setGroups] = useState(location.state.categories);
  const [input, setInput] = useState({
    categories: [],
  });


  let data = [];
  let txtdata = [];

  groups.map((cate) => {
    data.push(cate.id);
    txtdata.push(cate.category);
  });

  // console.log("Data",data)
  const navigate = useNavigate();

  var tempera = "";
  function handleChangeSelect(e) {
    console.log("elegido ", e.target.value, "tipo", typeof e.target.value);
    console.log("Data", data, "item tipo", typeof data[0]);
    var abuscar = Number(e.target.value);
    tempera = data.indexOf(abuscar); // input.categories.find((temp) => temp === e.target.value);
    console.log("a ver ", tempera, "tipo ", typeof abuscar);
    if (tempera === -1) {
      if (e.target.value !== "0") {
        data = [...input.categories];
        data.push(e.target.value);
        setInput({ ...input, categories: data });
        var seltempe = document.getElementById("seleccategory");
        var strtempe = seltempe.options[seltempe.selectedIndex].text;
        var artempes = document.getElementById("areatempe");
        artempes.value +=
          artempes.value.length > 0 ? ", " + strtempe : strtempe;
        console.log("estas seleccionando: " + data + ", e " + e.target.value);
      }
    } else alert("La categoría ya fue agregada");
  }

  const handleClick = () => {
    console.log("DATA", data);
    let eliminado = data.pop();
    console.log("Elimine", eliminado);
    var artempes = document.getElementById("areatempe");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenarea = artempes.value.split(",");
    textoenarea.pop();
    console.log("Text area", textoenarea);
    artempes.value = textoenarea;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(groups, input.categories);
    // setGroups(input.categories)
    const numphone = cellphone.substring(0, 3) === "+54" ? cellphone.slice(1, 3) + "9" + cellphone.slice(3, 13) : cellphone.replace("+", "") // cellphone.slice(1, 3) + "9" + cellphone.slice(3, 13); // cellphone.slice(0, 2) + "9" + cellphone.slice(2, 12);
    dispatch(
      contactUpdate({ id, name, cellphone: numphone, groups: input.categories })
    );
    navigate("/show-contacts", { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Contacto
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"

      >
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="name"
          >
            Name:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="cellphon"
          >
            Cellphone:
          </label>
          <PhoneInput
            id="cellphone"
            // country={parsePhoneNumber(cellphone).country}
            defaultCountry={parsePhoneNumber(cellphone).country}
            // defaultValue={valuephone}
            enableSearch={true}
            value={cellphone}
            inputStyle={{
              height: "19px",
              width: "inherit",
            }}
            onChange={(cellphone) => { setCellphone(cellphone) }}
            placeholder="Número de celular"
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="seleccategory"
          >
            Seleccione grupo/s
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="categories"
            // value={input.categories}
            // onChange={handleChangeSelect}
            onChange={handleChangeSelect}
            value={input.categories}
            id="seleccategory"
          >
            <option key="0" value="0">
              Group of contact{" "}
            </option>
            {categs &&
              categs.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.category}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="areatempe"
          >
            Selecteds groups:
          </label>
          <textarea
            className="shadow form-textarea mt-1 block w-full rounded"
            id="areatempe"
            readOnly
            rows="1"
            cols="35"
          >
            {txtdata.join(", ")}
          </textarea>
          <div
            className="inline-flex items-center px-2 py-2 mt-3 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleClick}
          >
            {" "}
            Borrar{" "}
          </div>
        </div>



        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          style={{ background: "#006877", color: "white" }}
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
