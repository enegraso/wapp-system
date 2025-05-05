import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cateAdd } from "../../app/actions/categories";
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import "../../App.css"

const AddGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.usersReducer.login)

  const schema = Yup.object().shape({
    category: Yup.string().required("El grupo es requerido"),
    description: Yup.string().required("Descripcion es requerida").min(4, "Al menos 4"),
  });

  return (
    <div class="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 class="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Proveedor
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ category: "", description: "" }}
        onSubmit={async (values, { setSubmitting, resetForm },) => {
          const category = {
            category: values.category,
            description: values.description,
            userid: login.id
          }
          await dispatch(cateAdd(category))
          const success = JSON.parse(localStorage.categoryAdded)
          console.log("objeto", success)
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Grupo de contactos agregado \n Desea seguir agregando?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ categrory: "", description: "" })
              } else if (result.isDenied) {
                navigate("/show-groups")
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
        {
          props => {
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
              <Form onSubmit={handleSubmit}
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
                    Nombres:
                  </label>
                  <input
                    type="text"
                    class="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                    id="category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.category ? <p class="text-red-500 text-xs italic">{errors.category}</p> : ""}
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Numeros:
                  </label>
                  <input
                    type="text"
                    class="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description ? <p class="text-red-500 text-xs italic">{errors.description}</p> : ""}
                </div>
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Agregar Proveedor
                </button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  );
};

export default AddGroup;
