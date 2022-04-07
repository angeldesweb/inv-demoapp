//@ts-nocheck
import { signInWithEmailAndPassword , sendEmailVerification , sendPasswordResetEmail , signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth  } from '../../firebase';
import { errors } from '../errors/auth.js'
import { getUser } from './users';

export const signIn = async (body) => {
    try {
        let role;
        const UserCredential = await signInWithEmailAndPassword(auth,body.email,body.password);
        const user = UserCredential.user;
        if(user.email){
            let currentUser = await getUser(user.email);
            role = currentUser.role;
        }
        if(!user.emailVerified) await sendEmailVerification(user);
        return {success:true,user,role}
    } catch (error) {
        let errorCode;
        let message;
        if(error.code){ 
            errorCode = error.code.split('/');
            message = errors()[errorCode[0]]()[errorCode[1]]()
            return {success:false,message}
        }else{
            return {success:false,message:'Error desconocido, si persiste comuníquese con el administrador del sistema.'}
        }
    }
};

export const PassRecovery = async (email) => {
    try {
        const resp = await sendPasswordResetEmail( auth , email )
        return {success:true}
    } catch (error) {
        return {success:false,error}
    }
}

export const logOut = async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        return false
    }
}