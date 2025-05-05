import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../app/actions/categories";
import { useTranslation } from "react-i18next";
import swal from 'sweetalert2';

const GroupsView = () => {
  const { t } = useTranslation();
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id, category) => {
    swal
      .fire({
        title: "¿Desea eliminar el grupo " + category + "?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategory(id));
        }
      });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="container mx-auto px-4">
        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          {t('groupView.listGroup')}
          <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate("/add-group")}>
            <FcAddRow className="mr-2 h-5 w-5" />
            {t('groupView.addGroup')}
          </button>
        </h2>
        <div className="overflow-x-scroll">
          <table className="w-full table-auto">
            <thead className="bg-[#0e6fa5] text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">{t('groupView.name')} </th>
                <th className="px-4 py-2 text-left">{t('groupView.description')}</th>
                <th className="px-4 py-2 text-left">{t('groupView.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {groups?.map((group, index) => {
                const { id, category, description, undelete } = group;
                return (
                  <tr key={id}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{category}</td>
                    <td className="px-4 py-2">{description}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link to={`/edit-group`} state={{ id, category, description }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(id, category)}
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

export default GroupsView;
