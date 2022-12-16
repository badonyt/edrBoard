
let boxes: string[] = [] 
let actual_boxes: string[] = []
let intervalId = 0
// main, is composed of two parts
function main(jsond: any){

        
      //reads json, creates box. And if needed adds to array 
    document.body.style.background = ''
    for (var key in jsond) {
        if (jsond.hasOwnProperty(key)) {
            console.log(key + " -> " + jsond[key].actual);
            actual_boxes.push(jsond[key].actual)
            
            console.log(key)
            if(jsond[key].hasOwnProperty('width') && jsond[key].hasOwnProperty('height')){
              console.log("w & h")
              crbox(key, true, jsond[key].x, jsond[key].y, jsond[key].width, jsond[key].height)
            }else if(jsond[key].hasOwnProperty('width')){
              console.log("w")
              crbox(key, true, jsond[key].x, jsond[key].y, jsond[key].width)
            }else if(jsond[key].hasOwnProperty('height')){
              crbox(key, true, jsond[key].x, jsond[key].y, "100px", jsond[key].height)
            }else{
              crbox(key, true, jsond[key].x, jsond[key].y)
            }
            
        
        }
    }
    console.log(actual_boxes)
    // sees if key is presssed down. If so puts box to different color.
    //also manages backround
    intervalId = window.setInterval(function(){
        
        for (let i = 0; i < actual_boxes.length; i++) {
            
            let see: any = is_key_down(actual_boxes[i].toLowerCase())
            const boesx: any = document.getElementById(boxes[i])
            if(see == true){
            
                boesx.style.backgroundColor = "white"
            }else{
                boesx.style.backgroundColor = "grey"
            }   
            if(localStorage.getItem("color") != null){
                if(localStorage.getItem("color") == "green")localStorage.setItem('color', "#00b140");
                // @ts-ignore
                document.body.style.background = localStorage.getItem("color");
            }else{
              localStorage.setItem('color', "#00b140")
            }
        }

    
    }, 30);

    console.log(intervalId)
}


// creates box. Based on inputs
function crbox(name: string,add:boolean = true, x: string, y:string, width:string="100px", height:string="100px"){
    const div = document.createElement("div");
    div.className = "box";
    div.id = name
    div.innerHTML = "<p style='text-align: center'>" + name + "</p>";
    div.setAttribute(
      'style',
      'position: absolute;left: '+x+';top: '+y+';width: '+width+';height: '+height+';',
    );
    //'position: absolute;left: "+x+";top: "+y+";'
    //@ts-ignore
    document.getElementById("maindiv").appendChild(div);
    if(add == true){
        boxes.push(name)
    }
    
}
// Sees if theres any boxes if not just call main function. If theres boxes on screen deletes them and then calls main
function readFile(file: any) {
    const reader = new FileReader(); 
    let result;
    reader.onload = (evt: any) => { 
        result = JSON.parse(evt.target.result);
        
        if (boxes.length == 0){main(result)}else{
            clearInterval(intervalId);
            let divlol: any = document.getElementById('maindiv');

            while(divlol.firstChild) {
              divlol.removeChild(divlol.firstChild);
            }
            boxes = []
            actual_boxes = []
            main(result)
            
            
        }
        
        
    };

    reader.readAsText(file); 
}
// When user inputs file, calls readfile function
const inputElement: any = document.getElementById("input");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const file: HTMLElement = inputElement.files[0];
  readFile(file)
}


import { listen } from '@tauri-apps/api/event'
//THE NEXT THING IS JUST WHEN GETS SIGNAL FROM RUST APPENDS TO THIS ARRAY
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
// @ts-ignore
const unlisten_button_pressed = listen('button-pressed', (event: any) => {
  event.payload = "mouse"+event.payload.toLowerCase()
  console.log(event.payload)
  currently_pressed.push(event.payload)
  
})
// @ts-ignore
const unlisten_button_unpressed = listen('button-released', (event: any) => {
  event.payload = "mouse"+event.payload.toLowerCase()
  if(currently_pressed.includes(event.payload) == true){
    currently_pressed = currently_pressed.filter(e => e !== event.payload)
  }


  console.log(event.payload)

})
// function to see if key is down. From the array
function is_key_down(letter: string){
    // console.log(letter)
    if(currently_pressed.includes(letter.toLowerCase()) == true)return true;
    if(currently_pressed.includes(letter) == true)return true;
    return false
}
