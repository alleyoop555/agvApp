function remove() {
    const e = document.getElementById('dbfile');
    const file = e.options[e.selectedIndex].text;
    const value = e.options[e.selectedIndex].value;
    let obj;
    if (value == 1) {
        $.ajax({
            data: {
                file: file,
            },
            url: '/report/api/delete/' + file,
            type: 'get',
            cache: true,
            timeout: 3000,
            success: ()=>{
                let c = e.children;
                while (c.length > 1) {
                    e.removeChild(e.lastChild);
                }
            }, error: ()=>{
                alert('failed');
            }
        })
    }
}