import {MdDeleteForever,MdInfo,MdPublishedWithChanges,} from "react-icons/md";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tabla = () => {
    const navigate = useNavigate();
    const { fetchDataBackend } = useFetch();
    const [pasantes, setPasantes] = useState([]);

    const listPasantes = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/pasantes`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        };
        const response = await fetchDataBackend(url, null, "GET", headers);
        setPasantes(response);
    };

    useEffect(() => {
        listPasantes();
    }, []);

    const deletePasante = async (id) => {
        const confirmDelete = confirm("Vas a eliminar el pasante, ¿Estás seguro?");
        if (confirmDelete) {
            const url = `${import.meta.env.VITE_BACKEND_URL}/pasante/eliminar/${id}`;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                },
            };
            // Si quieres enviar datos adicionales, agregalos aquí; si no, puedes pasar null en fetchDataBackend
            await fetchDataBackend(url, null, "DELETE", options.headers);
            setPasantes((prevPasantes) =>
                prevPasantes.filter((pasante) => pasante._id !== id)
            );
        }
    };

    if (pasantes.length === 0) {
        return (
            <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
            >
                <span className="font-medium">No existen registros</span>
            </div>
        );
    }

    return (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
                <tr>
                    {[
                        "N°",
                        "Cédula",
                        "Nombre completo",
                        "Correo",
                        "Teléfono",
                        "Carrera",
                        "Institución",
                        "Acciones",
                    ].map((header) => (
                        <th key={header} className="p-2">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {pasantes.map((pasante, index) => (
                    <tr className="hover:bg-gray-300 text-center" key={pasante._id}>
                        <td>{index + 1}</td>
                        <td>{pasante.cedula}</td>
                        <td>{pasante.nombres}</td>
                        <td>{pasante.email}</td>
                        <td>{pasante.telefono}</td>
                        <td>{pasante.carrera}</td>
                        <td>{pasante.institucion}</td>
                        <td className="py-2 text-center">
                            <MdPublishedWithChanges
                                title="Actualizar"
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                                onClick={() => navigate(`/dashboard/actualizar/${pasante._id}`)}
                            />

                            <MdInfo
                                title="Más información"
                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                onClick={() => navigate(`/dashboard/visualizar/${pasante._id}`)}
                            />

                            <MdDeleteForever
                                title="Eliminar"
                                className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                onClick={() => deletePasante(pasante._id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Tabla;
