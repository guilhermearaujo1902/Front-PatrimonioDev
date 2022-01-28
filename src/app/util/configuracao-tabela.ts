import {DefaultConfig} from 'ngx-easy-table';


export default function(){
  var configuracao  = { ...DefaultConfig }

  configuracao.isLoading = true;
  configuracao.columnReorder = true;
  configuracao.fixedColumnWidth = false;
  configuracao.resizeColumn = true;

  return configuracao
};






