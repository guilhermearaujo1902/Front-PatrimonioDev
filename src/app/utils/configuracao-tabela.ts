import {DefaultConfig} from 'ngx-easy-table';

export default function(){
  var configuracao  = { ...DefaultConfig }

  configuracao.columnReorder = false;
  configuracao.fixedColumnWidth = false;
  configuracao.resizeColumn = true;
  configuracao.detailsTemplate = true;
  configuracao.paginationRangeEnabled = false;

  return configuracao
};






