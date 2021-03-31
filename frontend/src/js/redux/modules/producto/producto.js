import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_PRODUCTOS = "GUARDAR_LISTADO_PRODUCTOS";
const GUARDAR_REGISTRO_PRODUCTO = "GUARDAR_LISTADO_PRODUCTO";
const GUARDAR_PAGINA_PRODUCTO = "GUARDAR_PAGINA_PRODUCTO";


export const listar = (page=1) => (dispatch, getStore) =>{
    const estado = getStore().producto;
    const data = {
        page:estado.page
    }
    api.get('/producto',data).then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_PAGINA_PRODUCTO, page: page})
        dispatch({type: GUARDAR_LISTADO_PRODUCTOS, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los Productos', 
            'ERROR', 
            0
            );
        });

}

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





export const registroProducto = () => (dispatch, getStore) => {
    const formData = getStore().form.producto.values;
    api.post('/producto', formData).then((response) => {
        NotificationManager.success(
            'Grado registrado correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/productos'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el grado', 
            'ERROR', 
            0
            );
        })
    console.log("formData:", formData);
}


export const actualizarProducto = () => (dispatch, getStore) => {
    const formData = getStore().form.producto.values;
    const id = formData.id;
    api.put(`/producto/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/productos'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el grado',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/producto/${id}`).then((response) =>{
        NotificationManager.success(
            'Producto eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar())
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el Producto',
            'ERROR',
             0
        );
    })

}



export const actions = {
    registroProducto,
    actualizarProducto,
    listar,
    leer,
    eliminar,
    
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