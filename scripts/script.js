let vouchers = [];
let totalPrice = 0;
let ID = 0;

let myVouchers = document.getElementsByClassName('my__vouchers')[0];

let createVoucher = document.getElementsByClassName('create__voucher__li')[0];

let createArea = document.getElementsByClassName('create_voucher')[0];
let vouchersContainer = document.getElementsByClassName('vouchers__container')[0];
createVoucher.onclick = function() {
    if (!createVoucher.classList.contains('navbar__selected')) {
        togglerNavbar();
    }
}

myVouchers.onclick = function() {
    if (!myVouchers.classList.contains('navbar__selected')) {
        togglerNavbar();
        printVouchers(vouchers);
    }
}

let formCreateVoucher = document.forms.create__voucher__form;
formCreateVoucher.onsubmit = function(e) {
    e.preventDefault();
    if (this.country.value === "" ||
        this.description.value === "" ||
        this.days.value === "" ||
        this.price.value === "") {
            let alert = document.getElementById('alertMessage');
            alert.classList.add('show__alertMessage');
        setTimeout(() => {
            alert.classList.remove('show__alertMessage');
        }, 3000);
        let closeAlertButton = document.getElementsByClassName('close__button')[0];
            closeAlertButton.onclick = function() {
                alert.classList.remove('show__alertMessage');
            }
    } else {
        let voucher = {
            id: ++ID,
            country: this.country.value,
            description: this.description.value,
            days: this.days.value,
            price: this.price.value
        }
        vouchers.push(voucher);
        totalPrice += +voucher.price;
        this.reset();
    }
}

let btnSearch = document.getElementById('find_search');
btnSearch.onclick = function() {
    let input = document.getElementById('finder');
    let findValue = input.value;
    printVouchers(vouchers.filter(voucher => {
        return voucher.country.includes(findValue) || 
            voucher.description.includes(findValue);
    })); 
}

let btnClearSearch = document.getElementById('find_clear');
btnClearSearch.onclick = function() {
    let input = document.getElementById('finder');
    input.value = '';
    printVouchers(vouchers);
}

let switcher = document.getElementsByClassName('radioButton')[0];
let isSelected = false;
switcher.onclick = function() {
    switcher.classList.toggle('radioButton__selected')
    if (!isSelected) {
        printVouchers(vouchers.sort((a, b) => b.price - a.price));
    } else {
        printVouchers(vouchers.sort((a, b) => a.id - b.id));
    }
    isSelected = !isSelected;
}

let buttonCountPrice = document.getElementById('countTotalPrice');
buttonCountPrice.onclick = function() {
    let counter = document.getElementsByClassName('totalPriceOutput')[0];
    counter.innerText = `${totalPrice} €`;
}

function togglerNavbar() {
    myVouchers.classList.toggle('navbar__selected');
    createVoucher.classList.toggle('navbar__selected');
    createArea.classList.toggle('show__create__voucher');
    vouchersContainer.classList.toggle('hide__vouchers__container');
}

function changeInfo(voucher) {
    let editDiv = document.getElementsByClassName('edit__voucher')[0];
    let editForm = document.forms.editVoucher;
    editForm.country.value = voucher.country;
    editForm.description.value = voucher.description;
    editForm.days.value = voucher.days;
    editForm.price.value = voucher.price;
    editDiv.classList.toggle('show__edit__voucher');
    editForm.saveButton.onclick = function(e) {
        e.preventDefault();
        vouchers[vouchers.indexOf(voucher)] = {
            country: editForm.country.value,
            description: editForm.description.value,
            days: editForm.days.value,
            price: editForm.price.value
        };
        editDiv.classList.toggle('show__edit__voucher');
        printVouchers(vouchers);
    }
    editForm.closeButton.onclick = function(e) {
        e.preventDefault();
        editDiv.classList.toggle('show__edit__voucher');
    }
}

function printVouchers(vouchers) {
    vouchersContainer.innerHTML = '';
        for (let voucher of vouchers) {
            let voucherDiv = document.createElement('div');
            voucherDiv.classList.add('voucher');
            let voucherImgDiv = document.createElement('div');
            voucherImgDiv.classList.add('voucher__img');
            let img = document.createElement('img');
            voucherImgDiv.appendChild(img);
            let voucherTextDiv = document.createElement('div');
            voucherTextDiv.classList.add('voucher__text');
            let h3 = document.createElement('h3');
            h3.innerText = voucher.country;
            let p = document.createElement('p');
            p.innerText = voucher.description;
            let days = document.createElement('p');
            days.innerText = `Amount of days: ${voucher.days}`;
            let price = document.createElement('p');
            price.innerText = `Price: ${voucher.price}€`;
            voucherTextDiv.appendChild(h3);
            voucherTextDiv.appendChild(p);
            voucherTextDiv.appendChild(days);
            voucherTextDiv.appendChild(price);
            let btnGroup = document.createElement('div');
            btnGroup.classList.add('button_group');
            let btnEdit = document.createElement('button');
            let btnRemove = document.createElement('button');
            btnEdit.innerText = 'Edit';
            btnRemove.innerText = 'Remove';
            btnEdit.setAttribute('id', "edit_voucher");
            btnEdit.onclick = function() {
                changeInfo(voucher);
            }
            btnRemove.setAttribute('id', "remove_voucher");
            btnRemove.onclick = function() {
                console.log(vouchers);
                totalPrice -= +voucher.price;
                vouchers.splice(vouchers.indexOf(voucher), 1);
                printVouchers(vouchers);
            }
            btnGroup.appendChild(btnEdit);
            btnGroup.appendChild(btnRemove);
            voucherTextDiv.appendChild(btnGroup);
            voucherDiv.appendChild(voucherImgDiv);
            voucherDiv.appendChild(voucherTextDiv);
            vouchersContainer.appendChild(voucherDiv);
        }
}