export const errors = () =>  {
    return {
        auth:()=>({
            'user-not-found': () => 'Usuario y/o contraseña no válidos',
            'wrong-password': () => 'Contraseña inválida',
            'too-many-requests': () => 'Ha realizado muchas solicitudes seguidas, debe esperar unos minutos o consultar con el administrador del sistema'
        })
    }
}