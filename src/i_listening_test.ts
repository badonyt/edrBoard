import { listen } from '@tauri-apps/api/event'

let currently_pressed:string[] = []
const unlisten = await listen('key-pressed', (event: any) => {
  //console.log(event.payload)
  //console.log(event.payload.split(""))
  
  if(event.payload.split("")[0] == "K" && currently_pressed.includes(event.payload.split("")[3]) == false){
    currently_pressed.push(event.payload.split("")[3])
    console.log(currently_pressed)
  }
})

const unlistens = await listen('key-released', (event: any) => {
  
  if(event.payload.split("")[0] == "K" && currently_pressed.includes(event.payload.split("")[3]) == true){
    currently_pressed = currently_pressed.filter(e => e !== event.payload.split("")[3])
    console.log(currently_pressed)
  }
})

