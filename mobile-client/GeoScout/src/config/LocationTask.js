import React from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Vibration, AsyncStorage } from 'react-native';
import { isPointWithinRadius } from 'geolib';

// Nom de la variable dans AsyncStorage
const DETECTED = 'stepDetected';
// Nom de la Task
const DETECT_STEP = 'step-location-detection_task';

var step;

TaskManager.defineTask(DETECT_STEP, ({ data: { locations }, error }) => {
    if (error) {
        // TODO: Error handling
        return;
    }

    if (locations) {
        if (isPointWithinRadius(locations[0].coords, step, 30)) {
            Vibration.vibrate(1000);
            AsyncStorage.setItem(DETECTED, 'true');
        }
    }
});

const startLocationTask = s => {
    step = s;
    Location.startLocationUpdatesAsync(DETECT_STEP, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 500,
        showsBackgroundLocationIndicator: true
    });
};

const stopLocationTask = async () =>
    Location.hasStartedLocationUpdatesAsync(DETECT_STEP).then(x => {
        if (x) return Location.stopLocationUpdatesAsync(DETECT_STEP);
    });

export { DETECTED, DETECT_STEP, startLocationTask, stopLocationTask };
