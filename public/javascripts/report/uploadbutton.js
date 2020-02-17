function upload() {
    const uploadfile = document.getElementById('uploadfile');
    const dbfile = document.getElementById('dbfile');

    uploadfile.addEventListener(
        'change', ()=>{
            const file = uploadfile.files[0];
            let formData = new FormData();
            formData.append('uploadfile', file);

            $.ajax({
                url: '/report/api/upload',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                timeout: 3000,
                success: ()=>{
                    let c = dbfile.children;
                    while (c.length > 1) {
                        dbfile.removeChild(dbfile.lastChild);
                    }
                }, error: ()=>{
                    alert('failed');
                }
            })
        }
    )
    uploadfile.click();
}