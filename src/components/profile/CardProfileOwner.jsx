import storeProfile from "../../context/storeProfile"

export const CardProfileOwner = () => {

    const {user} = storeProfile()

    return (
        <div className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto " width={120} height={120} />
            </div>
            <div className="self-start">
                <b>Nombre del Propietario:</b><p className="inline-block ml-3">{user.nombrePropietario}</p>
            </div >
            <div className="self-start">
                <b>Cédula del Propietario:</b><p className="inline-block ml-3">{user.cedulaPropietario}</p>
            </div >
            <div className="self-start">
                <b>Email del Propietario:</b><p className="inline-block ml-3">{user.emailPropietario}</p>
            </div>
            <div className="self-start">
                <b>Celular del Propietario:</b><p className="inline-block ml-3">{user.celularPropietario}</p>
            </div>
            <div className="self-start">
                <b>Nombre del paciente:</b><p className="inline-block ml-3">{user.nombreMascota}</p>
            </div>
        </div>
    )
}