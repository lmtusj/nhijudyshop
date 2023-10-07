const ALL_CATEGORIES = 'all';
const CATEGORY_AO = 'Áo';
const CATEGORY_QUAN = 'Quần';
const CATEGORY_SET_DAM = 'Set và Đầm';
const CATEGORY_PKGD = 'PKGD';

let productData = [
    { phanLoai: CATEGORY_AO, hinhAnh: './../Picture/[A1279] A1 ÁO TOMMYHILFIGER SỌC MÀU SIZE S.jpg', tenSanPham: 'TOMMYHILFIGER SỌC MÀU', thoiGianUpload: new Date('2023-10-05') },
    { phanLoai: CATEGORY_QUAN, hinhAnh: './../Picture/[A1414] A1 ÁO TRẮNG ADIDAS CHỮ TÍM SIZE L.jpg', tenSanPham: 'ADIDAS CHỮ TÍM', thoiGianUpload: new Date('2023-10-06') },
    { phanLoai: CATEGORY_SET_DAM, hinhAnh: './../Picture/[SET2423] A16 SET CHỮ XÁM ÁO SN + QUẦN ĐÙI.jpg', tenSanPham: 'SET CHỮ XÁM', thoiGianUpload: new Date('2023-10-06') },
];

let customerData = [
    {tenKhachHang: './../Picture/ttkh.png'},
    {tenKhachHang: './../Picture/ttkh.png'},
    {tenKhachHang: './../Picture/ttkh.png'},
];

const tbody = document.querySelector('tbody');

function displayData() {
    tbody.innerHTML = '';
    let rowIndex = 0;
    for (let i = 0; i < Math.max(productData.length, customerData.length); i++) {
        const product = productData[i];
        const customer = customerData[i];

        const row = tbody.insertRow();
        const thuTuCell = row.insertCell();
        const thoiGianUploadCell = row.insertCell();
        const phanLoaiCell = row.insertCell();
        const hinhAnhCell = row.insertCell();
        const tenSanPhamCell = row.insertCell();
        const thongTinKhachHangCell = row.insertCell();
        const toggleVisibilityCell = row.insertCell();

        if (product || customer) {
            rowIndex++;
            thuTuCell.textContent = rowIndex;
            thoiGianUploadCell.textContent = formatDate(product ? product.thoiGianUpload : null);
            phanLoaiCell.textContent = product ? product.phanLoai : '';
            hinhAnhCell.innerHTML = product ? `<img src="./../Picture/${product.hinhAnh}" alt="${product.tenSanPham}" class="product-image">` : '';
            tenSanPhamCell.textContent = product ? product.tenSanPham : '';
            thongTinKhachHangCell.innerHTML = customer ? `
                <div class="customer-image-cell">
                    <img src="./../Picture/${customer.tenKhachHang}" alt="Hình ảnh khách hàng">
                </div>
            ` : '';
        } else {
            thuTuCell.textContent = '';
            thoiGianUploadCell.textContent = '';
            phanLoaiCell.textContent = '';
            hinhAnhCell.innerHTML = '';
            tenSanPhamCell.textContent = '';
            thongTinKhachHangCell.innerHTML = '';
        }

        const hideButton = document.createElement('button');
        hideButton.innerText = 'Ẩn';
        hideButton.className = 'toggle-visibility';
        hideButton.onclick = () => toggleRowVisibility(row, hideButton);

        toggleVisibilityCell.appendChild(hideButton);
    }
}

function formatDate(date) {
    if (!date) {
        return '';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const filterCategoryDropdown = document.getElementById('filterCategory');
filterCategoryDropdown.addEventListener('change', applyCategoryFilter);

function applyCategoryFilter() {
    const selectedCategory = filterCategoryDropdown.value;
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row) => {
        const categoryCell = row.querySelector('td:nth-child(3)');
        if (selectedCategory === ALL_CATEGORIES || categoryCell.textContent === selectedCategory) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function toggleRowVisibility(row, button) {
    const cellsToHide = row.querySelectorAll('td:not(:last-child)');
    if (cellsToHide[0].style.display !== 'none') {
        cellsToHide.forEach(cell => cell.style.display = 'none');
        button.innerText = 'Hiện';
    } else {
        cellsToHide.forEach(cell => cell.style.display = '');
        button.innerText = 'Ẩn';
        updateRowIndexes();
    }
}

function updateRowIndexes() {
    let visibleRows = Array.from(tbody.querySelectorAll('tr[style="display: ;"]'));
    visibleRows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

const dataForm = document.getElementById('dataForm');
dataForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const phanLoai = document.getElementById('phanLoai').value;
    const hinhAnhInput = document.getElementById('hinhAnhInput');
    const tenSanPham = document.getElementById('tenSanPham').value;
    const hinhKhachHangInput = document.getElementById('hinhKhachHangInput');

    if (!phanLoai || !tenSanPham || !hinhKhachHangInput.files.length) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    if (!hinhAnhInput.files.length) {
        alert('Vui lòng chọn hình ảnh sản phẩm.');
        return;
    }

    const hinhAnh = hinhAnhInput.files[0].name;

    const newProduct = {
        phanLoai: phanLoai,
        hinhAnh: hinhAnh,
        tenSanPham: tenSanPham,
        thoiGianUpload: new Date(),
    };

    productData.push(newProduct);

    const hinhKhachHang = hinhKhachHangInput.files[0].name;

    const newCustomer = {
        tenKhachHang: hinhKhachHang,
    };

    customerData.push(newCustomer);

    displayData();

    document.getElementById('phanLoai').value = '';
    document.getElementById('hinhAnhInput').value = '';
    document.getElementById('tenSanPham').value = '';
    document.getElementById('hinhKhachHangInput').value = '';
});

const clearDataButton = document.getElementById('clearDataButton');
clearDataButton.addEventListener('click', clearFormData);

function clearFormData() {
    document.getElementById('phanLoai').value = '';
    document.getElementById('hinhAnhInput').value = '';
    document.getElementById('tenSanPham').value = '';
    document.getElementById('hinhKhachHangInput').value = '';
}

const hinhAnhInput = document.getElementById('hinhAnhInput');
hinhAnhInput.addEventListener('change', function () {
    const tenSanPhamInput = document.getElementById('tenSanPham');
    if (hinhAnhInput.files.length > 0) {
        const tenTepHinhAnh = hinhAnhInput.files[0].name;
        const tenSanPhamMacDinh = tenTepHinhAnh.split('.')[0];
        tenSanPhamInput.value = tenSanPhamMacDinh;
    } else {
        tenSanPhamInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleFormButton = document.getElementById('toggleFormButton');
    const dataForm = document.getElementById('dataForm');

    toggleFormButton.addEventListener('click', function () {
        if (dataForm.style.display === 'none' || dataForm.style.display === '') {
            dataForm.style.display = 'block';
            toggleFormButton.textContent = 'Ẩn biểu mẫu';
        } else {
            dataForm.style.display = 'none';
            toggleFormButton.textContent = 'Hiện biểu mẫu';
        }
    });
});

displayData();
