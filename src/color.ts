function StoreColor(){
    const input_thing: any = document.getElementById('colorpicker')
    localStorage.setItem('color', input_thing.value);
}
// Get the input field
document.addEventListener("keyup", function(event: any) {
    if (event.keyCode === 13) {
        StoreColor();
    }
});

const elem:HTMLElement | null =document.getElementById("mainbtn")
// @ts-ignore
elem.onclick = function() { StoreColor(); };