let chopScript = require('../script/chopshop.js');

mp.events.add('ChopVehicle', (player, vehicle, vehClass, chopshopID) => {
    setTimeout(() => {
        console.log(vehClass);
        console.log(chopshopID);
        var minMoney;
        var maxMoney;
        var money;
        if(vehClass === 2) 
        {
            player.outputChatBox("Your vehicle is being chopped. Please wait...."); 
            chopScript.updateChopInUse(chopshopID);
            player.customData.chopping = true;
            minMoney = 2000;
            maxMoney = 3000;
            money = Math.floor(Math.random() * maxMoney) + minMoney;
            setTimeout(() => {
                vehicle.destroy();
                mp.events.call('chopDone', player, chopshopID, money);
            }, 5000);
        }
        else if(vehClass === 14 || vehClass === 15 || vehClass === 16 || vehClass === 17 || vehClass === 18 || vehClass === 19 || vehClass === 21) 
        {
            player.outputChatBox("This vehicle cant be chopped, sorry!"); 
            return;
        }
        else if(vehClass === 1){
            player.outputChatBox("Your vehicle is being chopped. Please wait...."); 
            chopScript.updateChopInUse(chopshopID);
            player.customData.chopping = true;
            minMoney = 1200;
            maxMoney = 2000;
            money = Math.floor(Math.random() * maxMoney) + minMoney;
            setTimeout(() => {
                vehicle.destroy();
                mp.events.call('chopDone', player, chopshopID, money);
            }, 5000);
        }
        else if(vehClass === 3){
            player.outputChatBox("Your vehicle is being chopped. Please wait...."); 
            chopScript.updateChopInUse(chopshopID);
            player.customData.chopping = true;
            minMoney = 2100;
            maxMoney = 4000;
            money = Math.floor(Math.random() * maxMoney) + minMoney;
            setTimeout(() => {
                vehicle.destroy();
                mp.events.call('chopDone', player, chopshopID, money);
            }, 5000);
        }
        else if(vehClass === 4){
            player.outputChatBox("Your vehicle is being chopped. Please wait...."); 
            chopScript.updateChopInUse(chopshopID);
            player.customData.chopping = true;
            minMoney = 2100;
            maxMoney = 4000;
            money = Math.floor(Math.random() * maxMoney) + minMoney;
            setTimeout(() => {
                vehicle.destroy();
                mp.events.call('chopDone', player, chopshopID, money);
            }, 6000);
        }
    }, 1000);
});

mp.events.add('chopDone', (player, chopshopID, money) => {

    player.outputChatBox("Your Vehicle is chopped! You received: " + money);
    player.money += money;
    player.customData.chopping = false;
    chopScript.updateChopInUse(chopshopID);

});