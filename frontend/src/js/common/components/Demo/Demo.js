import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Grid from "../Utils/Grid";

import { RenderCurrency} from "../Utils/renderField/renderReadField";

class Demo extends Component {

    componentWillMount = () => {
        const {dashboard} =this.props
        dashboard();
    }

    
    render() {
        const {data} = this.props;
        console.log("PROPS", this.props)
        console.log("Data dashboard: ", data);
        let disable = false;
        

        if (localStorage.getItem('token')) {
            disable = true;
        }
        
        return (

            <div className = 'mt-2'>
                <center><h3>Catalogo de Productos</h3></center>

                {data &&
                <table className = 'table table-borderred'>
                    <thead>
                        <tr>
                           
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>vendedor</th>
                            {disable == false &&
                            <th>Adquirir</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {data.productos.map((registro, i)=>
                            <tr key={i}>
                                <td><br />{registro.nombre}</td>
                                <td><br /><RenderCurrency value={registro.precio} /></td>   
                                <td><br />{registro.vendedor.username}</td>                             
                                <td><br />
                                    {disable == false &&
                                    <a  
                                       
                                        href = "/#/clientes/crear"
                                        type= "button"
                                        className="btn btn-outline-primary btn-sm mr-1"
                                        
                                    >
                                       Comprar 
                                    </a>
                                    }
                                   
                                </td>
                            </tr>
                    )}

                    </tbody>
                </table>
                }
                <br /><br/>
                <hr/>
                <br /><br/>
                <div>
                </div>


            </div>

        );
    }
}

export default Demo;
