import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createOutbound = async (body) => {
    const outboundRef = doc(db,'outbounds',body.lote);
    const response = await setDoc(outboundRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getOutbounds = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'outbounds'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        return error;
    }
}

export const getOutbound = async (id) => {
    try {
        const docRef = doc(db, "outbounds", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateOutbound  = async (id,body) => {
    try {
        const docRef = doc(db, 'outbounds', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteOutbound = async (id,body) => {
    try {
        const docRef = doc(db,'outbounds',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}