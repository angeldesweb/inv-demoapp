import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createClient = async (body) => {
    const clientRef = doc(db,'clients',body.name);
    const response = await setDoc(clientRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getClients = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'clients'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getClient = async (id) => {
    try {
        const docRef = doc(db, "clients", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const updateClient  = async (id,body) => {
    try {
        const docRef = doc(db, 'clients', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteClient = async (id,body) => {
    try {
        const docRef = doc(db,'clients',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}