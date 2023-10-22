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
    pExtractRowData = (r) => $(r).find('td').get().map((c) => pExtractColumnData(c)),
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
    $('#' + regionId + ' .t-Report-report, ' + '#' + regionId + ' .a-IRR-table').on('click', (e) => {
        let t = $(e.target).parents('tr');
        if (t.find('td').length){
            e.stopPropagation();
            pToggleSelection(t);
            t.trigger('interactivegridselectionchange', pExtractRowObj(t));
        }
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
//---------------------------------------------------------------------------------------//
//      Module Name: FapexBackWorker
//      Purpose:     Collection of useful features in fapex.   
//      Date:        14-oct-23
//---------------------------------------------------------------------------------------//
function initiateBackWorker(){
    console.log(this);
    (function (global) {
    // shift alt ctrl command
    let _workerOn = false;
    const _tasksToDo = [],  _tasksPerformed = [], _handlers = [], _mods = { 16: false, 18: false, 17: false, 91: false },
        // special keys
        _MAP = {
            "command": 91, "backspace": 8, "tab": 9, "enter": 13, "shift": 16, "ctrl": 17, "alt": 18, "escape": 27, "space": 32, "end": 35,
            "home": 36, "insert": 45, "delete": 46, "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
            "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72, "i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79,
            "p": 80, "q": 81, "r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90, "0": 96, "1": 97, "2": 98, "3": 99, "4": 100,
            "5": 101, "6": 102, "7": 103, "8": 104, "9": 105, "*": 106, "+": 107, "-": 109, ".": 110, "/": 111, "f1": 112, "f2": 113, "f3": 114, "f4": 115,
            "f5": 116, "f6": 117, "f7": 118, "f8": 119, "f9": 120, "f10": 121, "f11": 122, "f12": 123, ";": 186, "=": 187, ",": 188, "-": 189, ".": 190,
            "/": 191, "`": 192, "[": 219, "\\": 220, "]": 221, "'": 222
        }, setting = {
            argSeperator: ' ',
            execInterval : 1000
        };
    function _mapKeys(str) {
        let p = {
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false
        };
        let l = str.split(' ').map(k => {
            switch (k) {
                case 'shift':
                    p.shiftKey = true;
                    return undefined;
                case 'alt':
                    p.altKey = true;
                    return undefined;
                case 'command':
                    p.metaKey = true;
                    return undefined;
                case 'ctrl':
                    p.ctrlKey = true;
                    return undefined;
                default: return _MAP[k]
            };


        });
        l.push(p);
        return l.filter(e => e ? true : false);
    }
    function _getHtmlTemplate(handler) {
        return $(`<div class="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--boldDisplay  has-inlinehelp is-active "
                id="COMMANDLINE_CONTAINER">
                <div class="t-Form-labelContainer">
                    <label for="COMMANDLINE" id="COMMANDLINE_LABEL" class="t-Form-label">${handler.label}</label>
                </div>
                <div class="t-Form-inputContainer">
                    <div class="t-Form-itemWrapper">
                        <input type="text" id="COMMANDLINE" name="COMMANDLINE" placeholder=">"  class="text_field apex-item-text" value="" size="200">
                    </div>
                    <span class="t-Form-inlineHelp">
                        <span id="COMMANDLINE_inline_help">${handler.hint}</span>
                    </span>
                    <span id="COMMANDLINE_error_placeholder" class="a-Form-error"></span>
                </div>
            </div>`);
    }
    function _getHandler(event) {
        let r;
        _handlers.forEach(h => {
            if (_matchKey(event, h.activationKey)) r = h;
        });
        return r;
    }
    function _startWorker() {
        function start() {
            setTimeout(async function () {
                let task = _tasksToDo.shift();
                while (task) {
                    if (task?.instruction) {
                        for (const i of task.instruction) {
                            await _executeInstruction(i, task.handler);
                        };
                    }
                    task = _tasksToDo.shift();
                }
                if (_workerOn) start();
            }, setting.execInterval);
        };
        start();
    }
    function _matchKey(event, key) {
        let { keyCode, altKey, shiftKey, ctrlKey, metaKey } = event;
        return (key[0] === keyCode
            && key.at(-1).altKey === altKey
            && key.at(-1).shiftKey === shiftKey
            && key.at(-1).ctrlKey === ctrlKey
            && key.at(-1).metaKey === metaKey
        ) ? true : false;
    }
    function openPrompt(h) {
        let itemCont = _getHtmlTemplate(h);
        itemCont.appendTo('body');
        $('#COMMANDLINE').data('handler', h).on('blur', () => {
            $('#COMMANDLINE_CONTAINER').remove();
            _workerOn = false;
        }).keyup(e => {
            e.preventDefault();
            e.stopPropagation();
            let h = $(e.target).data('handler');
            if (_matchKey(e, h.excutionKey)) {
                let t = { instruction: [], handler: h };
                if ($(e.target).val()) t.instruction.push($(e.target).val());
                $(e.target).val('');
                _tasksToDo.push(t);
            } else {
                let newHandler;
                _handlers.forEach(hh => {
                    if (_matchKey(e, hh.activationKey)) {
                        newHandler = hh;
                    }
                    if (newHandler) {
                        $('#COMMANDLINE_CONTAINER').remove();
                        openPrompt(newHandler);
                    }
                });

            }
        });
        //initialize task
        _workerOn = true;
        _startWorker();
        $('#COMMANDLINE').focus();
    }
    async function _executeInstruction(i, h) {
        let result, arg = i.split(setting.argSeperator).filter(e => e).map(a => a == h.blankChar ? '' : a);
        try {
            result = await h.execute(arg);
            _tasksPerformed.push({ instruction: i, success: true, output: result });
        }
        catch (e) {
            _tasksPerformed.push({ instruction: i, success: false, error: e });
        }
    }
    function registerHandler(hadlers) {
        let handler;
        (Array.isArray(hadlers) ? hadlers : [hadlers]).forEach(h => {
            handler = {
                activationKey: _mapKeys(h.activationKey),
                label: h.label,
                hint: h.hint,
                execute: h.execute,
                blankChar: h.blankChar,
                excutionKey: _mapKeys(h.excutionKey)
            };
            _handlers.push(handler);
        });
    }
    function _clearTasks(){
        while(_tasksToDo.shift());
        while(_tasksPerformed.shift());
    }
    //defining global
    global.tc = {};
    global.tc.handlers = _handlers;
    global.tc.clearTasks = _clearTasks;
    global.tc.tasksPerformed = _tasksPerformed;
    global.tc.registerHandler = registerHandler;
    $(global).on('keyup', async (event) => {
        let h = _getHandler(event);
        if (h) openPrompt(h);
    });
})(this);
}
