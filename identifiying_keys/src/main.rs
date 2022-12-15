
use rdev::{Event, EventType, listen};


fn main() {
    


        if let Err(error) = listen(callback) {
            println!("Error: {:?}", error);
        }


    loop{}
}

fn callback(event: Event) {
    // dbg!(&event);
    match event.event_type {
        EventType::ButtonPress(button) => {
           let btn_string = format!("{:?}", button);
           println!("Key pressed: mouse{}", btn_string.to_lowercase());
        
        }
        EventType::ButtonRelease(button) => {
            let btn_string = format!("{:?}", button);
            println!("Key released: mouse{}", btn_string.to_lowercase());
        }
        EventType::KeyPress(key) => {
            let key_string: String = format!("{:?}", key);
            let char_vec: Vec<char> = key_string.chars().collect();
            if char_vec[0] == 'N' && char_vec[1] == 'u' && char_vec[2] == 'm'{
                println!("Key pressed: {}", format!("{}",char_vec[3]).to_lowercase())
            }else if char_vec[0] == 'K' && char_vec[1] == 'e' && char_vec[2] == 'y'{
                println!("Key pressed: {}", format!("{}",char_vec[3]).to_lowercase())
            }else{
                println!("Key pressed: {}", key_string);
            }
            
        }
        EventType::KeyRelease(key) => {
            let key_string: String = format!("{:?}", key);
            let char_vec: Vec<char> = key_string.chars().collect();
            if char_vec[0] == 'N' && char_vec[1] == 'u' && char_vec[2] == 'm'{
                println!("Key released: {}", format!("{}",char_vec[3]).to_lowercase())
            }else if char_vec[0] == 'K' && char_vec[1] == 'e' && char_vec[2] == 'y'{
                println!("Key released: {}", format!("{}",char_vec[3]).to_lowercase())
            }else{
                println!("Key released: {:?}", key);
            }
            
        }
        _ => (),
    }
}

