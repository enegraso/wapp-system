import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { contactDelete, contactsFilter, contactsSort } from "../../app/actions/contacts";
import { ASC, DES } from "../../app/consts/consts";
import { useTranslation } from "react-i18next";
import { Autocomplete, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Swal from "sweetalert2";

const ContactsView = () => {
  const { t } = useTranslation();
  const contacts = useSelector((state) => state?.contactsReducer?.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pagContacts, setPagContacts] = useState(1);
  const [encontrados, setEncontrados] = useState([]);
  const itemsPPage = 15;
  const totalItems = pagContacts * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(contacts.length / itemsPPage);
  const auxcontacts = useSelector((state) => state?.contactsReducer?.auxcontacts);
  const view = encontrados.length > 0 ? encontrados : contacts.slice(inicialItems, totalItems);

  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleOrderChange = async (event) => {
    setOrder(event.target.value);
    await dispatch(contactsSort(event.target.value, contacts));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    dispatch(contactsFilter(event.target.value, contacts));
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Desea eliminar el contacto " + name + "?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      icon: "success",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(contactDelete(id));
      }
    });
  };

  const handleSearch = (event, value) => {
    setSearchValue(value);
    const query = value ? value.toLowerCase() : '';
    const dataEncontrados = contacts.filter((contact) => contact.name.toLowerCase().includes(query));
    setEncontrados(dataEncontrados);
  };

  const handleSelect = (event, value) => {
    if (value) {
      setEncontrados([value]);
    } else {
      setEncontrados([]);
    }
  };

  const CustomSelect = ({ id, value, onChange, label, options }) => {
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value}
          onChange={onChange}
          label={label}
          className="px-2 rounded-md w-[300px]"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col flex-grow ">
      <div className="flex flex-row justify-between text-2xl mb-10">
        <h2 className="text-center flex flex-row text-start text-2xl font-semibold">
          {t('contactsView.contactList')}
        </h2>
        <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => { navigate("/add-contact") }}>
          <FcAddRow className="mr-2 h-5 w-5" />
          {t('contactsView.addContact')}
        </button>
      </div >
      <div className="flex flex-col justify-center lg:flex-row gap-5 items-center lg:justify-end">
        <div className="flex justify-start lg:justify-center align-center text-lg mb-4 relative">
          <Autocomplete
            disablePortal
            id="contacts-autocomplete"
            options={contacts}
            sx={{ width: 300 }}
            clearOnBlur={false}
            clearOnEscape={false}
            onInputChange={handleSearch}
            onChange={handleSelect}
            filterOptions={(options, state) => options.filter(option => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Search for contacts" value={searchValue} onChange={(e) => handleSearch(e, e.target.value)} />} // Actualiza el valor del input
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 align-center justify-end">
          <div className="flex justify-start lg:justify-center align-center text-lg mb-4">
            <CustomSelect
              id="order-select"
              value={order}
              onChange={handleOrderChange}
              label={t('contactsView.order')}
              options={[
                { value: "", label: t('contactsView.selectOrder') },
                { value: ASC, label: "A-Z" },
                { value: DES, label: "Z-A" }
              ]}
            />
          </div>

          <div className="flex justify-start lg:justify-center align-center text-lg mb-4">
            <CustomSelect
              id="filter-select"
              value={filter}
              onChange={handleFilterChange}
              label={t('contactsView.filter')}
              options={[
                { value: "", label: t('contactsView.selectFilter') },
                { value: ASC, label: "A-Z" },
                { value: DES, label: "Z-A" }
              ]}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">{t('contactsView.name')}</th>
              <th className="px-4 py-2 text-left">{t('contactsView.group')}</th>
              <th className="px-4 py-2 text-left">{t('contactsView.wanumber')}</th>
              <th className="px-4 py-2 text-left">{t('contactsView.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {view && view.map((contact, index) => {
              const { id, name, cellphone, categories } = contact;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{pagContacts > 1 ? (15 * (pagContacts - 1)) + index + 1 : index + 1}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{categories ? categories.map(user => user.category) : ""} </td>
                  <td className="px-4 py-2">{cellphone}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <Link to={`/edit-contact`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" state={{ id, name, cellphone, categories }}>
                      <FaEdit />
                    </Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(id, name)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav className="mt-6 flex justify-end">
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagContacts(1)}>⬅</button>
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagContacts((prev) => Math.max(prev - 1, 1))}>Anterior</button>
        <span className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">{pagContacts}</span>
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagContacts((prev) => Math.min(prev + 1, cantPages))}>Siguiente</button>
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagContacts(cantPages)}>➡</button>
      </nav>
    </div >
  );
};

export default ContactsView;
