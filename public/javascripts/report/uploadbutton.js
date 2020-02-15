function upload() {
    const file =  document.getElementById('myfile');
    const form = document.getElementById('myform');
    file.addEventListener(
        'change', ()=>{
            form.submit();
        }
    )
    file.click();
}