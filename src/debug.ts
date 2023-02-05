// if press h(while app focused) then make debug not transparent
document.addEventListener("keydown", function (event) {
    if (event.key === "h") {
        console.log("The 'h' key was pressed!");
        //@ts-ignore
        if(document.getElementById("debug").style.color == "transparent"){document.getElementById("debug").style.color = "black"}else{document.getElementById("debug").style.color = "transparent"}
    }
});
