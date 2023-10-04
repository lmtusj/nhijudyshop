// Dữ liệu hàng tồn sản phẩm
let inventoryData = [
    { phanLoai: 'Áo', hinhAnh: './../Picture/[A1279] A1 ÁO TOMMYHILFIGER SỌC MÀU SIZE S.jpg', tenSanPham: 'TOMMYHILFIGER SỌC MÀU', kichCo: ['S', 'M', 'L'], soLuong: [5, 2, 1] },
    { phanLoai: 'Quần', hinhAnh: './../Picture/[A1414] A1 ÁO TRẮNG ADIDAS CHỮ TÍM SIZE L.jpg', tenSanPham: 'ADIDAS CHỮ TÍM', kichCo: ['S', 'M', 'L'], soLuong: [9, 6, 3] },
    // Thêm dữ liệu cho các sản phẩm và kích cỡ khác
];

// Lấy tbody của bảng
const tbody = document.querySelector('tbody');

// Hiển thị dữ liệu hàng tồn sản phẩm trong bảng
function displayInventoryData() {
    tbody.innerHTML = '';
    inventoryData.forEach((item, rowIndex) => {
        item.kichCo.forEach((kichCo, index) => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete';
            deleteButton.innerText = 'Xoá';
            deleteButton.onclick = () => deleteInventory(item, index);
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.soLuong[index];
            quantityInput.setAttribute('min', '0');
            quantityInput.setAttribute('step', '1');
            quantityInput.setAttribute('onchange', `updateInventory(this, ${index}, '${item.tenSanPham}')`);

            // Hiển thị số thứ tự và phân loại ở hàng đầu tiên của mỗi sản phẩm
            if (index === 0) {
                row.innerHTML = `
                    <td>${rowIndex + 1}</td>
                    <td>${item.phanLoai}</td>
                    <td><img src="${item.hinhAnh}" alt="Hình sản phẩm"></td>
                    <td>${item.tenSanPham}</td>
                    <td>${kichCo}</td>
                    <td></td>
                    <td></td>
                `;
            } else {
                // Ẩn số thứ tự và phân loại cho các hàng khác
                row.innerHTML = `
                    <td></td>
                    <td>${item.phanLoai}</td>
                    <td><img src="${item.hinhAnh}" alt="Hình sản phẩm"></td>
                    <td>${item.tenSanPham}</td>
                    <td>${kichCo}</td>
                    <td></td>
                    <td></td>
                `;
            }

            row.querySelector('td:nth-child(6)').appendChild(quantityInput);
            row.querySelector('td:last-child').appendChild(deleteButton);
            tbody.appendChild(row);
        });
    });
}

// Cập nhật số lượng sản phẩm khi người dùng thay đổi giá trị
function updateInventory(input, index, tenSanPham) {
    const newQuantity = parseInt(input.value);
    inventoryData.forEach(item => {
        if (item.tenSanPham === tenSanPham) {
            item.soLuong[index] = newQuantity;
            if (newQuantity === 0) {
                // Nếu số lượng giảm về 0, xoá hàng khỏi bảng
                const rowToRemove = input.parentElement.parentElement;
                rowToRemove.remove();
            }
        }
    });
}

// Xoá sản phẩm khi người dùng ấn nút "Xoá"
function deleteInventory(item, index) {
    item.kichCo.splice(index, 1);
    item.soLuong.splice(index, 1);
    displayInventoryData();
}

// Gọi hàm để hiển thị dữ liệu ban đầu
displayInventoryData();

// Hàm áp dụng bộ lọc phân loại
function applyCategoryFilter() {
    const filterCategory = document.getElementById('filterCategory').value;

    // Lặp qua từng hàng của bảng và xử lý việc ẩn/cuộn hàng dựa trên phân loại
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const categoryCell = row.querySelector('td:nth-child(2)'); // Lấy cột phân loại
        const category = categoryCell.textContent.trim();

        if (filterCategory === 'all' || category === filterCategory) {
            row.style.display = ''; // Hiển thị hàng nếu phân loại khớp hoặc đang chọn "Tất cả"
        } else {
            row.style.display = 'none'; // Ẩn hàng nếu phân loại không khớp
        }
    });
}
