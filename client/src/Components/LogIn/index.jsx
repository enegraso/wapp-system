import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { getUser } from '../../app/actions/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import "../../App.css";
import logo from "../../assets/images/logo64.png";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useTranslation } from "react-i18next";
import Spain from '../../assets/images/spain.jpg'
import Usa from '../../assets/images/usa.jpg'
import Agrobombas from '../../assets/images/agrobombas.logo.jpg'


const LogIn = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const isActive = (lng) => i18n.language === lng;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const schema = Yup.object().shape({
        username: Yup.string().required("Usuario es requerido"),
        password: Yup.string()
            .required("Contraseña es requerida").min(4, "Password must be at least 4 characters"),
    });

    // show/hide password
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-r bg-[#0e6fa5] to-white flex items-center justify-center">
            <div className="absolute top-4 left-4">
                <Link to="/" className="text-white text-xl font-semibold hover:text-gray-500 transition duration-300 flex flex-row gap-4 justify-center items-center">
                    <img src={Agrobombas} alt="Logo Agrobombas Bragado" className="w-18 h-12 rounded-md" />
                    Agro Bombas Bragado
                </Link>

            </div>
            <div className='absolute top-4 right-4'>
                <div className="flex space-x-4 items-center justify-end">
                    <button
                        onClick={() => changeLanguage('en')}
                        className={`flex items-center px-3 py-2 rounded ${isActive('en') ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <img src={Usa} alt="English" className="w-4 h-4 mr-2" />
                        EN
                    </button>
                    <button
                        onClick={() => changeLanguage('es')}
                        className={`flex items-center px-3 py-2 rounded ${isActive('es') ? 'bg-[#0e6fa5] border text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <img src={Spain} alt="Español" className="w-4 h-4 mr-2" />
                        ES
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-center text-2xl font-bold mb-5">
                    ¡Bienvenido!
                </h2>

                <Formik
                    validationSchema={schema}
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        dispatch(getUser(values.username, values.password))
                            .then(() => {
                                if (localStorage.getItem("allowLogin") === "true") {
                                    navigate("/");
                                    console.log("ENTRO!");
                                } else {
                                    Swal.fire({
                                        title: "Error",
                                        text: localStorage.getItem("userInfo"),
                                        icon: "error"
                                    });
                                    console.log("NO entro");
                                }
                                setSubmitting(false);
                            })
                            .catch((error) => {
                                Swal.fire({
                                    title: "Error",
                                    text: "Hubo un problema al intentar iniciar sesión. Por favor, inténtelo de nuevo.",
                                    icon: "error"
                                });
                                console.log("Error: ", error);
                                setSubmitting(false);
                            });
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
                            <Form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username" >{t("login.user")}</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Ingresa tu Usuario"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.username && touched.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                                </div>
                                <div className="relative">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">{t("login.password")}</label>
                                    <input
                                        className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        name="password"
                                        type={type}
                                        placeholder="Ingresa tu contraseña"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span className="absolute inset-y-0 pt-6 right-0 pr-3 flex items-center cursor-pointer" onClick={handleToggle}>
                                        <Icon icon={icon} size={20} />
                                    </span>
                                    {errors.password && touched.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                </div>
                                <div className="flex items-center justify-between row">
                                    <button type="submit" disabled={isSubmitting} className="bg-[#0e6fa5] hover:bg-[#3bc7f3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        {t("login.login")}
                                    </button>
                                    <div className='flex flex-row items-center justify-center'>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="inline-block align-baseline font-semibold text-sm hover:text-[#3bc7f3] pr-1"
                                        >
                                            {t("login.register")}
                                        </button>
                                        <button
                                            onClick={() => navigate('/register')}
                                            className="inline-block align-baseline font-bold text-sm text-[#0e6fa5] hover:text-[#3bc7f3]"
                                        >
                                            {t("login.register1")}

                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default LogIn;
