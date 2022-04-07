import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createProvider = async (body) => {
    const providerRef = doc(db,'providers',body.name);
    const response = await setDoc(providerRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getProviders = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'providers'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        return error;
    }
}

export const getProvider = async (id) => {
    try {
        const docRef = doc(db, "providers", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateProvider  = async (id,body) => {
    try {
        const docRef = doc(db, 'providers', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteProvider = async (id,body) => {
    try {
        const docRef = doc(db,'providers',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}