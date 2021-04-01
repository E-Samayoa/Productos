import React, {Component} from 'react';
import Formulario from './Formulario';

class Cliente extends Component{
    
    state={
        crear: true,
    }

    componentWillMount = () =>{
        const {leer, match} = this.props;
        const id = this.props.match.params.id;
        console.log("Probando id", this.props);

        if(id){
            this.setState({crear: false});
            leer(id);
        }
    }
    
    render(){

        const { compraProducto, actualizarProducto } = this.props;
        const {crear} = this.state;

        const funcionEnvio = crear ? compraProducto: actualizarProducto;

        return(
        
        <Formulario
            
            crear = {crear}
            onSubmit = {funcionEnvio}
            
        />


        );
    }

}

export default Cliente;