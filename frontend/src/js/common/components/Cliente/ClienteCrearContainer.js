import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cliente/cliente';
import Catalogo from './Formulario';


const ms2p = (state) => {
  return {
    ...state.cliente,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Catalogo);
