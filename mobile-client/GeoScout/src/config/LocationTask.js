import React from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Vibration, AsyncStorage } from 'react-native';

// Nom de la variable dans AsyncStorage
const DETECTED = 'stepDetected';
// Nom de la Task
const DETECT_STEP = 'step-location-detection_task';

// Définition de la Task de détection d'entrée dans une zone
TaskManager.defineTask(DETECT_STEP, ({ data: { eventType }, error }) => {
    if (error) {
        console.log(error);
        return;
    }
    if (eventType === Location.GeofencingEventType.Enter) {
        console.log('Arrivé');
        Vibration.vibrate(1000);
        AsyncStorage.setItem(DETECTED, 'true');
    }
});

const startLocationTask = step =>
    Location.startGeofencingAsync(DETECT_STEP, [
        {
            latitude: step.latitude,
            longitude: step.longitude,
            radius: 50,
            notifyOnEnter: true,
            notifyOnExit: false
        }
    ]);

const stopLocationTask = async () =>
    Location.hasStartedGeofencingAsync(DETECT_STEP).then(x => {
        if (x) return Location.stopGeofencingAsync(DETECT_STEP);
    });

export { DETECTED, DETECT_STEP, startLocationTask, stopLocationTask };
