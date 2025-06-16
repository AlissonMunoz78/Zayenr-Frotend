import { useOutletContext } from 'react-router-dom';

const Profile = () => {
    const { usuario } = useOutletContext();

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil del Pasante</h1>
                <hr className='my-4 border-gray-300' />
                <p className='mb-8'>Aquí puedes ver tu información personal registrada.</p>
            </div>

            <div className='bg-white shadow-md rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                    <h2 className="text-2xl font-bold text-teal-800 mb-4">Tus Datos</h2>
                    <div className='mb-4'>
                        <label className='block text-gray-600 font-semibold'>Nombre Completo</label>
                        <p className='text-gray-800 text-lg'>{usuario.nombre}</p>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600 font-semibold'>Correo Institucional</label>
                        <p className='text-gray-800 text-lg'>{usuario.email}</p>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600 font-semibold'>Facultad</label>
                        <p className='text-gray-800 text-lg'>{usuario.facultad}</p>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600 font-semibold'>Celular</label>
                        <p className='text-gray-800 text-lg'>{usuario.celular}</p>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600 font-semibold'>Rol</label>
                        <p className='text-gray-800 text-lg capitalize'>{usuario.rol}</p>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <h2 className="text-2xl font-bold text-teal-800 mb-4">Foto de Perfil</h2>
                    <img
                        src={usuario.foto_url || 'https://cdn-icons-png.flaticon.com/512/2138/2138508.png'}
                        alt='Foto del pasante'
                        className='rounded-full w-48 h-48 object-cover border-4 border-teal-500 shadow-lg'
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
