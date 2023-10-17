//---------------------------------------------------------------------------------------//
//      Module Name: FapexReport
//      Purpose:     This module makes Classic Report and Interactive report selectable.   
//      Date:        14-oct-23
//---------------------------------------------------------------------------------------//
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
    $('#report_table_' + regionId ).on('click', (e) => {
        e.stopPropagation();
        let t = $(e.target).parents('tr');
        pToggleSelection(t);
        if (t.find('td').length) t.trigger('interactivegridselectionchange', pExtractRowObj(t));
    });
    $(document).ready(function () {
        if (!o.multiSelection && o.selectFirstRow) pSelectFirstRow();
    });
};
//---------------------------------------------------------------------------------------//
//      Module Name: FapexNavigation
//      Purpose:     To make navigation simpler    
//      Date:        14-oct-23
//---------------------------------------------------------------------------------------//

function FapexNavigation() {
    this.genPageId = function (app_id, page_no) {
        return '#' + app_id + '@' + page_no;
    }
    this.extractAppId = function (PageId) {
        return PageId.split('@').at(-2).replace('#', '');
    }
    this.extractPageId = function (PageId) {
        return PageId.split('@').at(-1);
    }
    this.getParamString = function (paramObj) {
        let str = '';
        Object.keys(paramObj).forEach((key, i) => { str += i ? '&' : ''; str += key + "=" + paramObj[key] });
        return str.replace(/ /g, '%20');
    }
    this.getParamNames = function (paramObj) {
        let str = '';
        Object.keys(paramObj).forEach((key, i) => { str += i ? ',' : ''; str += key });
        return str;
    }
    this.getParamValues = function (paramObj) {
        let str = '';
        Object.keys(paramObj).forEach((key, i) => { str += i ? ',' : ''; str += paramObj[key] });
        return str;
    }
    this.openUrl = function (url) {
        if (url) javascript: window.open(url, "_blank");
    }
    let ajx = async (appID, pageNo, paramNames, paramVals) => apex.server.process('FAPAXPROCESS', {
        x01: 'generate_url',
        x02: appID,
        x03: pageNo,
        x04: paramNames,
        x05: paramVals
    },
        {
            dataType: "json",
            async: true
        }
    ).then((pData) => {
        if (pData.status) {
            let dataObj = JSON.parse(pData.data);
            let { url, type, success, error } = dataObj;
            if (error)
                console.log(error);
            else {
                return url;
            }
        } else {
            console.log('Page link is not generated');
        }
    });
    this.genURL = async function (pageId, paramObj) {
        let appID = this.extractAppId(pageId), pageNo = this.extractPageId(pageId),
            paramNames = this.getParamNames(paramObj), paramVals = this.getParamValues(paramObj);

        if (pageNo) {
            return await ajx(appID, pageNo, paramNames, paramVals);
        }
    };
    this.navToPage = async function (pageId, paramObj) {
        let url = await this.genURL(pageId, paramObj);
        apex.navigation.redirect(url);
    }
    this.openPage = async function (pageId, paramObj) {
        let url = await this.genURL(pageId, paramObj);
        this.openUrl(url);
    }
}

//---------------------------------------------------------------------------------------//
//      Module Name: FapexFeatures
//      Purpose:     Collection of useful features in fapex.   
//      Date:        14-oct-23
//---------------------------------------------------------------------------------------//
function FapexFeatures() {
    this.copyIGCell = () => $(document).on('keyup', (e) => {
        if (e.ctrlKey && e.key == 'c' && $(e.target).is('td')) {
            {
                let t = $(e.target).text();
                if (t) {
                    navigator.clipboard.writeText(t);
                    $(e.target).addClass('copy-item-highlight');
                    setTimeout(() => $(e.target).removeClass('copy-item-highlight'), 200);
                }
            }
        };
    });
};

function parseDate(dateString, format) {
    let dt, dy = ['dd', 'd'], mn = ['mm', 'mon', 'MON'], yr = ['yyyy', 'yy'], sp = ['', '-', '/'];
    sp.forEach(s => {
        if (!dt) dy.forEach(d => {
            if (!dt) mn.forEach(m => {
                if (!dt) yr.forEach(y => {
                    if (!dt) try {
                        dt = apex.date.parse(dateString, d + s + m + s + y);
                    } catch (e) { }
                }
                )
            })
        })
    });
    return apex.date.format(dt, format);
}
let validateDateField = (item) => {
    if (this.browserEvent) this.browserEvent.stopPropagation();
    let v = $v(item), fm = $('#' + item).parent().find('[format]').attr('format'), nv = parseDate(v, fm);
    if (v !== nv) apex.item(item).setValue(nv);
};
