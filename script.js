#Script
const shadesContainer = document.getElementById('shades');
const backBtn = document.getElementById('backBtn');
const title = document.getElementById('title');
const colorDropdown = document.getElementById('colorDropdown');
const btnTH = document.getElementById('btn-th');
const btnEN = document.getElementById('btn-en');

const colorKeys = ["black", "red", "white", "blue", "yellow", "green", "orange", "purple", "pink"];

const texts = {
    th: {
        title: 'เลือกสีหลักที่คุณชอบ',
        selectPlaceholder: 'เลือกสีหลักจากเมนู',
        back: 'ย้อนกลับ',
        alertCopy: (hex) => `คัดลอกรหัสสี ${hex} เรียบร้อย!`,
        shadeTitle: 'เลือกเฉดสีที่ต้องการ',
        dropdownOptions: {
            black: "ดำ",
            red: "แดง",
            white: "ขาว",
            blue: "น้ำเงิน",
            yellow: "เหลือง",
            green: "เขียว",
            orange: "ส้ม",
            purple: "ม่วง",
            pink: "ชมพู",
        }
    },
    en: {
        title: 'Choose Your Main Color',
        selectPlaceholder: 'Select main color from menu',
        back: 'Back',
        alertCopy: (hex) => `Copied color code ${hex}!`,
        shadeTitle: 'Choose the shade you want',
        dropdownOptions: {
            black: "Black",
            red: "Red",
            white: "White",
            blue: "Blue",
            yellow: "Yellow",
            green: "Green",
            orange: "Orange",
            purple: "Purple",
            pink: "Pink",
        }
    }
};

let currentLang = 'th';

function updateDropdownOptions(lang) {
    // เคลียร์ตัวเลือกเดิมก่อน
    colorDropdown.innerHTML = '';

    // ใส่ option placeholder ใหม่
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    placeholderOption.textContent = texts[lang].selectPlaceholder;
    colorDropdown.appendChild(placeholderOption);

    // ใส่ options ของสีตามภาษาที่เลือก
    colorKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = texts[lang].dropdownOptions[key];
        colorDropdown.appendChild(option);
    });
}

function updateText(lang) {
    currentLang = lang;
    title.textContent = texts[lang].title;
    backBtn.textContent = texts[lang].back;
    updateDropdownOptions(lang);

    // ปรับปุ่มภาษา active & aria-pressed
    btnTH.classList.toggle('active', lang === 'th');
    btnEN.classList.toggle('active', lang === 'en');
    btnTH.setAttribute('aria-pressed', lang === 'th');
    btnEN.setAttribute('aria-pressed', lang === 'en');
}

function showShades(colorKey) {
    shadesContainer.innerHTML = '';
    if (!colorShades[colorKey]) return;

    const whiteShades = ['#ffffff', '#fffafa', '#f0fff0', '#f5fffa', '#f0ffff', '#f0f8ff', '#f8f8ff'];

    colorShades[colorKey].forEach(shade => {
        const box = document.createElement('div');
        box.className = 'shade-box';

        if (whiteShades.includes(shade.hex.toLowerCase())) {
            box.classList.add('white-shade');
        }

        box.style.backgroundColor = shade.hex;
        box.title = `คลิกเพื่อคัดลอกรหัสสี ${shade.hex}`;
        box.innerHTML = `
      <div class="shade-name">${shade.name}</div>
      <div class="shade-hex">${shade.hex}</div>
    `;
        box.onclick = () => {
            navigator.clipboard.writeText(shade.hex);
            alert(texts[currentLang].alertCopy(shade.hex));
        };
        shadesContainer.appendChild(box);
    });

    backBtn.style.display = 'inline-block';
    colorDropdown.style.display = 'none';
    title.textContent = texts[currentLang].shadeTitle;
}

colorDropdown.addEventListener('change', e => {
    const selectedColor = e.target.value;
    showShades(selectedColor);
});

backBtn.addEventListener('click', () => {
    shadesContainer.innerHTML = '';
    backBtn.style.display = 'none';
    colorDropdown.style.display = 'inline-block';
    colorDropdown.value = '';
    title.textContent = texts[currentLang].title;
});

btnTH.addEventListener('click', () => updateText('th'));
btnEN.addEventListener('click', () => updateText('en'));

// เริ่มต้นเป็นภาษาไทย
updateText('th');

const colorShades = {
    black: [
        { name: "Black", hex: "#000000" },
        { name: "Dim Gray", hex: "#696969" },
        { name: "Gray", hex: "#808080" },
        { name: "Dark Gray", hex: "#A9A9A9" },
        { name: "Silver", hex: "#C0C0C0" },
        { name: "Light Gray", hex: "#D3D3D3" },
        { name: "Gainsboro", hex: "#DCDCDC" }
    ],
    red: [
        { name: "Dark Red", hex: "#8B0000" },
        { name: "Firebrick", hex: "#B22222" },
        { name: "Crimson", hex: "#DC143C" },
        { name: "Red", hex: "#FF0000" },
        { name: "Tomato", hex: "#FF6347" },
        { name: "Salmon", hex: "#FA8072" },
        { name: "Light Coral", hex: "#F08080" }
    ],
    white: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Snow", hex: "#FFFAFA" },
        { name: "Honeydew", hex: "#F0FFF0" },
        { name: "Mint Cream", hex: "#F5FFFA" },
        { name: "Azure", hex: "#F0FFFF" },
        { name: "Alice Blue", hex: "#F0F8FF" },
        { name: "Ghost White", hex: "#F8F8FF" }
    ],
    blue: [
        { name: "Navy", hex: "#000080" },
        { name: "Dark Blue", hex: "#00008B" },
        { name: "Medium Blue", hex: "#0000CD" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Dodger Blue", hex: "#1E90FF" },
        { name: "Cornflower Blue", hex: "#6495ED" },
        { name: "Light Sky Blue", hex: "#87CEFA" }
    ],
    yellow: [
        { name: "Gold", hex: "#FFD700" },
        { name: "Yellow", hex: "#FFFF00" },
        { name: "Light Yellow", hex: "#FFFFE0" },
        { name: "Lemon Chiffon", hex: "#FFFACD" },
        { name: "Light Goldenrod Yellow", hex: "#FAFAD2" },
        { name: "Papaya Whip", hex: "#FFEFD5" },
        { name: "Moccasin", hex: "#FFE4B5" }
    ],
    green: [
        { name: "Dark Green", hex: "#006400" },
        { name: "Forest Green", hex: "#228B22" },
        { name: "Green", hex: "#008000" },
        { name: "Lime Green", hex: "#32CD32" },
        { name: "Lime", hex: "#00FF00" },
        { name: "Spring Green", hex: "#00FF7F" },
        { name: "Pale Green", hex: "#98FB98" }
    ],
    orange: [
        { name: "Dark Orange", hex: "#FF8C00" },
        { name: "Orange", hex: "#FFA500" },
        { name: "Coral", hex: "#FF7F50" },
        { name: "Tomato", hex: "#FF6347" },
        { name: "Peach Puff", hex: "#FFDAB9" },
        { name: "Moccasin", hex: "#FFE4B5" },
        { name: "Bisque", hex: "#FFE4C4" }
    ],
    purple: [
        { name: "Indigo", hex: "#4B0082" },
        { name: "Dark Violet", hex: "#9400D3" },
        { name: "Blue Violet", hex: "#8A2BE2" },
        { name: "Purple", hex: "#800080" },
        { name: "Medium Purple", hex: "#9370DB" },
        { name: "Lavender", hex: "#E6E6FA" },
        { name: "Thistle", hex: "#D8BFD8" }
    ],
    pink: [
        { name: "Deep Pink", hex: "#FF1493" },
        { name: "Hot Pink", hex: "#FF69B4" },
        { name: "Light Pink", hex: "#FFB6C1" },
        { name: "Pink", hex: "#FFC0CB" },
        { name: "Pale Violet Red", hex: "#DB7093" },
        { name: "Medium Violet Red", hex: "#C71585" }
    ]
};
