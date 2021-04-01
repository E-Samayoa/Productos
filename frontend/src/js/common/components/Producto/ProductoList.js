import React, {Component} from 'react';
import { eliminar } from '../../../redux/modules/producto/producto';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";
import {
    renderCurrency,
} from "../Utils/renderField/renderField";

class ListadoProductos extends Component{
   
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }

    

    render(){
        console.log("PROPS: en grado list", this.props)
        const {data, loader, eliminar, listar} = this.props;
        return(
            <React.Fragment>

                <center><h3>Productos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/productos/crear' 
                        className="btn btn-primary "
                    >
                        Crear Producto
                    </a>
                </div>
                {data &&
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
                    onPageChange={listar} 
                   // onSortChange={onSortChange} 
                >
                    <TableHeaderColumn
                        isKey
                        dataField="nombre"
                        dataSort                    
                    >
                        Producto
                    </TableHeaderColumn>
                    <TableHeaderColumn                                        
                        dataField="precio"
                        dataSort
                    >
                        Precio
                    </TableHeaderColumn>          
                    <TableHeaderColumn
                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "productos", ver: "productos", eliminar: eliminar})}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoProductos;