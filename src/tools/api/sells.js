import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createSell = async (body) => {
    const sellRef = doc(db,'sells',body.name);
    const response = await setDoc(sellRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getSells = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'sells'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        return error;
    }
}

export const getSell = async (id) => {
    try {
        const docRef = doc(db, "sells", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateSell  = async (id,body) => {
    try {
        const docRef = doc(db, 'sells', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteSell = async (id,body) => {
    try {
        const docRef = doc(db,'sells',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}