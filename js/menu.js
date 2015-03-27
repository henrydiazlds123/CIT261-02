function navMenu(active){
  var active = typeof active !== 'undefined' ? active : 'Home';
  //var active ='Home';
  var menu = [
    ["Home","/index.html",false],  
    ["Expenses","/expense.html",false],  
    ["Incomes","/income.html",false],
    ["Reports","/report.html",false],
    ["Setup","/setup.html",false]
    ];
  var html = "<ul>";
  for(var i = 0; i < menu.length; i++){
    html += "<li";
    if (menu[i][0] == active){
      html +=" class='active'";
    }  
    html +="><a href='" + menu[i][1] + "'";
    if(menu[i][2])
      html += "onclick='window.open(this.href);return false;'";
    html += ">" + menu[i][0] + "<\/a><\/li>";
  }
  return html + "<\/ul>";
}

