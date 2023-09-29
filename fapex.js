function InitializeFapexReport(list) {
    let l = Array.isArray(list) ? list : [list];
    l.forEach((e) => {
        this[e.staticId] = new FapexReport(e.staticId, e.options);
    });
}
function FapexReport(regionId, options) {
    let region, table, regionType;
    //.................................................................................................................//
    //                                               validations
    //.................................................................................................................//
    region = $('#' + regionId);
    if (!region.length) { console.log('Invalid Region Static ID: ' + regionId); return; }
    if ($('#report_table_' + regionId).length) {
        table = $('#report_table_' + regionId);
        regionType = 'classis report';
    } else if (region.find('table.a-IRR-table').length) {
        table = region.find('table.a-IRR-table');
        regionType = 'interactive report';
    } else {
        console.log('Invalid Region Type.'); return;
    }
    //.................................................................................................................//
    //                                                  attributes
    //.................................................................................................................//
    this.id = regionId;
    this.options = {
        multiSelection: options.multiSelection !== undefined ? options.multiSelection : false,
        selectFirstRow: options.selectFirstRow !== undefined ? options.selectFirstRow : true,
        selectionClass: options.selectionClass !== undefined ? options.selectionClass : undefined
    };
    let o = this.options;

    //.................................................................................................................//
    //                                                  methods
    //.................................................................................................................//
    this.getSelectedRows = () => pGetRowsObj(true);
    this.getAllRows = () => pGetRowsObj();
    this.getSelectedRowsData = () => pGetRows(true);
    this.getAllRowsData = () => pGetRows();
    this.getColumnList = () => pGetColumns();
    this.selectAll = () => { table.find('tr').attr('is-selected', '') };
    this.clearSelection = () => { table.find('tr[is-selected]').removeAttr('is-selected') };
    //.................................................................................................................//
    //                                              private methods
    //.................................................................................................................//
    let pAddCSS = (css) => {
        if (regionType = 'classis report') {
            let s =
                `<style>
            #${this.id} tr:hover td${!o.selectionClass ? ', #' + this.id + ' tr[is-selected] td' : ''}{
                background-color : var(--a-gv-row-hover-background-color);
            }
            </style>`;
            region.prepend($(s));
        }
    },
        pExtractColumnData = (c) => {
            let n = $(c).hasClass('u-tR'), text = $(c).text();
            return n ? Number(text.replace(',', '')) : text;
        },
        pExtractRowData = (r) => $(r).find('td').get().map((c) => pExtractColumnData(c));
    pExtractRowObj = (r) => {
        let columns = pGetColumns(), data = pExtractRowData(r), o = {};
        columns.forEach((c, i) => o[c] = data[i]);
        return o;
    },
        pGetRows = (selected) => {
            let allDataRows;
            allDataRows = table.find('tr' + (selected ? '[is-selected]' : '')).filter(
                (i, r) => $(r).find('td').length).get().map(
                    (r) => pExtractRowData(r)
                );
            return allDataRows;
        },
        pGetRowsObj = (selected) => {
            let allDataRows = pGetRows(selected), columns = pGetColumns();
            return allDataRows.map((e) => {
                let o = {};
                e.forEach((ee, i) => o[columns[i]] = ee);
                return o;
            });
        },
        pGetColumns = () => {
            let r = table.find('tr').filter((i, r) => $(r).find('th').length > 1).last().find('th').get().map((c) => $(c).text());
            return r;
        },
        pSelectFirstRow = () => {
            let t = table.find('tr').filter((i, r) => $(r).find('td').length).first();
            pToggleSelection(t);
        },
        pToggleSelection = (t) => {
            let prvSelection = region.find('tr[is-selected]');
            if (typeof (t.attr('is-selected')) == 'undefined') {
                if (!o.multiSelection) {
                    if (o.selectionClass) prvSelection.removeClass(o.selectionClass);
                    prvSelection.removeAttr('is-selected');
                };
                if (o.selectionClass) t.addClass(o.selectionClass);
                t.attr('is-selected', '');
            } else {
                if (o.selectionClass) t.removeClass(o.selectionClass);
                t.removeAttr('is-selected');
            };
            $('#' + this.regionId).trigger('interactivegridselectionchange', t);
        };
    //.................................................................................................................//
    //                                                      add CSS
    //.................................................................................................................//
    pAddCSS();
    //.................................................................................................................//
    //                                                       events
    //.................................................................................................................//
    //$('#' + regionId).on('apexafterrefresh', () => console.log('apexafterrefresh'));
    $('#' + regionId + ' table').on('click', (e) => {
        e.stopPropagation();
        let t = $(e.target).parents('tr');
        pToggleSelection(t);
        if (t.find('td').length) t.trigger('interactivegridselectionchange', pExtractRowObj(t));
    });
    $(document).ready(function () {
        if (!o.multiSelection && o.selectFirstRow) pSelectFirstRow();
    });
};
