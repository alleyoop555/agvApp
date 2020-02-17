function showList(e) {
    $.ajax({
        url: '/report/api/filelist',
        type: 'GET',
        cache: true,
        timeout: 3000,
        success: (obj)=>{
            let c = e.children;
            while (c.length > 1) {
                e.removeChild(e.lastChild);
            }
            obj.list.forEach((text)=>{
                let option = document.createElement("option");
                option.innerHTML = text;
                option.value = "1";
                e.appendChild(option);
            })
        }, error: ()=>{
            alert('failed');
        }
    })
}