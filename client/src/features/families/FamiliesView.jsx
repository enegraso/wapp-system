import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { familyDelete } from "../../app/actions/familiesActions";
import { useTranslation } from "react-i18next";
import swal from 'sweetalert2';

const FamiliesView = () => {
  const { t } = useTranslation();
  const families = useSelector((state) => state.families.families);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id, name) => {
    swal
      .fire({
        title: "¿Desea eliminar la familia " + name + "?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(familyDelete(id));
        }
      });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="container mx-auto px-4">
        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          {t('familieView.listFamily')}
          <button
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate("/add-families")}
          >
            <FcAddRow className="mr-2 h-5 w-5" />
            {t('familieView.addFamilies')}
          </button>
        </h2>
        <div className="overflow-x-scroll">
          <table className="w-full table-auto">
            <thead className="bg-[#0e6fa5] text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">{t('name')}</th>
                <th className="px-4 py-2 text-left">{t('description')}</th>
                <th className="px-4 py-2 text-left">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {families?.map((family, index) => {
                const { id, name, description } = family;
                return (
                  <tr key={id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{description}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link to={`/edit-families`} state={{ id, name, description }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(id, name)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FamiliesView;
