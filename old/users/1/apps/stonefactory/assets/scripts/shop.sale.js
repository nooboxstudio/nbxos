/*############################################ VENDA DE RECURSOS ############################################################### */
function saleCobblestone(){
    if(cobblestone >= 1){
     money = money + cobblestone;
     cobblestone = 0; 
 
     localStorage.setItem('money', money); // Salva o novo valor de money no localStorage
     let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
     document.getElementById('money').textContent = formattedMoney; // Atualiza o texto na página com o novo valor do money
     
 
     localStorage.setItem('cobblestone', cobblestone);
     document.getElementById('cobblestone').textContent = cobblestone;
     
    }
 }
 
 
 function saleRawIron(){
 if(rawIron >= 1){
         money = money + (rawIron * 3);
         rawIron = 0; 
 
        localStorage.setItem('money', money); // Salva o novo valor de money no localStorage
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney; // Atualiza o texto na página com o novo valor do money
 
         localStorage.setItem('rawIron', rawIron);
         document.getElementById('rawIron').textContent = rawIron;
    }
 }
 
 function saleRawTin(){
     if(rawTin >= 1){
         money = money + (rawTin * 3);
         rawTin = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawTin', rawTin);
         document.getElementById('rawTin').textContent = rawTin;
     }
 }
 
 function saleRawCopper(){
     if(rawCopper >= 1){
         money = money + (rawCopper * 3);
         rawCopper = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawCopper', rawCopper);
         document.getElementById('rawCopper').textContent = rawCopper;
     }
 }
 
 function saleRawLead(){
     if(rawLead >= 1){
         money = money + (rawLead * 5);
         rawLead = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawLead', rawLead);
         document.getElementById('rawLead').textContent = rawLead;
     }
 }
 
 function saleRawZinc(){
     if(rawZinc >= 1){
         money = money + (rawZinc * 5);
         rawZinc = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawZinc', rawZinc);
         document.getElementById('rawZinc').textContent = rawZinc;
     }
 }
 
 function saleRawNickel(){
     if(rawNickel >= 1){
         money = money + (rawNickel * 5);
         rawNickel = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawNickel', rawNickel);
         document.getElementById('rawNickel').textContent = rawNickel;
     }
 }
 
 function saleRawGold(){
     if(rawGold >= 1){
         money = money + (rawGold * 10);
         rawGold = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawGold', rawGold);
         document.getElementById('rawGold').textContent = rawGold;
     }
 }
 
 function salerawPlatinum(){
     if(rawPlatinum >= 1){
         money = money + (rawPlatinum * 10);
         rawPlatinum = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawPlatinum', rawPlatinum);
         document.getElementById('rawPlatinum').textContent = rawPlatinum;
     }
 }
 function saleRawDiamond(){
     if(rawDiamond >= 1){
         money = money + (rawDiamond * 50);
         rawDiamond = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawDiamond', rawDiamond);
         document.getElementById('rawDiamond').textContent = rawDiamond;
     }
 }
 function saleRawEmerald(){
     if(rawEmerald >= 1){
         money = money + (rawEmerald * 50);
         rawEmerald = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawEmerald', rawEmerald);
         document.getElementById('rawEmerald').textContent = rawEmerald;
     }
 }
 function saleRawObsidian(){
     if(rawObsidian >= 1){
         money = money + (rawObsidian * 50);
         rawObsidian = 0; 
 
         localStorage.setItem('money', money);
         let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
         document.getElementById('money').textContent = formattedMoney;
 
         localStorage.setItem('rawObsidian', rawObsidian);
         document.getElementById('rawObsidian').textContent = rawObsidian;
     }
 }



 function saleStone(){
    if(stone >= 1){
        money = money + (stone * 2);
        stone = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('stone', stone);
        document.getElementById('stone').textContent = stone;
    }
}


function saleIronIngot(){
    if(ironIngot >= 1){
        money = money + (ironIngot * 6);
        ironIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('ironIngot', ironIngot);
        document.getElementById('ironIngot').textContent = ironIngot;
    }
}

function saleTinIngot(){
    if(tinIngot >= 1){
        money = money + (tinIngot * 6);
        tinIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('tinIngot', tinIngot);
        document.getElementById('tinIngot').textContent = tinIngot;
    }
}
 
function saleCopperIngot(){
    if(copperIngot >= 1){
        money = money + (copperIngot * 6);
        copperIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('copperIngot', copperIngot);
        document.getElementById('copperIngot').textContent = copperIngot;
    }
}

function saleLeadIngot(){
    if(leadIngot >= 1){
        money = money + (leadIngot * 10);
        leadIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('leadIngot', leadIngot);
        document.getElementById('leadIngot').textContent = leadIngot;
    }
}

function saleZincIngot(){
    if(zincIngot >= 1){
        money = money + (zincIngot * 10);
        zincIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('zincIngot', zincIngot);
        document.getElementById('zincIngot').textContent = zincIngot;
    }
}

function saleNickelIngot(){
    if(nickelIngot >= 1){
        money = money + (nickelIngot * 10);
        nickelIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('nickelIngot', nickelIngot);
        document.getElementById('nickelIngot').textContent = nickelIngot;
    }
}

function saleGoldIngot(){
    if(goldIngot >= 1){
        money = money + (goldIngot * 20);
        goldIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('goldIngot', goldIngot);
        document.getElementById('goldIngot').textContent = goldIngot;
    }
}

function salePlatinumIngot(){
    if(platinumIngot >= 1){
        money = money + (platinumIngot * 20);
        platinumIngot = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('platinumIngot', platinumIngot);
        document.getElementById('platinumIngot').textContent = platinumIngot;
    }
}

function saleDiamond(){
    if(diamond >= 1){
        money = money + (diamond * 100);
        diamond = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('diamond', diamond);
        document.getElementById('diamond').textContent = diamond;
    }
}

function saleEmerald(){
    if(emerald >= 1){
        money = money + (emerald * 100);
        emerald = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('emerald', emerald);
        document.getElementById('emerald').textContent = emerald;
    }
}

function saleObsidian(){
    if(obsidian >= 1){
        money = money + (obsidian * 100);
        obsidian = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('obsidian', obsidian);
        document.getElementById('obsidian').textContent = obsidian;
    }
}


function saleTierOne(){
    if(capsuleOne >= 1){
        money = money + (capsuleOne * 100);
        capsuleOne = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('capsuleOne', capsuleOne);
        document.getElementById('capsuleOne').textContent = capsuleOne;
    }
}

function saleT2(){
    if(capsuleT2 >= 1){
        money = money + (capsuleT2 * 250);
        capsuleT2 = 0; 

        localStorage.setItem('money', money);
        let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        document.getElementById('money').textContent = formattedMoney;

        localStorage.setItem('capsuleT2', capsuleT2);
        document.getElementById('capsuleT2').textContent = capsuleT2;
    }
}