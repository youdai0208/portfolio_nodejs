(function(){
    const url = new URL(window.location.href);
    const url_string = url.toString();
    const url_split = url_string.split("/");
    var product_name;
    if(url_split.slice(-1)[0] == ""){
        product_name = url_split.slice(-2)[0];
    }else {
        product_name = url_split.slice(-1)[0];
    }

    const req_json_url = `/api/product/${product_name}`;

    fetch(req_json_url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setDetalis(data);
        })
        .catch((e) => {
            console.log(e);
        });

    popupPositionAdjust(document.getElementById("skill_popup"));
    popupPositionAdjust(document.getElementById("detalis_popup"));
})();

function setDetalis(res){
    var data = res[0];
    var img_area = document.getElementById("product_image");
    var skill_list = document.getElementById("skill_list")
    var detalis_area = document.getElementById("detalis_area");

    data.skill_name.forEach(item => {
        var div = document.createElement("div");
        var text = document.createElement("h4");
        text.textContent = item;
        div.appendChild(text);
        div.classList.add("skill_name_area");
        skill_list.appendChild(div);
    });

    img_area.setAttribute("src", data.img_path);
    detalis_area.innerHTML = `<p><b>製作物名</b><br>${data.name_html}</p><p><br><b>期間</b><br>${data.start_time} ~ ${data.end_time}</p><br><p><b>担当</b><br>${data.responsible}</p><br><p><b>動機</b><br>　${data.purpose}</p><br><p><b>特徴</b><br>　${data.features}</p><br><p><b>その他</b><br>　${data.other}</p>`;
}

function popupPositionAdjust(target_element){
    const height = target_element.offsetHeight;
    const top = height / 2;
    target_element.style.top = top;
}

function showSkillPopup(){  
    var popup = document.getElementById("skill_popup_wrapper");
    popup.classList.remove("is-hidden");
}

function hideSkillPopup(){ 
    var popup = document.getElementById("skill_popup_wrapper");
    popup.classList.add("is-hidden");
}
    
function showDetalisPopup(){  
    var popup = document.getElementById("detalis_popup_wrapper");
    popup.classList.remove("is-hidden");
}

function hideDetalisPopup(){ 
    var popup = document.getElementById("detalis_popup_wrapper");
    popup.classList.add("is-hidden");
}