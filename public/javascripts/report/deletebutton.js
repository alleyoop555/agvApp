function remove() {
    const e = document.getElementById('file');
    const file = e.options[e.selectedIndex].text;
    const value = e.options[e.selectedIndex].value;
    if (value == 1) {
        $.ajax({
            data: {
                file: file,
            },
            url: '/report/DELETE/file/' + file,
            type: 'get',
            cache: false,
            timeout: 3000,
            dataType: 'json',
            success: () => {
                alert('success');
            }, error: () => {
                alert('failed');
            }
        })
    }
}