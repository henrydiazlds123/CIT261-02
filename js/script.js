//ORIGINAL CODE
// var Transactions = {
//     index: window.localStorage.getItem("Transactions:index"),
//     $table: document.getElementById("transactions-table"),
//     $form: document.getElementById("transactions-form"),
//     $select: document.getElementById("tipo"),
//     $button_save: document.getElementById("transactions-op-save"),
//     $button_discard: document.getElementById("transactions-op-discard"),

//     init: function() {
//         // initialize storage index
//         if (!Transactions.index) {
//             window.localStorage.setItem("Transactions:index", Transactions.index = 1);
//         }
//         // initialize form
//         Transactions.$form.reset();
//         Transactions.$button_discard.addEventListener("click", function(event) {
//             Transactions.$form.reset();
//             Transactions.$form.id_entry.value = 0;
//         }, true);
//         Transactions.$form.addEventListener("submit", function(event) {
//             var entry = {
//                 id: parseInt(this.id_entry.value),
//                 tipo: this.tipo.value,
//                 category: this.category.value,
//                 item: this.item.value,
//                 amount: '$' + (this.amount.value),
//                 date: this.trans_date.value,
//                 comm: this.note.value,
//                 now: new Date()
//             };
//             if (entry.id == 0) { // add
//                 Transactions.storeAdd(entry);
//                 Transactions.tableAdd(entry);
//                 Transactions.selectAdd(entry);
//             } else { // edit
//                 Transactions.storeEdit(entry);
//                 Transactions.tableEdit(entry);
//             }
//             this.reset();
//             this.id_entry.value = 0;
//             event.preventDefault();
//         }, true);

//         // initialize table
//         if (window.localStorage.length - 1) {
//             var transaction_list = [],
//                 i, key;
//             for (i = 0; i < window.localStorage.length; i++) {
//                 key = window.localStorage.key(i);
//                 if (/Transactions:\d+/.test(key)) {
//                     transaction_list.push(JSON.parse(window.localStorage.getItem(key)));
//                 }
//             }
//             if (transaction_list.length) {
//                 transaction_list
//                     .sort(function(a, b) {
//                         return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
//                     })
//                     .forEach(Transactions.tableAdd);
//             }
//         }
//         Transactions.$table.addEventListener("click", function(event) {
//             var op = event.target.getAttribute("data-op");
//             if (/edit|remove/.test(op)) {
//                 var entry = JSON.parse(window.localStorage.getItem("Transactions:" + event.target.getAttribute("data-id")));
//                 if (op == "edit") {
//                     Transactions.$form.tipo.value = entry.tipo;
//                     Transactions.$form.category.value = entry.category;
//                     Transactions.$form.item.value = entry.item;
//                     Transactions.$form.amount.value = entry.amount;
//                     Transactions.$form.trans_date.value = entry.date;
//                     Transactions.$form.note.value = entry.comm;
//                     Transactions.$form.id_entry.value = entry.id;
//                 } else if (op == "remove") {
//                     if (confirm('Are you sure you want to remove "' + entry.item + ' ' + entry.amount + '" from your transactions?')) {
//                         Transactions.storeRemove(entry);
//                         Transactions.tableRemove(entry);
//                     }
//                 }
//                 event.preventDefault();
//             }
//         }, true);
//     },
//     storeAdd: function(entry) {
//         entry.id = Transactions.index;
//         window.localStorage.setItem("Transactions:index", ++Transactions.index);
//         window.localStorage.setItem("Transactions:" + entry.id, JSON.stringify(entry));
//     },
//     storeEdit: function(entry) {
//         window.localStorage.setItem("Transactions:" + entry.id, JSON.stringify(entry));
//     },
//     storeRemove: function(entry) {
//         window.localStorage.removeItem("Transactions:" + entry.id);
//     },
//     tableAdd: function(entry) {
//         var $tr = document.createElement("tr"),
//             $td, key;
//         for (key in entry) {
//             if (entry.hasOwnProperty(key)) {
//                 $td = document.createElement("td");
//                 $td.appendChild(document.createTextNode(entry[key]));
//                 $tr.appendChild($td);
//             }
//         }
//         $td = document.createElement("td");
//         $td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
//         $tr.appendChild($td);
//         $tr.setAttribute("id", "entry-" + entry.id);
//         Transactions.$table.appendChild($tr);
//     },
//     tableEdit: function(entry) {
//         var $tr = document.getElementById("entry-" + entry.id),
//             $td, key;
//         $tr.innerHTML = "";
//         for (key in entry) {
//             if (entry.hasOwnProperty(key)) {
//                 $td = document.createElement("td");
//                 $td.appendChild(document.createTextNode(entry[key]));
//                 $tr.appendChild($td);
//             }
//         }
//         $td = document.createElement("td");
//         $td.innerHTML = '<a data-op="edit" data-id="' + entry.id + '">Edit</a> | <a data-op="remove" data-id="' + entry.id + '">Remove</a>';
//         $tr.appendChild($td);
//     },
//     tableRemove: function(entry) {
//         Transactions.$table.removeChild(document.getElementById("entry-" + entry.id));
//     }
// };
// Transactions.init();
function report() {
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

        tableAdd: function(entry) {
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
            $tr.appendChild($td);
            $tr.setAttribute("class", "items");
            Transactions.$table.appendChild($tr);



            // $("tr td:nth-child(5)").addClass("amount");


            //       var tds = document.getElementsByClassName('amount');
            //       var sum = 0;
            //       for(var i = 0; i < tds.length; i ++) {
            //               sum += isNaN(tds[i].innerHTML) ? 0 : parseFloat(tds[i].innerHTML);
            //       }
            //       document.getElementById('transactions-table').innerHTML += '<tr><td>' + sum + '</td><td>total</td></tr>';




        },

    };
    Transactions.init();
    addTotal();
}

function addTotal() {

    $("tr td:nth-child(5)").addClass("amount");

    var tds = document.getElementsByClassName('amount');
    var sum = 0;

    if(tds.length){
    for (var i = 0; i < tds.length; i++) {
        sum += isNaN(tds[i].innerHTML) ? 0 : parseFloat(tds[i].innerHTML);
    }
    document.getElementById('transactions-table').innerHTML += 
    '<tr><td></td><td></td><td></td><td>Total</td><td>' + sum + '</td><td></td><td></td><td></td></tr>';
}
}

function income() {
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

function expense() {
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
