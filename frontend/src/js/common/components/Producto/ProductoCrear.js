import React, {Component} from 'react';
import Formulario from './Formulario';

class Producto extends Component{
    
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

        const { registroProducto, actualizarProducto } = this.props;
        const {crear} = this.state;

        const funcionEnvio = crear ? registroProducto: actualizarProducto;

        return(
        
        <Formulario
            
            crear = {crear}
            onSubmit = {funcionEnvio}
            
        />


        );
    }

}

export default Producto;