import { useEffect, useState } from "react"
import { useParams } from "react-router"
import useFetch from "../hooks/useFetch"
import { Form } from "../components/create/Form"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Update = () => {
    const { id } = useParams()
    const [pasante, setPasante] = useState({})
    const { fetchDataBackend } = useFetch()

    useEffect(() => {
        const searchPasante = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/pasante/${id}`
                const storedUser = JSON.parse(localStorage.getItem("auth-token"))

                if (!storedUser || !storedUser.state?.token) {
                    toast.error("Token de autenticación no encontrado.")
                    return
                }

                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedUser.state.token}`,
                }

                const response = await fetchDataBackend(url, null, "GET", headers)

                if (!response || response.error) {
                    toast.error("No se pudo obtener el registro.")
                    return
                }

                setPasante(response)
            } catch (error) {
                console.error(error)
                toast.error("Hubo un error al cargar el registro.")
            }
        }

        searchPasante()
    }, [id])

    return (
        <div className="px-4 md:px-8 py-4">
            <h1 className='font-black text-4xl text-gray-500'>Actualizar</h1>
            <hr className='my-4 border-t-2 border-gray-300' />
            <p className='mb-8'>Este módulo te permite actualizar un registro</p>

            <ToastContainer />

            {
                Object.keys(pasante).length !== 0 ?
                    (
                        <Form pasante={pasante} />
                    )
                    :
                    (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">No existen registros </span>
                        </div>
                    )
            }
        </div>
    )
}

export default Update
