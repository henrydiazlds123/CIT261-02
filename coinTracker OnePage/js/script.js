// var menu = [
//     ["Home", "./index.html", false],
//     ["Expenses", "./expense.html", false],
//     ["Incomes", "./income.html", false],
//     ["Reports", "./report.html", false]
//     // ["Setup", "./setup.html", false]
// ];

// function menuList(active, type, style) {
//     var active = typeof active !== 'undefined' ? active : 'Home';
//     var html = "<ul";
//     html += " class=" + type + " style=" + style + ">";
//     for (var i = 0; i < menu.length; i++) {
//         html += "<li";
//         if (menu[i][0] == active) {
//             html += " class='selected'";
//         }
//         html += "><a href='" + menu[i][1] + "'";
//         if (menu[i][2])
//             html += "onclick='window.open(this.href);return false;'";
//         html += ">" + menu[i][0] + "<\/a><\/li>";
//     }
//     return html + "<\/ul>";
// }

var menu = [
    ["Home", "loadTemp('welcome')", false],
    ["Expenses", "myExpense()", false],
    ["Incomes", "myIncome()", false],
    ["Reports", "myReport()", false]
    // ["Setup", "./setup.html", false]
];

if (navigator.userAgent.indexOf("IEMobile") >= 0) {
    document.body.className += " iemobile";
    window.onscroll = function() {
        window.scroll(0, 0);
    };
}

function menuList(active, type, style) {
    var active = typeof active !== 'undefined' ? active : 'Home';
    var html = "<ul";
    html += " class=" + type + " style=" + style + ">";
    for (var i = 0; i < menu.length; i++) {
        html += "<li";
        if (menu[i][0] == active) {
            html += " class='selected'";
        }
        html += "><a href='#' onclick='"+ menu[i][1] +"'";
        if (menu[i][2])
            html += "onclick='window.open(this.href);return false;'";
        html += ">" + menu[i][0] + "<\/a><\/li>";
    }
    return html + "<\/ul>";
}

function loadTemp(type) {
    var myTemplate = document.getElementById(type);
    var clonedTemplate = myTemplate.content.cloneNode(true);
    document.body.appendChild(clonedTemplate);

    closeMenu();
}

function myReport() {

    loadTemp('myReport');

    var Transactions = {

        $table: document.getElementById("transactions-table"),
        $form: document.getElementById("transactions-form"),

        init: function() {
            Transactions.$form.addEventListener("submit", function(event) {}, true);

            // initialize table
            if (window.localStorage.length - 1) {
                var transaction_list = [],
                    i, key;
                for (i = 0; i < window.localStorage.length; i++) {
                    key = window.localStorage.key(i);
                    if (/Transactions:\d+/.test(key)) {
                        //Creating an array using JSON DATA
                        transaction_list.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                if (transaction_list.length) {
                    transaction_list
                        .sort(function(a, b) {
                            return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                        })
                        .forEach(Transactions.tableAdd);
                }
            }
        },
        //DOM Manipulation
        tableAdd: function(entry) {
            var $tr = document.createElement("tr"),
                $td, key;
            for (key in entry) {
                if (entry.hasOwnProperty(key)) {
                    $td = document.createElement("td"); //Adding an extra <td> to table
                    $td.appendChild(document.createTextNode(entry[key]));
                    $tr.appendChild($td);
                }
            }

            $td = document.createElement("td");
            $tr.appendChild($td);
            $tr.setAttribute("class", "items");
            Transactions.$table.appendChild($tr);
        },

    };
    Transactions.init();
    addTotal();
}

function addTotal() {
    //Adding a new claas to an element
    // $("tr td:nth-child(5)").addClass("amount");

    // var tds = document.getElementsByClassName('amount');
    // var sum = 0;

    // if(tds.length){
    // for (var i = 0; i < tds.length; i++) {
    //     sum += isNaN(tds[i].innerHTML) ? 0 : parseFloat(tds[i].innerHTML);
    // }

    var nth = 5;
    var tds = new Array();
    var table = document.getElementById('transactions-table');
    var trs = parseInt(table.getElementsByTagName('tr').length);

    tds = table.getElementsByTagName('td');
    tdsn = parseInt(tds.length);

    var sum = 0;
    var div = tdsn / trs;

    var x = 0;
    if (trs) {
        for (var i = 0; i < trs; i++) {
            x = nth - 1 + (div) * i;
            sum += isNaN(tds[x].innerHTML) ? 0 : parseFloat(tds[x].innerHTML);
        }

        //Adding a total row to table
        document.getElementById('transactions-table').innerHTML +=
            '<tr><td></td><td></td><td></td><td>Total</td><td>' + sum + '</td><td></td><td></td><td></td></tr>';
    }
}

function myIncome() {

    loadTemp('myIncome');

    //Creating a JavaScript Object
    var Transactions = {
        index: window.localStorage.getItem("Transactions:index"),
        $table: document.getElementById("transactions-table"),
        $form: document.getElementById("transactions-form"),
        $select: document.getElementById("tipo"),
        $button_saveI: document.getElementById("transactions-op-saveI"),
        $button_discard: document.getElementById("transactions-op-discard"),

        init: function() {
            // initialize storage index
            if (!Transactions.index) {
                window.localStorage.setItem("Transactions:index", Transactions.index = 1);
            }
            // initialize form
            Transactions.$form.reset();
            Transactions.$button_discard.addEventListener("click", function(event) {
                Transactions.$form.reset();
                Transactions.$form.id_entry.value = 0;
            }, true);
            Transactions.$form.addEventListener("submit", function(event) {
                var entry = {
                    id: parseInt(this.id_entry.value),
                    tipo: this.tipo.value,
                    category: this.category.value,
                    item: this.item.value,
                    amount: this.amount.value,
                    date: this.trans_date.value,
                    comm: this.note.value,
                    //now: new Date()
                };
                if (entry.id == 0) { // add
                    Transactions.storeAdd(entry);
                    Transactions.tableAdd(entry);
                    Transactions.selectAdd(entry);
                } else { // edit
                    Transactions.storeEdit(entry);
                    Transactions.tableEdit(entry);
                }
                this.reset();
                this.id_entry.value = 0;
                event.preventDefault();
            }, true);

            // initialize table
            if (window.localStorage.length - 1) {
                var transaction_list = [],
                    i, key;
                for (i = 0; i < window.localStorage.length; i++) {
                    key = window.localStorage.key(i);
                    if (/Transactions:\d+/.test(key)) {
                        transaction_list.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                if (transaction_list.length) {
                    transaction_list
                        .sort(function(a, b) {
                            return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                        })
                        .forEach(Transactions.tableAdd);
                }
            }
            Transactions.$table.addEventListener("click", function(event) {
                var op = event.target.getAttribute("data-op");
                if (/edit|remove/.test(op)) {
                    var entry = JSON.parse(window.localStorage.getItem("Transactions:" + event.target.getAttribute("data-id")));
                    if (op == "edit") {
                        Transactions.$form.tipo.value = entry.tipo;
                        Transactions.$form.category.value = entry.category;
                        Transactions.$form.item.value = entry.item;
                        Transactions.$form.amount.value = entry.amount;
                        Transactions.$form.trans_date.value = entry.date;
                        Transactions.$form.note.value = entry.comm;
                        Transactions.$form.id_entry.value = entry.id;
                    } else if (op == "remove") {
                        if (confirm('Are you sure you want to remove "' + entry.item + ' ' + entry.amount + '" from your transactions?')) {
                            Transactions.storeRemove(entry);
                            Transactions.tableRemove(entry);
                        }
                    }
                    event.preventDefault();
                }
            }, true);
        },
        storeAdd: function(entry) {
            entry.id = Transactions.index;
            window.localStorage.setItem("Transactions:index", ++Transactions.index);
            window.localStorage.setItem("Transactions:" + entry.id, JSON.stringify(entry));
        },
        storeEdit: function(entry) {
            window.localStorage.setItem("Transactions:" + entry.id, JSON.stringify(entry));
        },
        storeRemove: function(entry) {
            window.localStorage.removeItem("Transactions:" + entry.id);
        },
        tableAdd: function(entry) {
            if (entry.tipo === 'Income') {
                var $tr = document.createElement("tr"),
                    $td, key;
                for (key in entry) {
                    if (entry.hasOwnProperty(key)) {
                        $td = document.createElement("td");
                        $td.appendChild(document.createTextNode(entry[key]));
                        $tr.appendChild($td);
                    }
                }
                $td = document.createElement("td");
                $td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
                $tr.appendChild($td);
                $tr.setAttribute("id", "entry-" + entry.id);
                //$tr.setAttribute("class", "items");
                Transactions.$table.appendChild($tr);
            }
        },
        tableEdit: function(entry) {
            var $tr = document.getElementById("entry-" + entry.id),
                $td, key;
            $tr.innerHTML = "";
            for (key in entry) {
                if (entry.hasOwnProperty(key)) {
                    $td = document.createElement("td");
                    $td.appendChild(document.createTextNode(entry[key]));
                    $tr.appendChild($td);
                }
            }
            $td = document.createElement("td");
            $td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
            $tr.appendChild($td);
        },
        tableRemove: function(entry) {
            Transactions.$table.removeChild(document.getElementById("entry-" + entry.id));
        }
    };
    Transactions.init();
}

function myExpense() {

    loadTemp('myExpense');

    var Transactions = {
        index: window.localStorage.getItem("Transactions:index"),
        $table: document.getElementById("transactions-table"),
        $form: document.getElementById("transactions-form"),
        $select: document.getElementById("tipo"),
        $button_save: document.getElementById("transactions-op-save"),
        $button_discard: document.getElementById("transactions-op-discard"),

        init: function() {
            // initialize storage index
            if (!Transactions.index) {
                window.localStorage.setItem("Transactions:index", Transactions.index = 1);
            }
            // initialize form
            Transactions.$form.reset();
            Transactions.$button_discard.addEventListener("click", function(event) {
                Transactions.$form.reset();
                Transactions.$form.id_entry.value = 0;
            }, true);
            Transactions.$form.addEventListener("submit", function(event) {
                var entry = {
                    id: parseInt(this.id_entry.value),
                    tipo: this.tipo.value,
                    category: this.category.value,
                    item: this.item.value,
                    amount: (this.amount.value) * -1,
                    date: this.trans_date.value,
                    comm: this.note.value,
                    //now: new Date()
                };
                if (entry.id == 0) { // add
                    Transactions.storeAdd(entry);
                    Transactions.tableAdd(entry);
                    Transactions.selectAdd(entry);
                } else { // edit
                    Transactions.storeEdit(entry);
                    Transactions.tableEdit(entry);
                }
                this.reset();
                this.id_entry.value = 0;
                event.preventDefault();
            }, true);

            // initialize table
            if (window.localStorage.length - 1) {
                var transaction_list = [],
                    i, key;
                for (i = 0; i < window.localStorage.length; i++) {
                    key = window.localStorage.key(i);
                    if (/Transactions:\d+/.test(key)) {
                        transaction_list.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                if (transaction_list.length) {
                    transaction_list
                        .sort(function(a, b) {
                            return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                        })
                        .forEach(Transactions.tableAdd);
                }
            }
            Transactions.$table.addEventListener("click", function(event) {
                var op = event.target.getAttribute("data-op");
                if (/edit|remove/.test(op)) {
                    var entry = JSON.parse(window.localStorage.getItem("Transactions:" + event.target.getAttribute("data-id")));
                    if (op == "edit") {
                        Transactions.$form.tipo.value = entry.tipo;
                        Transactions.$form.category.value = entry.category;
                        Transactions.$form.item.value = entry.item;
                        Transactions.$form.amount.value = (entry.amount) * -1;
                        Transactions.$form.trans_date.value = entry.date;
                        Transactions.$form.note.value = entry.comm;
                        Transactions.$form.id_entry.value = entry.id;
                    } else if (op == "remove") {
                        if (confirm('Are you sure you want to remove "' + entry.item + ' ' + entry.amount + '" from your transactions?')) {
                            Transactions.storeRemove(entry);
                            Transactions.tableRemove(entry);
                        }
                    }
                    event.preventDefault();
                }
            }, true);
        },
        storeAdd: function(entry) {
            entry.id = Transactions.index;
            window.localStorage.setItem("Transactions:index", ++Transactions.index);
            window.localStorage.setItem("Transactions:" + entry.id, JSON.stringify(entry));
        },
        storeEdit: function(entry) {
            window.localStorage.setItem("Transactions:" + entry.id, JSON.stringify(entry));
        },
        storeRemove: function(entry) {
            window.localStorage.removeItem("Transactions:" + entry.id);
        },
        tableAdd: function(entry) {
            if (entry.tipo === 'Expense') {
                var $tr = document.createElement("tr"),
                    $td, key;
                for (key in entry) {
                    if (entry.hasOwnProperty(key)) {
                        $td = document.createElement("td");
                        $td.appendChild(document.createTextNode(entry[key]));
                        $tr.appendChild($td);
                    }
                }
                $td = document.createElement("td");
                $td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
                $tr.appendChild($td);
                $tr.setAttribute("id", "entry-" + entry.id);
                //$tr.setAttribute("class", "items");
                Transactions.$table.appendChild($tr);
            }
        },
        tableEdit: function(entry) {
            var $tr = document.getElementById("entry-" + entry.id),
                $td, key;
            $tr.innerHTML = "";
            for (key in entry) {
                if (entry.hasOwnProperty(key)) {
                    $td = document.createElement("td");
                    $td.appendChild(document.createTextNode(entry[key]));
                    $tr.appendChild($td);
                }
            }
            $td = document.createElement("td");
            $td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
            $tr.appendChild($td);
        },
        tableRemove: function(entry) {
            Transactions.$table.removeChild(document.getElementById("entry-" + entry.id));
        }
    };
    Transactions.init();
}

function showMenu() {
    document.getElementById("toggle-menu").className="no-hidden";
}
function closeMenu(){
    document.getElementById("toggle-menu").className="hidden";
}
