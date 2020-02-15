function remove() {
    const form = document.getElementById('dbform');
    const e = document.getElementById('dbfile');
    const file = e.options[e.selectedIndex].text;
    const value = e.options[e.selectedIndex].value;
    if (value == 1) {
        e.options[e.selectedIndex].value = file;
        form.action = '/report/DELETE/file/' + file;
        form.submit();
    }

}