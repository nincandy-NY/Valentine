const CORRECT_PASSWORD = "1234";

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    if (input === CORRECT_PASSWORD) {
        switchSection('loginSection', 'valentineSection');
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
}

function switchSection(oldId, newId) {
    document.getElementById(oldId).classList.remove('active');
    setTimeout(() => {
        document.getElementById(oldId).style.display = 'none';
        const next = document.getElementById(newId);
        next.style.display = 'block';
        next.classList.add('active');
    }, 300);
}

// ระบบอัปโหลดรูป
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('previewImg');
        output.src = reader.result;
        document.getElementById('uploadText').style.display = 'none';
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Logic ปุ่มหนีไม่เกิน 20% รอบๆ ปุ่มบันทึก
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function moveButton() {
    const rect = yesBtn.getBoundingClientRect();
    const range = 20; // จำกัดระยะการวิ่งให้อยู่ใกล้ปุ่มตกลงประมาณ 20-30% ของหน้าจอ Card

    // สุ่มตำแหน่งใหม่ให้อยู่รอบๆ ปุ่ม Yes
    const newX = (rect.left + Math.random() * (range * 2.5) - range);
    const newY = (rect.top + Math.random() * (range * 2.5) - range);

    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.position = 'fixed';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

// ปุ่มบันทึก
yesBtn.addEventListener('click', () => {
    const note = document.getElementById('memoryNote').value;
    if(note.trim() === "") {
        alert("กรุณาเขียนความทรงจำสักนิดนึงนะ...");
        return;
    }
    // ในที่นี้คือการสมมติการบันทึก (สามารถเชื่อมต่อ Database ได้ในอนาคต)
    switchSection('valentineSection', 'successSection');
});