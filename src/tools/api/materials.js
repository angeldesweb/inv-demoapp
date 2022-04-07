import { collection, doc, getDocs, getDoc , setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const createMaterial = async (body) => {
    const materialRef = doc(db,'materials',body.name);
    const response = await setDoc(materialRef,body)
    .then(() => ({success:true,message:'Registrado satisfactoriamente'}))
    .catch(error => ({success:false,message:error.message}))
    return response;
};

export const getMaterials = async () => {
    try {
        let collections = [];
        const qs = await getDocs(collection(db,'materials'));
        qs.forEach((doc) => collections = [...collections,doc.data()]);
        return collections;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getMaterial = async (id) => {
    try {
        const docRef = doc(db, "materials", id);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        return data;
    } catch (error) {
        return error;
    }
}

export const addAccount  = async (id,account) => {
    try {
        const curr = await getMaterial(id);
        const prevAccount = curr.account;const docRef = doc(db, 'materials', id);
        await updateDoc(docRef,{account:prevAccount + account});
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const substractAccount  = async (id,account) => {
    try {
        const curr = await getMaterial(id);
        const prevAccount = curr.account;const docRef = doc(db, 'materials', id);
        await updateDoc(docRef,{account:prevAccount - account});
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}

export const updateMaterial  = async (id,body) => {
    try {
        const docRef = doc(db, 'materials', id);
        await updateDoc(docRef,body);
        return {success:true}
    } catch (error) {
        return {success:false}
    }
};

export const deleteMaterial = async (id,body) => {
    try {
        const docRef = doc(db,'materials',id);
        await deleteDoc(docRef)
        return {success:true}
    } catch (error) {
        return {success:false}
    }
}