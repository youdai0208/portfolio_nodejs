function querySubmit(){
    const send_url = "/api/form_data";

    const input_name = document.getElementById("input_name");
    const input_tel = document.getElementById("input_tel");
    const input_email = document.getElementById("input_email");
    const input_detalis = document.getElementById("input_detalis");
    var is_input_check = true;

    if(input_name.value == ""){
        is_input_check = false;
    } else if(input_tel.value == ""){
        is_input_check = false;
    } else if(input_email.value == ""){
        is_input_check = false;
    } else if(input_detalis.value == ""){
        is_input_check = false;
    }

    console.log(is_input_check);

    if(is_input_check){
        console.log("送信準備")
        var data = {
            name: input_name.value, 
            tel: input_tel.value, 
            email: input_email.value, 
            detalis: input_detalis.value,
        };
        var json = JSON.stringify(data);
        console.log(json);

        fetch(send_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: json,
        })
        .then(res => {
            console.log(res.ok);
            if(res.ok){
                var result = window.confirm("送信に成功しました。\nトップページへ戻りますか？");
                if(result){
                    input_name.value = "";
                    input_tel.value = "";
                    input_email.value = "";
                    input_detalis.value = "";
                    window.location.href = "../top_pages_grid_ver/top_pages.html";
                }else {
                    return false;
                }
                return true;
            } else {
                window.alert("送信に失敗しました。");
                return false;
            }
        })
        .catch((e) => {
            console.log(e);
            return false;
        });
    }else {
        window.alert("未入力項目があります。");
        return false;
    }
}