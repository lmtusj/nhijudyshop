document.addEventListener('DOMContentLoaded', function () {
    const toggleFormButton = document.getElementById('toggleFormButton');
    const dataForm = document.getElementById('dataForm');
    const productForm = document.getElementById('productForm');
    const liveTable = document.querySelector('.live table');
    const dateFilterDropdown = document.getElementById('dateFilter'); // Thêm đối tượng cho dropdown lọc đợt live

    // Đặt giá trị max cho trường input ngày là ngày hôm nay
    const dotLiveInput = document.getElementById('dotLive');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dotLiveInput.value = `${yyyy}-${mm}-${dd}`; // Đặt giá trị mặc định là ngày hôm nay

    dotLiveInput.addEventListener('input', function () {
        // Kiểm tra nếu người dùng nhập ngày trong tương lai, thì đặt giá trị về ngày hôm nay
        const enteredDate = new Date(dotLiveInput.value);
        if (enteredDate > today) {
            dotLiveInput.value = `${yyyy}-${mm}-${dd}`;
        }
    });

    toggleFormButton.addEventListener('click', function () {
        if (dataForm.style.display === 'none' || dataForm.style.display === '') {
            dataForm.style.display = 'block';
            toggleFormButton.textContent = 'Ẩn biểu mẫu';
        } else {
            dataForm.style.display = 'none';
            toggleFormButton.textContent = 'Hiện biểu mẫu';
        }
    });

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const phanLoai = document.getElementById('phanLoai').value;
        const dotLiveInput = document.getElementById('dotLive');
        const dotLiveValue = dotLiveInput.value;

        if (!dotLiveValue) {
            alert('Vui lòng chọn một đợt Live.');
            return;
        }

        const dotLiveDate = new Date(dotLiveValue);
        const dd = String(dotLiveDate.getDate()).padStart(2, '0');
        const mm = String(dotLiveDate.getMonth() + 1).padStart(2, '0');
        const yy = String(dotLiveDate.getFullYear()).slice(-2);
        const formattedDotLive = dd + '/' + mm + '/' + yy;

        let currentRow = null;
        for (const row of liveTable.rows) {
            if (row.cells[0].textContent === formattedDotLive) {
                currentRow = row;
                break;
            }
        }

        if (!currentRow) {
            currentRow = liveTable.insertRow(-1);
            const dateCell = currentRow.insertCell(0);
            dateCell.textContent = formattedDotLive;
            currentRow.insertCell(1);
            currentRow.insertCell(2);
            currentRow.insertCell(3);
            currentRow.insertCell(4);
        }

        const hinhAnhInput = document.getElementById('hinhAnhInput');
        const hinhAnhFiles = hinhAnhInput.files;

        for (const hinhAnh of hinhAnhFiles) {
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(hinhAnh);
            imgElement.alt = phanLoai;
            imgElement.className = 'product-image';

            const cellIndex = getCellIndexByPhanLoai(phanLoai);
            if (cellIndex !== -1) {
                currentRow.cells[cellIndex].appendChild(imgElement);
            }
        }

        productForm.reset();
        dataForm.style.display = 'none';
        toggleFormButton.textContent = 'Hiện biểu mẫu';

        // Cập nhật dropdown lọc đợt live
        updateDateFilterDropdown();
    });

    dateFilterDropdown.addEventListener('change', function () {
        const selectedDate = dateFilterDropdown.value;

        for (const row of liveTable.rows) {
            if (row.cells[0].textContent !== 'ĐỢT LIVE') {
                const rowDate = row.cells[0].textContent;
                if (selectedDate === 'all' || selectedDate === rowDate) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    });

    // Hàm để xác định chỉ số của ô trong hàng dựa trên phân loại sản phẩm
    function getCellIndexByPhanLoai(phanLoai) {
        switch (phanLoai) {
            case 'Áo':
                return 1;
            case 'Quần':
                return 2;
            case 'Set và Đầm':
                return 3;
            case 'PKGD':
                return 4;
            default:
                return -1;
        }
    }

    // Hàm cập nhật dropdown lọc đợt live
    function updateDateFilterDropdown() {
        const dateFilterDropdown = document.getElementById('dateFilter');

        // Xóa tất cả các tùy chọn trừ "Tất cả"
        while (dateFilterDropdown.options.length > 1) {
            dateFilterDropdown.remove(1);
        }

        // Lấy danh sách các đợt live hiện có
        const dotLiveOptions = [];
        for (const row of liveTable.rows) {
            if (row.cells[0].textContent !== 'ĐỢT LIVE') {
                dotLiveOptions.push(row.cells[0].textContent);
            }
        }

        // Thêm các đợt live vào dropdown
        dotLiveOptions.forEach(function (dotLive) {
            const option = document.createElement('option');
            option.value = dotLive;
            option.textContent = dotLive;
            dateFilterDropdown.appendChild(option);
        });
    }

    // Khởi đầu: Cập nhật dropdown lọc đợt live ban đầu
    updateDateFilterDropdown();
});
