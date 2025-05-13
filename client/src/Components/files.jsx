import React from 'react';
import * as XLSX from 'xlsx';
import { useSelector, useDispatch } from 'react-redux';
import { contactAdd } from '../app/actions/contacts';

function FileInput() {
  const [data, setData] = React.useState([]);
  const [selectedFileName, setSelectedFileName] = React.useState('Sin archivos seleccionados');
  const [selectedGroups, setSelectedGroups] = React.useState([]);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.usersReducer.login);
  const groups = useSelector((state) => state.groupsReducer.groups);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        const cleanedData = rawData
          .filter((row) => {
            // Solo necesitamos que tenga un número de contacto válido
            const hasContact = row.Contacto && row.Contacto.toString().trim() !== '';
            return hasContact;
          })
          .map((row) => {
            const phoneNumber = row.Contacto.toString();
            const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
            
            // Usar el nombre si existe, si no dejar vacío
            const name = row.Nombre ? row.Nombre.toString().trim() : '';
            
            return {
              name: name,
              cellphone: cleanPhone,
            };
          });

        setData(cleanedData);
      };

      reader.readAsBinaryString(file);
    } else {
      setSelectedFileName('Sin archivos seleccionados');
      setData([]);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();

    if (data.length === 0) {
      alert('No hay contactos para importar');
      return;
    }

    if (selectedGroups.length === 0) {
      alert('Por favor seleccione al menos un grupo para los contactos');
      return;
    }

    try {
      // Mostrar confirmación antes de proceder
      const confirmImport = window.confirm(`¿Está seguro de importar ${data.length} contactos?`);
      
      if (confirmImport) {
        // Crear un único objeto con todos los contactos y grupos
        const batchImportData = {
          contacts: data.map(contact => ({
            name: contact.name,
            cellphone: contact.cellphone,
            country: 'Argentina 549'
          })),
          groups: selectedGroups,
          userid: Number(login.id)
        };

        console.log('Objeto preparado para el backend:', batchImportData);

        // Por ahora, seguimos usando el dispatch individual hasta que el backend esté listo
        for (const contact of batchImportData.contacts) {
          try {
            await dispatch(contactAdd({
              ...contact,
              groups: batchImportData.groups,
              userid: batchImportData.userid
            }));
          } catch (error) {
            console.error('Error al importar contacto:', contact, error);
            throw error;
          }
        }

        alert(`${data.length} contactos importados exitosamente`);
        setData([]);
        setSelectedFileName('Sin archivos seleccionados');
        setSelectedGroups([]);
      }
    } catch (error) {
      alert('Error al importar los contactos. Por favor, intente nuevamente.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h2 className="text-left text-xl font-bold uppercase mb-2" style={{ letterSpacing: "2px" }}>
        Importar contactos desde Excel
      </h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className="flex-grow">
              <div className="relative">
                <input 
                  type="file" 
                  onChange={handleFileUpload}
                  accept=".xlsx,.xls"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-l">
                    Seleccionar archivo
                  </button>
                  <span className="border border-gray-300 rounded-r px-4 py-2 bg-white flex-grow">
                    {selectedFileName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {data.length > 0 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Seleccione grupo/s para los contactos importados
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  const groupId = e.target.value;
                  if (!groupId) return;
                  if (!selectedGroups.includes(groupId)) {
                    setSelectedGroups([...selectedGroups, groupId]);
                  } else {
                    alert("El grupo ya fue agregado");
                  }
                }}
                value=""
              >
                <option value="">Seleccionar grupo</option>
                {groups && groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.category}
                  </option>
                ))}
              </select>
            </div>

            {selectedGroups.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Grupos seleccionados:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedGroups.map((groupId) => {
                    const group = groups.find(g => g.id === groupId);
                    return (
                      <div 
                        key={groupId}
                        className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                      >
                        <span>{group?.category}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedGroups(selectedGroups.filter(id => id !== groupId))}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Contactos encontrados: {data.length}
              </div>
              <div className="max-h-40 overflow-y-auto border rounded">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-2 text-left">#</th>
                      <th className="px-4 py-2 text-left">Nombre</th>
                      <th className="px-4 py-2 text-left">Número</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((contact, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{contact.name}</td>
                        <td className="px-4 py-2">{contact.cellphone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleImport}
            >
              Importar {data.length} contactos
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default FileInput;
