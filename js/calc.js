const calc = {
    "apply_calc": apply_calc
}

function apply_calc() {
    var capital = document.getElementById("capital");
    var sales = document.getElementById("sales");
    var salary = document.getElementById("salary");
    var input1 = document.getElementById("1");
    var input2 = document.getElementById("2");
    var input3 = document.getElementById("3");
    var value1 = input1.value;
    var value2 = input2.value;
    var value3 = input3.value;
    var result = 0;
    if (capital.checked) {
      result = Number(value1 * 10000) + Number(value2);
      window.opener.document.getElementById("id_capital").value = result;
    } else if (sales.checked) {
      result = Number(value1 * 10000) + Number(value2);
      window.opener.document.getElementById("id_sales_n").value = result;
    }else if (salary.checked){
      result = Number(value1 * 10000 *10000 ) + Number(value2 * 10000) + Number(value3 * 1000);
      window.opener.document.getElementById("id_salary").value = result;
    }
  };
export default calc;