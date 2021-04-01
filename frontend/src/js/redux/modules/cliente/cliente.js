import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_PRODUCTOS = "GUARDAR_LISTADO_PRODUCTOS";
const GUARDAR_REGISTRO_PRODUCTO = "GUARDAR_LISTADO_PRODUCTO";
const GUARDAR_PAGINA_PRODUCTO ="GUARDAR_PAGINA_PRODUCTO";



export const leer = (id) => (dispatch) => {
    api.get(`/producto/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_PRODUCTO, registro: response});
        dispatch(initializeForm('producto', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}

export const compraProducto = () => (dispatch, getStore) => {
    const formData = getStore().form.clientes.values;
    api.post('/cliente', formData).then((response) => {
        NotificationManager.success(
            'Compra realizada correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el grado', 
            'ERROR', 
            0
            );
        })
}




export const actions = {
    compraProducto,
    
};

export const reducers = {

    [GUARDAR_LISTADO_PRODUCTOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_PRODUCTO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_PRODUCTO]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },

};

export const initialState = {
    loader: false,
    registro: null,
    data: null,
    page: 1,
};

export default handleActions(reducers, initialState);