function dataTableColumnFilter( api ) {
    const selectFilter = api.ajax.json().select_filter ?? [];

    api.columns('.select-filter').every( function () {
        let column = this;
        const title = column.header().innerText;
        const titleAll   = title+' (All)';
        const titleEmpty = title+' (Empty)';

        let select = $('<select class="form-select" style="width: 100%; padding: 0; height: 20px;"><option selected value="">'+titleAll+'</option><option value="##Empty##">'+titleEmpty+'</option></select>')
            .appendTo( $(column.header()).empty() )
            .on( 'change', function () {
                const val = $.fn.dataTable.util.escapeRegex($(this).val());

                if(val === '##Empty##'){
                    column.search('^$', true, false ).draw();
                }else{
                    //column.search( val ? '^'+val+'$' : '', true, false ).draw();
                    column.search( val ? ''+val+'' : '', true, false ).draw();
                }
            }).on( 'click', function( event ) {
                event.stopPropagation();
            });

        const selectValues = (column.name() in selectFilter) ? selectFilter[column.name()] : column.data().unique().sort().toArray();
        selectValues.forEach((d) => {
            if (d === null || d === undefined) {
                return;
            }

            const val = $.fn.dataTable.util.escapeRegex(d);
            // if (column.search() === "^" + val + "$") {
            const selected = (column.search() === "" + val + "") ? 'selected="selected"' : '';
            select.append(`<option value="${d}" ${selected}>${d}</option>`);
        });
    });
}

$(document).on( 'init.dt', function ( e, settings ) {
    let api = new $.fn.dataTable.Api( settings );
    if ( !api.init().dataTableColumnFilter || !$.fn.dataTable.defaults.dataTableColumnFilter ){
        new dataTableColumnFilter( api );
    }
});
