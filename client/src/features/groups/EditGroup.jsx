import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCategory } from "../../app/actions/categories";

import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const EditGroup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state);
  const [id] = useState(location.state.id);
  const [category, setCategory] = useState(location.state.category);
  const [description, setDescription] = useState(location.state.description);

  const navigate = useNavigate();

  /*
     const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateCategory({ id, category, description }));
      navigate("/show-groups", { replace: true });
    };
   */

  const schema = Yup.object().shape({
    category: Yup.string().required("El grupo es requerido"),
    description: Yup.string().required("Descripcion es requerida").min(4, "Al menos 4"),
  });


  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Grupo
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ category, description }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const category = {
            category: values.category,
            description: values.description,
            id: id
          };
          dispatch(updateCategory(category));
          const success = JSON.parse(localStorage.getItem('categoryUpdated'));
          console.log("objeto", success);
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Grupo de contactos modificado!",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ category: "", description: "" });
                navigate("/show-groups", { replace: true });
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("userInfo"),
              icon: "error"
            });
          }
          setSubmitting(false);
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <Form onSubmit={handleSubmit} className="border rounded p-4 max-w-xl w-full mx-auto">
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Nombres:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.category && touched.category && (
                  <p className="mt-2 text-red-600">{errors.category}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Grupo:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <p className="mt-2 text-red-600">{errors.description}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar Grupo
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>

  );
};

export default EditGroup;