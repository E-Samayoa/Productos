import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { compraProducto } from '../../../redux/modules/cliente/cliente';
import {
      renderField,
      renderCurrency,
  } from "../Utils/renderField/renderField";
  
  class Formulario extends Component{
      render(){
          const {handleSubmit, crear, } = this.props;

          let titulo = "Compra Producto";
          let disable = false;
  
          console.log("PROPS: en grado list", this.props)
          return(
              <form onSubmit={handleSubmit} className="w-25">
                 
                  <h4>{titulo}</h4>
                  <h5>Datos Cliente</h5>
                 
                  <div className="col-md-10 col-12 mb-2">
                  <label>Nombre Cliente</label>
  
                  <Field name='nombre' component={renderField} disabled= {disable}/>
                  <label>cantidad</label>
                  <Field name='cantidad' component={renderField} disabled= {disable}/>
                  <label>Producto</label>
                  <Field name='producto.nombre' component={renderField} disabled= {disable}/>
                  <label>Precio</label>
                  <Field name='producto.precio' component={renderField} disabled= {disable}/>

                                  

  
                  </div>
                  
                  <br /><br/>
                  <div className="d-flex flex-row justify-content-end">
                      <a  
                          href = '/#/'
                          className="btn btn-secondary btn-sm mr-2"
                      >
                          Cancelar
                      </a>
  
  
                      {disable == false &&
                          <button 
                              className={`btn btn-sm ${crear ? 'btn-success' : 'btn-primary'}`}
                              type= 'submit' 
                          >
                              Comprar
  
                          </button>
                      }
                  </div>
  
              </form>
          );
      }
  }
  
  export default reduxForm({
      form: 'clientes' // identificador unico del formulario 
    })(Formulario)