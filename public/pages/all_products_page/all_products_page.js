(function(){
    const json_url = "/api/all_product";

    fetch(json_url)
        .then((res) => {
            return res.json();
        }).then((data) => {
            createList(data);
        }).catch((e) => {
            console.log(e);
        });    
})();

function createList(data) {
    const content_area = document.getElementById("product_item_1");
    const content_reverse_area = document.getElementById("product_item_2");
    var after_content = content_reverse_area;
    var is_positive = true;
    const products_list = data.product_list;

    var count = 0;

    products_list.forEach((product, index) => {
        if(index == 0) {
            var img_element = content_area.querySelector("img");
            var product_title = content_area.querySelector("h3");
            content_area.setAttribute('href', product.url);
            content_area.id = `product_item_${product.id}`;
            img_element.setAttribute('src', product.img_path);
            product_title.innerHTML = product.name_html;
        }else if(index == 1){
            var img_element = content_reverse_area.querySelector("img");
            var product_title = content_reverse_area.querySelector("h3");
            content_reverse_area.setAttribute('href', product.url);
            content_reverse_area.id = `product_item_${product.id}`;
            img_element.setAttribute('src', product.img_path);
            product_title.innerHTML = product.name_html;
        }else {
            if(is_positive){
                var clone_element = content_area.cloneNode(true);
                var img_element = clone_element.querySelector("img");
                var product_title = clone_element.querySelector("h3");
                clone_element.setAttribute('href', product.url);
                clone_element.id = `product_item_${product.id}`;
                img_element.setAttribute('src', product.img_path);
                product_title.innerHTML = product.name_html;
                after_content.after(clone_element);
                after_content = clone_element;
                is_positive = !is_positive;
            }else {
                var clone_element = content_reverse_area.cloneNode(true);
                var img_element = clone_element.querySelector("img");
                var product_title = clone_element.querySelector("h3");
                clone_element.setAttribute('href', product.url);
                clone_element.id = `product_item_${product.id}`;
                img_element.setAttribute('src', product.img_path);
                product_title.innerHTML = product.name_html;
                after_content.after(clone_element);
                after_content = clone_element;
                is_positive = !is_positive;
                }
            }
        }
    );
}