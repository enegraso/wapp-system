import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { userAdd } from '../../app/actions/users';
import Swal from 'sweetalert2';
import "../../App.css";
import logo from "../../assets/images/logo64.png";
import { Icon } from 'react-icons-kit';
import { eyeOff, eye } from 'react-icons-kit/feather';
import { useState } from 'react';
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import { configAdd } from '../../app/actions/configs';  // Restaurado
import { cateAdd } from '../../app/actions/categories';  // Restaurado

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cellphone, setCellphone] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


    const schema = Yup.object().shape({
        name: Yup.string().required("Tu nombre es requerido"),
        username: Yup.string().required("Usuario es requerido"),
        password: Yup.string().required("Contraseña es requerida").min(4, "Password must be at least 4 characters"),
        repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').min(4, "Re Password must be at least 4 characters").required("Re ingrese Contraseña"),
    });

    const handleToggle = () => {
        setIcon(type === 'password' ? eye : eyeOff);
        setType(type === 'password' ? 'text' : 'password');
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-r bg-green-500 to-white flex items-center justify-center">
            <div className="absolute top-4 left-4">
                <Link to="/" className="text-white text-xl font-semibold hover:text-gray-500 transition duration-300 flex flex-row gap-4 justify-center items-center">
                    <img src={logo} alt="Logo Wapp Message System" className="w-8 h-8" />
                    WApp Message System
                </Link>
            </div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                <h2 className="text-center text-2xl font-bold mb-5">
                    Formulario de registro
                </h2>
                <Formik
                    validationSchema={schema}
                    initialValues={{ username: "", password: "", phoneNumber: "", name: "" }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        const userNew = {
                            name: values.name,
                            password: values.password,
                            username: values.username,
                            cellphone: cellphone, // .slice(1, 3) + "9" + cellphon.slice(3, 13),
                            // cellphone: values.phoneNumber(1, 3) + "9" + values.phoneNumber(3, 13), //values.phoneNumber,

                            isAdmin: false,
                            active: false,
                            autoreplys: false,
                            autobots: false
                        }
                        dispatch(userAdd(userNew))
                        console.log("Usuario", localStorage.getItem("userAdded"))

                        if (localStorage.getItem("userAdded") && localStorage.getItem("userAdded") >= 0) {
                            console.log("usuario creado, armando sus configuraciones")

                            const objConf = {
                                business: values.name,
                                userid: localStorage.getItem("userAdded")
                            }
                            const objGroup = {
                                category: "Default",
                                description: "Categoría por defecto",
                                undelete: true,
                                userid: localStorage.getItem("userAdded")
                            }
                            // atenti a configAdd

                            dispatch(configAdd(objConf)) // Genera bien la config del usuario, pero al cargarla en el state falla el push (ni siquiera se si es necesario cargarla en algún state
                            // al moment del registro)
                            dispatch(cateAdd(objGroup))
                            //
                            // dispatch(addInstance()) cambiar de lugar esta instancia ya que genera costo ewn waapi
                            //
                            Swal.fire({
                                title: "Genial!",
                                text: "Usuario registrado con éxito!",
                                icon: "success"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    resetForm({ values: "" })
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
                                        defaultCountry="AR"
                                        id="cellphone"
                                        enableSearch={true}
                                        value={cellphone}
                                        inputStyle={{
                                            height: '19px',
                                            width: 'inherit',
                                        }}
                                        onChange={(phone) => setCellphone(phone)}
                                        onBlur={handleBlur}
                                        placeholder="Número de celular"
                                    />
                                    {errors.phoneNumber && touched.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
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
                                    <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Registrarme
                                    </button>
                                    <div className='flex flex-row items-center justify-center'>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="inline-block align-baseline font-semibold text-sm hover:text-green-700 pr-1"
                                        >
                                            Ya tienes cuenta?
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
