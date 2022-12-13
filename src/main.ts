
let boxes: string[] = [] 
let actual_boxes: string[] = []
let intervalId = 0
function main(jsond: any){
    //console.log(jsond)
        
       
    document.body.style.background = ''
    for (var key in jsond) {
        if (jsond.hasOwnProperty(key)) {
            console.log(key + " -> " + jsond[key].actual);
            actual_boxes.push(jsond[key].actual)
            crbox(key, true, jsond[key].x, jsond[key].y)
            console.log(key)
            
        
        }
    }
    console.log(actual_boxes)

    intervalId = window.setInterval(function(){
        // console.log(is_key_down("BackSlash"))
        for (let i = 0; i < actual_boxes.length; i++) {
            // console.log(boxes)
            let see: any = is_key_down(actual_boxes[i].toLowerCase())
            const boesx: any = document.getElementById(boxes[i])
            if(see == true){
            
                boesx.style.backgroundColor = "white"
            }else{
                boesx.style.backgroundColor = "grey"
            }   
            if(localStorage.getItem("color") != null){
                if(localStorage.getItem("color") == "green")localStorage.setItem('color', "#00b140")
                // @ts-ignore
                document.body.style.background = localStorage.getItem("color");
            }
        }

    
    }, 30);

    console.log(intervalId)
}



function crbox(name: string,add:boolean = true, x: string, y:string){
    const div = document.createElement("div");
    div.className = "box";
    div.id = name
    div.innerHTML = "<p style='text-align: center'>" + name + "</p>";
    div.setAttribute(
      'style',
      'position: absolute;left: '+x+';top: '+y+';',
    );
    //'position: absolute;left: "+x+";top: "+y+";'
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
            actual_boxes = []
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


import { listen } from '@tauri-apps/api/event'

let currently_pressed:string[] = []
// @ts-ignore
const unlisten = listen('key-pressed', (event: any) => {
  event.payload = event.payload.toLowerCase()
  //console.log(event.payload.split(""))
  
  if(event.payload.split("")[0] == "k" && currently_pressed.includes(event.payload.split("")[3]) == false){
    currently_pressed.push(event.payload.split("")[3])
    console.log(currently_pressed)
  }else if(event.payload.split("")[0] == "n" && currently_pressed.includes(event.payload.split("")[3]) == false){
    currently_pressed.push(event.payload.split("")[3])
    console.log(currently_pressed)
  }else if(currently_pressed.includes(event.payload) == false){
    currently_pressed.push(event.payload)
    console.log(currently_pressed)
    console.log(event.payload)  
  }
})
// @ts-ignore
const unlistens = listen('key-released', (event: any) => {
    event.payload = event.payload.toLowerCase()
  if(event.payload.split("")[0] == "k" && currently_pressed.includes(event.payload.split("")[3]) == true){
    currently_pressed = currently_pressed.filter(e => e !== event.payload.split("")[3])
    console.log(currently_pressed)
  }else if(event.payload.split("")[0] == "n" && currently_pressed.includes(event.payload.split("")[3]) == true){
    currently_pressed = currently_pressed.filter(e => e !== event.payload.split("")[3])
    console.log(currently_pressed)
  }else if(currently_pressed.includes(event.payload) == true){
    currently_pressed = currently_pressed.filter(e => e !== event.payload)
    console.log(currently_pressed)
    console.log(event.payload)
  }
})
function is_key_down(letter: string){
    // console.log(letter)
    if(currently_pressed.includes(letter.toLowerCase()) == true)return true;
    if(currently_pressed.includes(letter) == true)return true;
    return false
}
