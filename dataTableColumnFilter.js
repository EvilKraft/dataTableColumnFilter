function dataTableColumnFilter( api ) {
    api.columns('.select-filter').every( function () {
        let column = this;
        const title = column.header().innerText;

        let select = $('<select class="form-control" style="width: 100%; padding: 0; height: 20px;"><option value="">'+title+'</option></select>')
            .appendTo( $(column.header()).empty() )
            .on( 'change', function () {
                const val = $.fn.dataTable.util.escapeRegex($(this).val());
                //column.search( val ? '^'+val+'$' : '', true, false ).draw();
                column.search( val ? ''+val+'' : '', true, false ).draw();
            }).on( 'click', function( event ) {
                event.stopPropagation();
            });

        column.data().unique().sort().each( function ( d, j ) {
            if(d){
                const val = $.fn.dataTable.util.escapeRegex(d);
                // if (column.search() === "^" + val + "$") {
                if (column.search() === "" + val + "") {
                    select.append(
                        '<option value="' + d + '" selected="selected">' + d + "</option>"
                    );
                } else {
                    select.append('<option value="' + d + '">' + d + "</option>");
                }
            }
        });
    });
}

$(document).on( 'init.dt', function ( e, settings ) {
    let api = new $.fn.dataTable.Api( settings );

    if ( api.init().dataTableColumnFilter || $.fn.dataTable.defaults.dataTableColumnFilter ){
        new dataTableColumnFilter( api );
    }
} );
