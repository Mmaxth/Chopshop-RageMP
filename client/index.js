mp.events.addProc('GetVehicleClassAndMoney', (player, chopshopID) => {
                let vehicle = mp.players.local.vehicle;
                let vehClass = vehicle.getClass();
                mp.events.callRemote('ChopVehicle', vehicle, vehClass, chopshopID);
});