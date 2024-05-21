import React from "react";
import logo from "../assets/images/logo64.png"
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../app/actions/users";
import { useDispatch } from "react-redux";

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    return (<>

        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <img src={logo} alt="Logo Wapp System" width={48} height={48} />
                <Link className="navbar-brand" to="/">
                    WhatsApp Message System
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCentral"
                    aria-controls="navbarCentral"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {!localStorage.getItem("userInfo") ? "" :
                    <div className="collapse navbar-collapse" id="navbarCentral">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/show-groups">
                                    Grupos
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/show-contacts">
                                    Contactos
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/show-messages">
                                    Mensajes
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/queue-messages">
                                    En espera
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/sended-messages">
                                    Enviados
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/show-receipts">
                                    Recibidos
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/show-configs">
                                    Configuración
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="success" onClick={async () => {
                                    await dispatch(logOut());
                                    navigate("/login")

                                }}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>

    </>
    );
};

export default Navbar;