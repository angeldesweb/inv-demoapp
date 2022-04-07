import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createUser = async (body) => {
    const userRef = doc(db,'users',body.name);
    const response = await setDoc(userRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getUsers = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'users'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        return error;
    }
}

export const getUser = async (id) => {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateUser  = async (id,body) => {
    try {
        const docRef = doc(db, 'users', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteUser = async (id,body) => {
    try {
        const docRef = doc(db,'users',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}