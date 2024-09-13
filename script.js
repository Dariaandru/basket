const total = document.getElementById("total-price");
const total1 = document.getElementById("quantity");
document.addEventListener('DOMContentLoaded', loadProducts);
const list_products = [
    {
        name: '43" (109 см) LED-телевизор DEXP A431 серый',
        description: 'Direct LED, 4K UltraHD, Wi-Fi, 60 Гц, Android TV, HDMI х 3, USB х 2 шт',
        price: 20599,
    },

    {
        name: '6.56" Смартфон Tecno SPARK GO 2024 64 ГБ золотистый',
        description: 'ядер - 8x(1.6 ГГц), 3 ГБ, 2 SIM, IPS, 1612x720, камера 13+0.8 Мп, 4G, GPS, FM, 5000 мА*ч',
        price: 6999,
    },

    {
        name: '15.6" Ноутбук ASUS TUF Gaming F15 FX507ZC4-HN009 серый',
        description: '1920x1080, IPS, Intel Core i5-12500H, ядра: 4 + 8 х 2.5 ГГц + 1.8 ГГц, RAM 16 ГБ, SSD 512 ГБ, GeForce RTX 3050 для ноутбуков 4 ГБ, без ОС',
        price: 78999,
    },

    {
        name: 'ПК ARDOR GAMING NEO M143',
        description: 'Intel Core i5-12400F, 6 x 2.5 ГГц, 16 ГБ DDR4, GeForce RTX 3050, SSD 1000 ГБ, без ОС',
        price: 68799,
    },

    {
        name: '6.56" Смартфон Infinix SMART 8 64 ГБ зеленый',
        description: 'ядер - 8x(1.6 ГГц), 3 ГБ, 2 SIM, IPS, 1612x720, камера 13+0.2 Мп, 4G, GPS, FM, 5000 мА*ч',
        price: 6999,
    },

    {
        name: 'Компактный фотоаппарат Sony ZV-1 черный',
        description: '20.1 Мп, фото: 5472x3648, видео Full HD, дисплей 3", Bluetooth, Wi-Fi',
        price: 69999,
    },

    {
        name: '11" Планшет Xiaomi Pad 6 Wi-Fi 256 ГБ черный',
        description: '2880x1800, IPS, 8x3.2 ГГц, 8 ГБ, 8840 мА*ч, Android 13.x',
        price: 39999,
    },

    {
        name: 'Микрофон Fifine AM8 черный',
        description: 'проводной, настольный, подвесной, -50 дБ, от 50 Гц до 16000 Гц, jack 3.5 мм, USB Type-C, XLR',
        price: 6099,
    },

    {
        name: 'МФУ струйное Epson L3250',
        description: 'цветная печать, A4, 5760x1440 dpi, ч/б - 10 стр/мин (А4), USB, Wi-Fi, СНПЧ',
        price: 15000,
    },

    {
        name: 'Мышь проводная CBR CM-102 черный',
        description: '1200 dpi, USB Type-A, кнопки - 3',
        price: 99,
    },

    {
        name: '23.8" Монитор ARDOR GAMING PORTAL AF24H1 черный',
        description: '1920x1080@144 Гц, IPS, LED, 1000:1, 280 Кд/м², 178°/178°, DisplayPort 1.4 x2, HDMI 2.0 x2, AMD FreeSync Compatible, NVIDIA G-SYNC Compatible',
        price: 13999,
    },

   
];
let id = 0;
function update()
{
    list_basket.map(function(product) {
        const basket_el = document.createElement('div');
    
        const pr_name = document.createElement('p');
        pr_name.innerHTML = product.name;
        basket_el.appendChild(pr_name);
    
        const pr_des = document.createElement('p');
        pr_des.innerHTML = product.description;
        basket_el.appendChild(pr_des);
    
    
        const pr_price = document.createElement('p');
        pr_price.innerHTML = product.price;
        basket_el.appendChild(pr_price);

        const pr_count = document.createElement('p');
        pr_count.innerHTML = product.count;
        basket_el.appendChild(pr_count);
        // basket_el.id = product.id;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Удалить';
        deleteButton.addEventListener('click', function() {
            deleteFromBasket(product.id);
        });
        basket_el.appendChild(deleteButton);

        basket_el.classList.add('product_basket');
        basket_el.id = product.id;



    
        basket.appendChild(basket_el);
        console.log(list_basket);
    });

        updateTotal();
        UpdateQuantity()
}




const list = document.getElementById('products');

list_products.map(function(product) {
    const elem = document.createElement('div');
    elem.classList.add('product');

    const name = document.createElement('h3');
    name.textContent = product.name;
    elem.appendChild(name);

    const description = document.createElement('p');
    description.textContent = product.description;
    elem.appendChild(description);

    const price = document.createElement('p');
    price.textContent = product.price;
    price.classList.add('price');
    elem.appendChild(price);

    const button = document.createElement('button');
    button.innerHTML = 'Добавить <br>в <br>корзину';
    button.classList.add('button');
    button.addEventListener('click', function() {
        addToBasket(product);
    });
    elem.appendChild(button);

    list.appendChild(elem);

});

const basket = document.getElementById("basket");

let list_basket = [];
function loadProducts()
{
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        list_basket = JSON.parse(storedProducts);
        if (!Array.isArray(list_basket)) {
            list_basket = [];
        }
    } else {
        list_basket = [];
    }

    update();
}

function addToBasket(product)
{
    for (let i = 0; i < list_basket.length; i++) {
        if (list_basket[i].name === product.name) {
            list_basket[i].count++;
            localStorage.setItem('products', JSON.stringify(list_basket));
            location.reload();
            return;
        }
    }
    
    product.id = Date.now();
    product.count = 1;
    list_basket.push(product);
    localStorage.setItem('products', JSON.stringify(list_basket));
    console.log(list_basket);

    location.reload();
    updateTotal();
    UpdateQuantity()
    
};

function deleteFromBasket(id) {
    for (let i = 0; i < list_basket.length; i++) {
        if (list_basket[i].id === id) {
            list_basket.splice(i, 1);
            localStorage.setItem('products', JSON.stringify(list_basket));
            location.reload();
            return;
        }
    }
    updateTotal();
    UpdateQuantity()
    
}

function updateTotal()
{
    let sum = 0;
    for (let i = 0; i < list_basket.length; i++) {
        sum += list_basket[i].price * list_basket[i].count;
    }


    total.innerHTML = "Общая стоимость: " + sum + " руб.";
    // console.log(sum);
}

function UpdateQuantity()
{
    let sum = 0;
    for (let i = 0; i < list_basket.length; i++) {
        sum += list_basket[i].count;
    }


    total1.innerHTML = "Общая количество: " + sum + " шт.";
}



