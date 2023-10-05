// script.js
const ALL_CATEGORIES = 'all';
const CATEGORY_AO = 'Áo';
const CATEGORY_QUAN = 'Quần';
const CATEGORY_SET_DAM = 'Set và Đầm';
const CATEGORY_PKGD = 'PKGD';

// Dữ liệu sản phẩm và thông tin khách hàng
let productData = [
    { phanLoai: CATEGORY_AO, hinhAnh: './../Picture/[A1279] A1 ÁO TOMMYHILFIGER SỌC MÀU SIZE S.jpg', tenSanPham: 'TOMMYHILFIGER SỌC MÀU', thoiGianUpload: new Date('2023-10-05') },
    { phanLoai: CATEGORY_QUAN, hinhAnh: './../Picture/[A1414] A1 ÁO TRẮNG ADIDAS CHỮ TÍM SIZE L.jpg', tenSanPham: 'ADIDAS CHỮ TÍM', thoiGianUpload: new Date('2023-10-06') },
    { phanLoai: CATEGORY_SET_DAM, hinhAnh: './../Picture/[SET2423] A16 SET CHỮ XÁM ÁO SN + QUẦN ĐÙI.jpg', tenSanPham: 'SET CHỮ XÁM', thoiGianUpload: new Date('2023-10-06') },
    // Thêm dữ liệu cho các sản phẩm khác
];

let customerData = [
    { tenKhachHang: 'Khách hàng 1'},
    { tenKhachHang: 'Khách hàng 2'},
    { tenKhachHang: 'Khách hàng 3'},
    // Thêm dữ liệu cho các khách hàng khác
];

// Lấy tbody của bảng
const tbody = document.querySelector('tbody');

// Hiển thị dữ liệu sản phẩm và thông tin khách hàng trong bảng
function displayData() {
    tbody.innerHTML = '';
    let rowIndex = 0; // Biến đếm số thứ tự
    for (let i = 0; i < Math.max(productData.length, customerData.length); i++) {
        const product = productData[i];
        const customer = customerData[i];

        const row = tbody.insertRow();
        const thuTuCell = row.insertCell();
        const thoiGianUploadCell = row.insertCell(); // Thêm cột "Thời gian upload"
        const phanLoaiCell = row.insertCell();
        const hinhAnhCell = row.insertCell();
        const tenSanPhamCell = row.insertCell();
        const thongTinKhachHangCell = row.insertCell();
        const toggleVisibilityCell = row.insertCell();

        if (product) {
            rowIndex++; // Tăng số thứ tự
            thuTuCell.textContent = rowIndex;
            thoiGianUploadCell.textContent = formatDate(product.thoiGianUpload); // Định dạng thời gian upload
            phanLoaiCell.textContent = product.phanLoai;
            hinhAnhCell.innerHTML = `<img src="${product.hinhAnh}" alt="${product.tenSanPham}" class="product-image">`;
            tenSanPhamCell.textContent = product.tenSanPham;
        } else {
            thuTuCell.textContent = '';
            thoiGianUploadCell.textContent = ''; // Nếu không có sản phẩm, thời gian cũng trống
            phanLoaiCell.textContent = '';
            hinhAnhCell.innerHTML = '';
            tenSanPhamCell.textContent = '';
        }

        if (customer) {
            thongTinKhachHangCell.innerHTML = `
                <p>${customer.tenKhachHang}</p>
            `;
        } else {
            thongTinKhachHangCell.textContent = '';
        }

        const hideButton = document.createElement('button');
        hideButton.innerText = 'Ẩn';
        hideButton.className = 'toggle-visibility';
        hideButton.onclick = () => toggleRowVisibility(row, hideButton);

        toggleVisibilityCell.appendChild(hideButton);
    }
}

// Hàm để định dạng ngày theo "dd/mm/yyyy"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Thêm sự kiện "change" cho dropdown phân loại
const filterCategoryDropdown = document.getElementById('filterCategory');
filterCategoryDropdown.addEventListener('change', applyCategoryFilter);

// Hàm để áp dụng bộ lọc theo phân loại
function applyCategoryFilter() {
    // Lấy giá trị phân loại được chọn từ dropdown
    const selectedCategory = filterCategoryDropdown.value;

    // Lấy tbody của bảng
    const tbody = document.querySelector('tbody');

    // Lặp qua các hàng trong tbody và kiểm tra phân loại
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row) => {
        const categoryCell = row.querySelector('td:nth-child(3)'); // Lấy ô chứa phân loại (cột thứ 3)

        // Nếu giá trị phân loại là "all" hoặc giá trị phân loại của hàng trùng khớp với giá trị được chọn
        if (selectedCategory === ALL_CATEGORIES || categoryCell.textContent === selectedCategory) {
            row.style.display = ''; // Hiển thị hàng
        } else {
            row.style.display = 'none'; // Ẩn hàng
        }
    });
}

// Hàm để ẩn/xuất hiện chỉ các ô thông tin trong hàng
function toggleRowVisibility(row, button) {
    const cellsToHide = row.querySelectorAll('td:not(:last-child)'); // Lấy tất cả ô trừ ô cuối cùng (chứa button)
    if (cellsToHide[0].style.display !== 'none') {
        cellsToHide.forEach(cell => cell.style.display = 'none'); // Ẩn các ô thông tin
        button.innerText = 'Hiện';
    } else {
        cellsToHide.forEach(cell => cell.style.display = ''); // Hiện các ô thông tin
        button.innerText = 'Ẩn';
        updateRowIndexes();
    }
}

// Hàm để cập nhật lại thứ tự của các hàng
function updateRowIndexes() {
    let visibleRows = Array.from(tbody.querySelectorAll('tr[style="display: ;"]'));
    visibleRows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

// Sử dụng sự kiện submit của form
const dataForm = document.getElementById('dataForm');
dataForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn chặn gửi form mặc định

    // Lấy giá trị từ các trường nhập liệu
    const phanLoai = document.getElementById('phanLoai').value;
    const hinhAnhInput = document.getElementById('hinhAnhInput');
    const tenSanPham = document.getElementById('tenSanPham').value;
    const tenKhachHang = document.getElementById('tenKhachHang').value;

    // Kiểm tra nếu có giá trị trống
    if (!phanLoai || !tenSanPham || !tenKhachHang) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    // Kiểm tra xem người dùng đã chọn hình ảnh hay chưa
    if (!hinhAnhInput.files.length) {
        alert('Vui lòng chọn hình ảnh sản phẩm.');
        return;
    }

    // Lấy tên tệp hình ảnh đã chọn
    const hinhAnh = hinhAnhInput.files[0].name;

    // Tạo một đối tượng mới cho sản phẩm
    const newProduct = {
        phanLoai: phanLoai,
        hinhAnh: hinhAnh,
        tenSanPham: tenSanPham,
        thoiGianUpload: new Date(), // Thời gian upload là thời gian hiện tại
    };

    // Thêm sản phẩm mới vào mảng productData
    productData.push(newProduct);

    // Tạo một đối tượng mới cho khách hàng
    const newCustomer = {
        tenKhachHang: tenKhachHang,
    };

    // Thêm khách hàng mới vào mảng customerData
    customerData.push(newCustomer);

    // Gọi lại hàm để hiển thị dữ liệu mới trong bảng
    displayData();

    // Reset các trường nhập liệu sau khi thêm
    document.getElementById('phanLoai').value = '';
    document.getElementById('hinhAnhInput').value = ''; // Đặt lại giá trị input file
    document.getElementById('tenSanPham').value = '';
    document.getElementById('tenKhachHang').value = '';
});

// Gọi hàm để hiển thị dữ liệu ban đầu
displayData();

// Lấy tham chiếu đến nút "Xóa dữ liệu"
const clearDataButton = document.getElementById('clearDataButton');

// Thêm sự kiện "click" cho nút "Xóa dữ liệu"
clearDataButton.addEventListener('click', clearFormData);

// Hàm để xóa dữ liệu trong các trường nhập liệu
function clearFormData() {
    document.getElementById('phanLoai').value = '';
    document.getElementById('hinhAnhInput').value = ''; // Đặt lại giá trị input file
    document.getElementById('tenSanPham').value = '';
    document.getElementById('tenKhachHang').value = '';
}
