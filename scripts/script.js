let vouchers = [];

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
        printVouchers();
    }
}

let formCreateVoucher = document.forms.create__voucher__form;
formCreateVoucher.onsubmit = function(e) {
    e.preventDefault();                 
    let voucher = {
        country: this.country.value,
        description: this.description.value,
        days: this.days.value,
        price: this.price.value
    }
    vouchers.push(voucher);
    this.reset();
}

function togglerNavbar() {
    myVouchers.classList.toggle('navbar__selected');
    createVoucher.classList.toggle('navbar__selected');
    createArea.classList.toggle('show__create__voucher');
    vouchersContainer.classList.toggle('hide__vouchers__container');
}

function printVouchers() {
    vouchersContainer.innerHTML = '';
        for (const voucher of vouchers) {
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
                changeInfo();
                printVouchers();
            }
            btnRemove.setAttribute('id', "remove_voucher");
            btnRemove.onclick = function() {
                vouchers.splice(vouchers.indexOf(voucher), 1);
                printVouchers();
            }
            btnGroup.appendChild(btnEdit);
            btnGroup.appendChild(btnRemove);
            voucherTextDiv.appendChild(btnGroup);
            voucherDiv.appendChild(voucherImgDiv);
            voucherDiv.appendChild(voucherTextDiv);
            vouchersContainer.appendChild(voucherDiv);
        }
}