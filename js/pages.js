function income() {
	document.getElementById("outputarea").innerHTML= "<h1>Income</h1>"+
      "<form id='transactions-form' role='form'>"+
         "<legend>Transaction Record / Edit</legend>"+

         "<div class='form-group'>"+
            "<label for='tipo'>Type</label>"+
            "<select name='select' id='tipo' required>"+
               "<option value='Income'>Income</option>"+
            "</select>"+
            "<br>"+
            "<label for='category'>Category</label>"+
            "<input type='text' class='form-control' id='category' placeholder='Category' required>"+
            "<br>"+
            "<label for='item'>Item</label>"+
            "<input type='text' class='form-control' id='item' placeholder='Provider | Recipient'>"+
            "<br>"+
            "<label for='amount'>Amount</label>"+
            "<input type='text' class='form-control' id='amount' placeholder='$' required>"+
            "<br>"+
            "<label for='trans_date'>Date</label>"+
            "<input type='date' class='form-control' id='trans_date' placeholder='mm/dd/yyyy' required>"+
            "<br>"+
            "<label for='note'>Comments</label>"+
            "<input type='text' class='form-control' id='note' placeholder='comments'>"+

         "</div>"+
         "<input type='button' class='btn btn-primary' id='transactions-op-discard' value='Discard'>"+
         "<input type='button' class='field' id='transactions-op-saveI' value='Save'>"+
         "<input type='hidden' class='btn btn-primary' id='id_entry' value='0'>"+
         "<!-- <input type='hidden' class='btn btn-primary' id='date' value='nose'> -->"+
      "</form>"+
      "<table id='transactions-table'>"+
         "<tr id='transactions-head'>"+
            "<th>ID</th>"+
            "<th>Type</th>"+
            "<th>Category</th>"+
            "<th>Item</th>"+
            "<th>Amount</th>"+
            "<th>Date</th>"+
            "<th>Comments</th>"+
         "</tr>"+
      "</table>"
	  }
function expenses() {
	document.getElementById("outputarea").innerHTML= ""+
	"<h1>Expenses</h1>"+
      "<form id='transactions-form' role='form'>"+
         "<legend>Transaction Record / Edit</legend>"+

         "<div class='form-group'>"+
            "<label for='tipo'>Type</label>"+
            "<select name='select' id='tipo' required>"+
               "<option value='Expense'>Expense</option>"+
            "</select>"+
            "<br>"+
            "<label for='category'>Category</label>"+
            "<input type='text' class='form-control' id='category' placeholder='Category' required>"+
            "<br>"+
            "<label for='item'>Item</label>"+
            "<input type='text' class='form-control' id='item' placeholder='Provider | Recipient'>"+
            "<br>"+
            "<label for='amount'>Amount</label>"+
            "<input type='text' class='form-control' id='amount' placeholder='$' required>"+
            "<br>"+
            "<label for='trans_date'>Date</label>"+
            "<input type='date' class='form-control' id='trans_date' placeholder='mm/dd/yyyy' required>"+
            "<br>"+
            "<label for='note'>Comments</label>"+
            "<input type='text' class='form-control' id='note' placeholder='comments'>"+

         "</div>"+
         "<input type='button' class='btn btn-primary' id='transactions-op-discard' value='Discard'>"+
         "<input type='button' class='field' id='transactions-op-save' value='Save'>"+
         "<input type='hidden' class='btn btn-primary' id='id_entry' value='0'>"+
         "<!-- <input type='hidden' class='btn btn-primary' id='date' value='nose'> -->"+
      "</form>"+
      "<table id='transactions-table'>"+
         "<tr id='transactions-head'>"+
            "<th>ID</th>"+
            "<th>Type</th>"+
            "<th>Category</th>"+
            "<th>Item</th>"+
            "<th>Amount</th>"+
            "<th>Date</th>"+
            "<th>Comments</th>"+
         "</tr>"+
      "</table>"
}	  
function report(){
	document.getElementById("outputarea").innerHTML= ""+
	"<h2>Transaction Keeper DataBase</h2>"+
      "<nav>"+
   "<a href='expense.html'>Expenses</a>"+
   "<a href='income.html'>Incomes</a>"+
"</nav>"+
      "<form id='transactions-form' role='form'>"+
      "</form>"+
      "<table id='transactions-table'>"+
         "<tr id='transactions-head'>"+
            "<th>ID</th>"+
            "<th>Type</th>"+
            "<th>Category</th>"+
            "<th>Item</th>"+
            "<th>Amount</th>"+
            "<th>Date</th>"+
            "<th>Comments</th>"+
         "</tr>"+
      "</table>"+
"<script src='js/script.js'></script>"+
"</table>"
}
function welcome() {
	document.getElementById("outputarea").innerHTML= "<h1>Welcome</h1><h1>to</h1><h1>Coin Trakker</h1>"
}