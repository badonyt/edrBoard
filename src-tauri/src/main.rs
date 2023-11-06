#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use once_cell::sync::OnceCell;
use rdev::{listen, Event, EventType};
use tauri::{AppHandle, Manager};

static HANDLE: OnceCell<AppHandle> = OnceCell::new();

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            HANDLE.set(app.handle()).unwrap();

            std::thread::spawn(move || {
                if let Err(error) = listen(callback) {
                    println!("Error: {:?}", error);
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn callback(event: Event) {
    // dbg!(&event);
    match event.event_type {
        EventType::ButtonPress(button) => {
            if let Some(handle) = HANDLE.get() {
                //handle.emit_all("key-pressed", event.name).unwrap();
                handle.emit_all("button-pressed", format!("{:?}", button)).unwrap();
            }
        
        }
        EventType::ButtonRelease(button) => {
            println!("Key released: {:?}", button);
            if let Some(handle) = HANDLE.get() {
                //handle.emit_all("key-released", event.name).unwrap();
                handle.emit_all("button-released", format!("{:?}", button)).unwrap(); 
            }
        }
        EventType::KeyPress(key) => {
            println!("Key pressed: {:?}", key);
            if let Some(handle) = HANDLE.get() {
                //handle.emit_all("key-pressed", event.name).unwrap();
                handle.emit_all("key-pressed", format!("{:?}", key)).unwrap();
            }
        }
        EventType::KeyRelease(key) => {
            println!("Key released: {:?}", key);
            if let Some(handle) = HANDLE.get() {
                //handle.emit_all("key-released", event.name).unwrap();
                handle.emit_all("key-released", format!("{:?}", key)).unwrap(); 
            }
        }
        _ => (),
    }
}