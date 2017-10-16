+function ($) { "use strict";

  $(function(){

  // datatable
  $('[data-ride="datatables"]').each(function() {
    var oTable = $(this).dataTable( {
      //"bProcessing": true,
      "sAjaxSource": "js/datatables/datatablescan.json",
	  //"aaData": data,
      "sAjaxDataProp": "vk",
	 // "aaData": $.parseJSON(data).vk,
	  //"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
      //"sPaginationType": "full_numbers",
	  "aoColumns": [
        { "mData": "BlockNumber" },
        { "mData": "TimeStamp" },
        { "mData": "hash" },
        { "mData": "nonce" },
        { "mData": "blockHash" }
      ]
    } );
  });

  $('#growthrate').length && $.ajax('js/datatables/datatablescan.json').done(function(re){
	 
   // var data = $.csv.toArrays(re);
      $('#growthrate').html( '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped m-b-none" id="example"></table>' );
      $('#example').dataTable( {
		        "sAjaxSource": "http://ropsten.etherscan.io/api?module=account&action=txlist&address=0xFed55B453dBb0589ec5433a9318C09f1766D7dAb&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=2J2REFHXRX7GE4A4XT4XY2C47XWFTYPH27",

               "sAjaxDataProp": "result", 
           "bProcessing": true,
          "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
          "iDisplayLength": 50,
          "sPaginationType": "full_numbers",
        /*  "aoColumnDefs": [              
              { "bSearchable": false, "bVisible": false, "aTargets": [ 1 ] },
              { "bVisible": false, "aTargets": [ 4 ] },
              {
                  "mRender": function ( data, type, row ) {
                      return data +' '+ '%';
                  },
                  "aTargets": [ 5 ]
              },
              {
                  "mRender": function ( data, type, row ) {

                      return '<i class="fa '+ (row[5] > 0 ? 'fa-sort-up text-success' : 'fa-sort-down text-danger')+'"></i>';
                  },
                  'bSortable': false,
                  "aTargets": [ 6 ]
              },
          ],*/
        
		    "aoColumns": [
        { "mData": "timeStamp","sTitle":"timeStamp","mRender": function ( data, type, row ) {
var d = new Date(data*1000);
                      return d  ;
                  } },
       // { "mData": "hash","sTitle":"hash" }, 
		{ "mData": "from","sTitle": "From" },
        { "mData": "to","sTitle":"To"		},
        { "mData": "value","sTitle":"value" },
        { "mData": "gas","sTitle":"Fees" },
      ]
      } );  
  }); 




  });
}(window.jQuery);