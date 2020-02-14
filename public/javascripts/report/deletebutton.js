function remove() {
    const form = document.getElementById('form');
    const e = document.getElementById('file');
    const file = e.options[e.selectedIndex].text;
    const value = e.options[e.selectedIndex].value;
    if (value == 1) {
        e.options[e.selectedIndex].value = file;
        form.action = '/report/DELETE/file/' + file;
        form.submit();
    }

}