import {is_key_down} from './keydown.js' // @ts-ignore
let boxes: string[] = [] 
let intervalId = 0
function main(jsond: JSON){
    console.log(jsond)
        
       
    document.body.style.background = ''
    for (var key in jsond) {
        if (jsond.hasOwnProperty(key)) {
            console.log(key + " -> " + jsond[key]);
            
            crbox(jsond[key], true)
            
        
        }
    }


    intervalId = window.setInterval(function(){
    
        for (let i = 0; i < boxes.length; i++) {
            console.log(boxes)
            let see: any = is_key_down(boxes[i])
            const boesx: any = document.getElementById(boxes[i])
            if(see == true){
            
                boesx.style.backgroundColor = "white"
            }else{
                boesx.style.backgroundColor = "grey"
            }   
            if(localStorage.getItem("color") != null){
                if(localStorage.getItem("color") == "green")localStorage.setItem('color', "#00b140")
                
                document.body.style.background = localStorage.getItem("color");
            }
        }

    
    }, 30);

    console.log(intervalId)
}



function crbox(name: string,add:boolean = true){
    const div = document.createElement("div");
    div.className = "box";
    div.id = name
    div.innerHTML = "<p style='text-align: center'>" + name + "</p>";
    document.body.appendChild(div);
    if(add == true){
        boxes.push(name)
    }
    
}

function readFile(file: any) {
    const reader = new FileReader(); // create the waiter
    let result;
    reader.onload = (evt: any) => { // when the waiter comes back with my food `evt`, this is what I want to do with it
        result = JSON.parse(evt.target.result);
        
        if (boxes.length == 0){main(result)}else{
            clearInterval(intervalId);
            for(let i = 0; i < boxes.length + 1; i++){
                let crboxl: any = document.getElementById(boxes[0])
                crboxl.remove()
                boxes.shift()
            }
            let crboxl: any = document.getElementById(boxes[0])
            crboxl.remove()
            boxes.shift()
            main(result)
            
            
        }
        
        
    };

    reader.readAsText(file); // You order your food
    console.log(result) // you immediately try to access your food, it is not ready yet
}

const inputElement: any = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const file: HTMLElement = inputElement.files[0];
  readFile(file)
}


