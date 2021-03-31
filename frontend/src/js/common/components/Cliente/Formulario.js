import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
    renderCurrency,
} from "../Utils/renderField/renderField";

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Producto' : 'Registro de productos';
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Producto';
            
        }
        console.log("PROPS: en grado list", this.props)
        return(
            <form onSubmit={handleSubmit} className="w-25">
               
                <h4>{titulo}</h4>
               
                <div className="col-md-10 col-12 mb-2">
                <label>Nombre Producto</label>

                <Field name='nombre' component={renderField} disabled= {disable}/>
                
                    <label htmlFor="number_field">Precio</label>
                            <Field
                                name="precio"
                                placeholder="Precio"
                                component={renderCurrency}
                                disabled = {disable}
                            />

                </div>
                
                <br /><br/>
                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/productos'
                        className="btn btn-secondary btn-sm mr-2"
                    >
                        Cancelar
                    </a>


                    {disable == false &&
                        <button 
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type= 'submit' 
                        >
                            {editar ? 'Actualizar' : 'Registrar' }

                        </button>
                    }
                </div>

            </form>
        );
    }
}

export default reduxForm({
    form: 'producto' // identificador unico del formulario 
  })(Formulario)