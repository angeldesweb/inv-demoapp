import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createInbound = async (body) => {
    const inboundRef = doc(db,'inbounds',body.lote);
    const response = await setDoc(inboundRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getInbounds = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'inbounds'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        return error;
    }
}

export const getInbound = async (id) => {
    try {
        const docRef = doc(db, "inbounds", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateInbound  = async (id,body) => {
    try {
        const docRef = doc(db, 'inbounds', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteInbound = async (id,body) => {
    try {
        const docRef = doc(db,'inbounds',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}