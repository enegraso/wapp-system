import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { logOut, userAdd } from '../../app/actions/users';
import Swal from 'sweetalert2';
import { configAdd } from '../../app/actions/configs';
import { cateAdd } from '../../app/actions/categories';
import "../../App.css";
import logo from "../../assets/images/logo64.png";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useState } from 'react';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
/* import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css"; */
import Agrobombas from '../../assets/images/agrobombas.logo.jpg'


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [cellphon, setCellphon] = useState("");

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = Yup.object().shape({
        // phoneNumber: Yup.string().required("Tu celular es requerido").matches(phoneRegExp, 'Phone number is not valid').max(13, "Máximo 13 caracteres numéricos"),
        name: Yup.string().required("Tu nombre es requerido"),
        username: Yup.string().required("Usuario es requerido"),
        password: Yup.string().required("Contraseña es requerida").min(4, "Password must be at least 4 characters"),
        repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').min(4, "Re Password must be at least 4 characters").required("Re ingrese Contraseña"),
    });

    // show/hide password
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-r bg-[#0e6fa5] to-white flex items-center justify-center">
            <div className="absolute top-4 left-4">
                <Link to="/" className="text-white text-xl font-semibold hover:text-gray-500 transition duration-300 flex flex-row gap-4 justify-center items-center">
                    <img src={Agrobombas} alt="Logo Wapp Message System" className='w-18 h-12 rounded-md '/>
                    Agro Bombas Bragado
                </Link>
            </div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                <h2 className="text-center text-2xl font-bold mb-5">
                    Formulario de registro
                </h2>
                <Formik
                    validationSchema={schema}
                    initialValues={{ username: "", password: "", phoneNumber: "", name: "" }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        console.log('Logging in', values);
                        const userNew = {
                            name: values.name,
                            password: values.password,
                            username: values.username,
                            cellphone: cellphon.substring(0, 3) === "+54" ? cellphon.slice(1, 3) + "9" + cellphon.slice(3, 13) : cellphon.replace("+", ""),// values.phoneNumber.slice(1, 3) + "9" + values.phoneNumber.slice(3, 13), // values.phoneNumber,
                            isAdmin: false,
                            active: false,
                            autoreplys: false,
                            autobots: false
                        }
                        await dispatch(userAdd(userNew))
                        if (localStorage.getItem("userAdded") && localStorage.getItem("userAdded") === "true") {
                            const usuarioNuevoId = parseInt(localStorage.getItem("newUser"))
                            console.log()
                            const objConf = {
                                business: values.name,
                                userid: parseInt(usuarioNuevoId)
                            }
                            console.log("agrego config por defecto")
                            await dispatch(configAdd(objConf))
                            const objGroup = {
                                category: "Default",
                                description: "Categoría por defecto",
                                undelete: true,
                                userid: parseInt(usuarioNuevoId)
                            }
                            console.log("agrego grupo por defecto")
                            await dispatch(cateAdd(objGroup))
                            Swal.fire({
                                title: "Genial!",
                                text: "Usuario registrado con éxito!",
                                icon: "success"
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    resetForm({ values: "" })
                                    await dispatch(logOut())
                                    navigate("/", { replace: true });
                                }
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: localStorage.getItem("userAdded"),
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
                                setFieldValue,
                                handleSubmit
                            } = props;

                            return (
                                <Form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                                        <input
                                            className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Ingresa tu Nombre"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.name && touched.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Celular</label>
                                        <PhoneInput
                                            id="cellphon"
                                            defaultCountry="AR"
                                            enableSearch={true}
                                            value={cellphon}
                                            inputStyle={{
                                                height: "19px",
                                                width: "inherit",
                                            }}
                                            onChange={(cellphon) => {
                                                setCellphon(cellphon);
                                            }}
                                            placeholder="Número de celular"
                                        />
                                        {/* {errors.phoneNumber && touched.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>} */}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Usuario</label>
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
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="password"
                                                name="password"
                                                type={type}
                                                placeholder="Ingresa tu Contraseña"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span onClick={handleToggle} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                                                <Icon icon={icon} size={20} />
                                            </span>
                                        </div>
                                        {errors.password && touched.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repassword">Confirmar Contraseña</label>
                                        <input
                                            className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="repassword"
                                            name="repassword"
                                            type="password"
                                            placeholder="Confirma tu Contraseña"
                                            value={values.repassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.repassword && touched.repassword && <p className="text-red-500 text-xs italic">{errors.repassword}</p>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button type="submit" disabled={isSubmitting} className="bg-[#0e6fa5] hover:bg-[#3bc7f3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Registrarme
                                        </button>
                                        <div className='flex flex-row items-center justify-center'>
                                            Ya tienes cuenta?
                                            <button
                                                onClick={() => navigate('/login')}
                                                className="inline-block align-baseline font-bold text-sm text-[#0e6fa5] hover:text-[#3bc7f3]"
                                            >
                                                Ingresa
                                            </button>
                                        </div>

                                    </div>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}

export default Register;
