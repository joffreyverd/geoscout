import React from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Vibration, AsyncStorage, ToastAndroid } from 'react-native';
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
        const arrived = isPointWithinRadius(locations[0].coords, step, 20);
        ToastAndroid.show(
            (step ? step.id_step : step) + ' : ' + arrived,
            ToastAndroid.SHORT
        );
        if (arrived) {
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
