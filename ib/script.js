// Dữ liệu sản phẩm và thông tin khách hàng
let productData = [
    { phanLoai: 'Áo', hinhAnh: './../Picture/[A1279] A1 ÁO TOMMYHILFIGER SỌC MÀU SIZE S.jpg', tenSanPham: 'TOMMYHILFIGER SỌC MÀU' },
    { phanLoai: 'Quần', hinhAnh: './../Picture/[A1414] A1 ÁO TRẮNG ADIDAS CHỮ TÍM SIZE L.jpg', tenSanPham: 'ADIDAS CHỮ TÍM' },
    // Thêm dữ liệu cho các sản phẩm khác
];

let customerData = [
    { tenKhachHang: 'Khách hàng 1'},
    { tenKhachHang: 'Khách hàng 2'},
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

        const row = document.createElement('tr');
        const thuTuCell = document.createElement('td');
        const phanLoaiCell = document.createElement('td');
        const hinhAnhCell = document.createElement('td');
        const tenSanPhamCell = document.createElement('td');
        const thongTinKhachHangCell = document.createElement('td');
        const toggleVisibilityCell = document.createElement('td');

        if (product) {
            rowIndex++; // Tăng số thứ tự
            thuTuCell.textContent = rowIndex;
            phanLoaiCell.textContent = product.phanLoai;
            hinhAnhCell.innerHTML = `<img src="${product.hinhAnh}" alt="${product.tenSanPham}" class="product-image">`;
            tenSanPhamCell.textContent = product.tenSanPham;
        } else {
            thuTuCell.textContent = '';
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

        row.appendChild(thuTuCell);
        row.appendChild(phanLoaiCell);
        row.appendChild(hinhAnhCell);
        row.appendChild(tenSanPhamCell);
        row.appendChild(thongTinKhachHangCell);
        row.appendChild(toggleVisibilityCell);
        tbody.appendChild(row);
    }
}

// Thêm sự kiện "change" cho dropdown
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
        const categoryCell = row.querySelector('td:nth-child(2)'); // Lấy ô chứa phân loại (cột thứ 2)

        // Nếu giá trị phân loại là "all" hoặc giá trị phân loại của hàng trùng khớp với giá trị được chọn
        if (selectedCategory === 'all' || categoryCell.textContent === selectedCategory) {
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

// Gọi hàm để hiển thị dữ liệu ban đầu
displayData();
