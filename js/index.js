$(document).ready(function () {
    // nav menu bar toggle fun
    $("#navToggleBtn").click(function (e) { 
        e.preventDefault();
        resetActiveSubUl();
        $("#nav").toggleClass('deactive__nav');
        $("#header").toggleClass('deactive__nav');
        $(".form__container").toggleClass('deactive__nav');
    });
    // toggle menu item list
    let navLi = document.querySelectorAll("#navLi");

    // toggle side menu
    let header = document.querySelector("#header");
    let nav = document.querySelector("#nav");
    let navToggleBtn = document.querySelector("#navToggleBtn");
    let mainContent = document.querySelector("#main");
    let formContainer = document.querySelector(".form__container");

    navLi.forEach(function(list){
        list.addEventListener('click', function (e) {
            if (!e.currentTarget.nextElementSibling.classList.contains("active__sub--ul")) {
                resetActiveSubUl();
                e.currentTarget.nextElementSibling.classList.add("active__sub--ul");
                header.classList.remove("deactive__nav");
                nav.classList.remove("deactive__nav");
                mainContent.classList.remove("deactive__nav");
                formContainer.classList.remove("deactive__nav");
            } else {
                e.currentTarget.nextElementSibling.classList.remove("active__sub--ul");
                header.classList.remove("deactive__nav");
                nav.classList.remove("deactive__nav"); 
                mainContent.classList.remove("deactive__nav");       
                formContainer.classList.remove("deactive__nav");       
            }
        })
    });

    // function for reset active__sub--ul
    function resetActiveSubUl() {
        navLi.forEach(function(list){
            list.nextElementSibling.classList.remove("active__sub--ul");
        });
    }

    // // toggle side menu functionlity
    // navToggleBtn.addEventListener('click', function (e) {
    //     header.classList.toggle("deactive__nav");
    //     nav.classList.toggle("deactive__nav");
    //     mainContent.classList.toggle("deactive__nav");
    //     resetActiveSubUl();
    // })
        
    // function for reset active__sub--ul
    function resetActiveSubUl() {
        navLi.forEach(function(list){
            list.nextElementSibling.classList.remove("active__sub--ul");
        });
    }
    // invoice item create and remove actions
    $("#addNewRow").on("click", function (e) {
        e.preventDefault();
        // appending the tr to the end
        let size = $("#newInvoiceTbody tr").length + 1;
        $("#newInvoiceTbody").append(`<tr id="rec-${size}" class="new__invoice__rows" name="line_items">
        <td class="sn">${size}</td>
        <td>
            <select name="itemSelectBox" id="itemSelectBox">
                <option value="" disabled selected>select your item</option>
                <option value="">Product One</option>
                <option value="">Product Two</option>
                <option value="">Product Three</option>
            </select>
        </td>
        <td class="stock">0</td>
        <td><input type="text" name="itemWarranty[]" id="itemWarranty" placeholder="Warranty" value=""></td>
        <td><input type="number" class="item__rate" name="itemRate" id="itemRate" placeholder="Rate" value=""></td>
        <td><input type="number" class="item__qty" name="itemQty" id="itemQty" placeholder="Quantity" value=""></td>
        <td><input type="text" class="item__amount" name="itemAmount[]" id="itemAmount" disabled value=""></td>
        <td>
        <a href="#" id="itemDeleteBtn" class="inv__item__delete--btn btn" data-id="${size}"><i class="fa-solid fa-trash"></i></a>
        </td>
    </tr>`);
    });
    // item name select box introduce select2
    let selectData = ["Product One", "Product Two", "Product Three", "Product Four"];
    $("#itemSelectBox").select2({
        data:selectData
    });
    // remove the current table row
    $(document).delegate('a.inv__item__delete--btn', 'click', function (e) {
        e.preventDefault();
        let didConfirm = confirm("Are you sure You want to delete?");
        if(didConfirm == true){
            let id = $(this).attr("data-id");
            let targetTr = $(this).parent().parent().html();
            $("#rec-" + id).remove();

            // regenerate index number on table
            $("#newInvoiceTbody tr").each(function (index) {
                $(this).find('td.sn').html(index + 1);
            });
            // calculate amount total after press the delete btn
            function amountCalculation() {
                let totalAmount = 0;
                let itemAmount = document.querySelectorAll(".item__amount");
                for (let i = 0; i < itemAmount.length; i++) {
                    totalAmount += parseFloat(itemAmount[i].value);
                }
                $(".total__amount").val(parseFloat(totalAmount));
                // invoice input calculate
                let row = $(this).closest("tr");
                let rateValue = parseFloat(row.find(".item__rate").val());
                let qtyValue = parseFloat(row.find(".item__qty").val());
                // let dicValue = parseFloat(row.find(".item__dic").val());
                let total = rateValue * qtyValue;
                row.find(".item__amount").val(isNaN(total) ? "" : total);
                // closing balance calculation reset
                // net payable amount calculation
                totalAmount = $("#totalAmount").val();
                let discountAmount = $("#discountAmount").val();
                let afterDiscountAmount = $("#netPayableAmount").val(totalAmount - discountAmount);
                // total due amount calculation
                let netPayableAmount = $("#netPayableAmount").val();
                let previousDueAmount = $("#previousDueAmount").val();
                let totalDueAmount = $("#totalDueAmount").val(Number(netPayableAmount) + Number(previousDueAmount));
                // closing balance
                let totalDueAmountRemaing = $("#totalDueAmount").val();
                let totalRecoveredAmount = $("#recoveredAmount").val();
                let closingBalance = $("#closingBalance").val(totalDueAmountRemaing - totalRecoveredAmount);

            }
            amountCalculation();
        }
    })
    // invoice input calculate
    $("#invoiceItemTable").on("change", "input", function () {
        let row = $(this).closest("tr");
        let rateValue = parseFloat(row.find(".item__rate").val());
        let qtyValue = parseFloat(row.find(".item__qty").val());
        // let dicValue = parseFloat(row.find(".item__dic").val());
        let total = rateValue * qtyValue;
        row.find(".item__amount").val(isNaN(total) ? "" : total);
    });
    // closing balance calculate
    $("#invoiceItemTable").on("change", ".item__qty", function () {
        function amountCalculation() {
            let totalAmount = 0;
            let itemAmount = document.querySelectorAll(".item__amount");
            for (let i = 0; i < itemAmount.length; i++) {
                totalAmount += parseFloat(itemAmount[i].value);
            }
            $("#totalAmount").val(totalAmount);
        }
        amountCalculation();
    });
    // calculate after discount amount
    // close line
    // testing some code
    $(document).on("change", "input", function () {
        // net payable amount calculation
        let totalAmount = $("#totalAmount").val();
        let discountAmount = $("#discountAmount").val();
        let afterDiscountAmount = $("#netPayableAmount").val(totalAmount - discountAmount);
        // total due amount calculation
        let netPayableAmount = $("#netPayableAmount").val();
        let previousDueAmount = $("#previousDueAmount").val();
        let totalDueAmount = $("#totalDueAmount").val(Number(netPayableAmount) + Number(previousDueAmount));
        // closing balance
        let totalDueAmountRemaing = $("#totalDueAmount").val();
        let totalRecoveredAmount = $("#recoveredAmount").val();
        let closingBalance = $("#closingBalance").val(totalDueAmountRemaing - totalRecoveredAmount);
    });
    // select box for test.html
    $("#testSelect").select2();
});