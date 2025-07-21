import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";

const DetailsPasante = () => {
    const { id } = useParams();
    const [pasante, setPasante] = useState({});
    const [exposiciones, setExposiciones] = useState([]);
    const { fetchDataBackend } = useFetch();

    const listPasante = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/pasante/${id}`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        };
        const response = await fetchDataBackend(url, null, "GET", headers);
        setPasante(response);
    };

    const listExposiciones = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL
            }/exposiciones?pasanteId=${id}`;
        const storedUser = JSON.parse(localStorage.getItem("auth-token"));
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        };
        const response = await fetchDataBackend(url, null, "GET", headers);
        setExposiciones(response || []);
    };

    useEffect(() => {
        listPasante();
        listExposiciones();
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("es-EC", {
            dateStyle: "long",
            timeZone: "UTC",
        });
    };

    return (
        <>
            <div>
                <h1 className="font-black text-4xl text-gray-500">
                    Visualizar Pasante
                </h1>
                <hr className="my-4 border-t-2 border-gray-300" />
                <p className="mb-8">
                    Detalles del pasante y sus exposiciones registradas.
                </p>
            </div>

            <div className="m-5 flex justify-between">
                {/* Datos del Pasante */}
                <div>
                    <ul className="list-disc pl-5">
                        <li className="text-md text-gray-00 mt-4 font-bold text-xl">
                            Datos del pasante
                        </li>
                        <ul className="pl-5">
                            <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">Cédula:</span>{" "}
                                {pasante?.cedula}
                            </li>
                            <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">
                                    Nombres completos:
                                </span>{" "}
                                {pasante?.nombres}
                            </li>
                            <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">
                                    Correo electrónico:
                                </span>{" "}
                                {pasante?.email}
                            </li>
                            <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">Teléfono:</span>{" "}
                                {pasante?.telefono}
                            </li>
                            <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">Carrera:</span>{" "}
                                {pasante?.carrera}
                            </li>
                            <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">Institución:</span>{" "}
                                {pasante?.institucion}
                            </li>
                        </ul>
                    </ul>
                </div>

                {/* Imagen del pasante */}
                <div>
                    <img
                        src={pasante?.avatarIA || "/avatar-placeholder.jpg"}
                        alt="avatar"
                        className="h-80 w-80 rounded-full object-cover"
                    />
                </div>
            </div>

            <hr className="my-4 border-t-2 border-gray-300" />

            {/* Sección de Exposiciones */}
            <div className="m-5">
                <h2 className="font-bold text-3xl mb-4">Exposiciones</h2>

                {exposiciones.length === 0 ? (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">
                            No hay exposiciones registradas.
                        </span>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {exposiciones.map((expo) => (
                            <li
                                key={expo._id}
                                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                            >
                                <h3 className="text-xl font-semibold">{expo.titulo}</h3>
                                <p className="text-gray-600">Fecha: {formatDate(expo.fecha)}</p>
                                <p>{expo.descripcion}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default DetailsPasante;
