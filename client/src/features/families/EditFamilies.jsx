import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { familyUpdate } from "../../app/actions/familiesActions";

const EditFamily = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [id] = useState(location.state.id);
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre de la familia es requerido"),
    description: Yup.string().required("La descripción es requerida").min(4, "Al menos 4 caracteres"),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Familia
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name, description }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const family = {
            name: values.name,
            description: values.description,
            id: id
          };
          dispatch(familyUpdate(family));
          const success = JSON.parse(localStorage.getItem('familyUpdated'));
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Familia modificada exitosamente!",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ name: "", description: "" });
                navigate("/show-families", { replace: true });
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <p className="mt-2 text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="description"
                  name="description"
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
                Editar Familia
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditFamily;
