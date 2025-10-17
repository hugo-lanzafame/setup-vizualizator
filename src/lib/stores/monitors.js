import { writable } from 'svelte/store';
import { DEFAULT_MONITOR_CONFIG } from '../data/monitors';

function monitorsStoreFactory() {
    const { subscribe, set, update } = writable([]);
    
    let nextId = 0;
    
    return {
        subscribe,

        addMonitor: (specs) => {
            const { width, height } = calculateMonitorSize(specs.diagonal, specs.aspectRatio);
            const newMonitor = {
                ...DEFAULT_MONITOR_CONFIG,
                ...specs,
                id: nextId++,
                width,
                height,
            };
            update(monitors => [...monitors, newMonitor]);

            return newMonitor;
        },

        selectMonitor: (id) => {
            update(monitors => 
                monitors.map(m => 
                    m.id === id ? { ...m, selected: !m.selected } : m
                )
            );
        },

        deleteMonitor: (id) => {
            update(monitors => monitors.filter(m => m.id !== id));
        },

        updateMonitor: (id, updates) => {
            update(monitors => 
                monitors.map(m => 
                    m.id === id ? { ...m, ...updates } : m
                )
            );
        },
    };
}

function calculateMonitorSize(diagonal, aspectRatio) {
    const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number);
    const ratio = Math.sqrt(widthRatio ** 2 + heightRatio ** 2);

    // Calculate dimensions in inches
    const heightInches = (diagonal * heightRatio) / ratio;
    const widthInches = (diagonal * widthRatio) / ratio;

    // Convert inches to cm (1 inch = 2.54 cm)
    const heightCm = heightInches * 2.54;
    const widthCm = widthInches * 2.54;

    // Convert cm to Three.js units (1 unit = 10 cm)
    const height = heightCm / 10;
    const width = widthCm / 10;

    return { width, height };
}

export const monitorsStore = monitorsStoreFactory();
