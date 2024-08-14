/*DESABILITANDO OS BOTÕES*/
window.onload = function() {
    // Desabilita os botões através do ID do tool
    for (let i = tool; i >= 1; i--) {
        const lvl = document.getElementById('lvl' + i);
        if (lvl) {
            lvl.classList.add('disabled');
            lvl.disabled = true;
        }
    }

      if (localStorage.getItem('autoSmelt') === "1") {
        function autoSmeltResources() {
            smeltStone()
            smeltIron()
            smeltTin()
            smeltCopper()
            smeltLead()
            smeltZinc()
            smeltNickel()
            smeltGold()
            smeltPlatinum()
            polishDiamond()
            polishEmerald()
            polishObsidian()
        }
        
        setInterval(autoSmeltResources, 1000);
        const smelt = document.getElementById('autoSmelt');
        smelt.classList.add('disabled');
        smelt.disabled = true;
    }


    if (localStorage.getItem('autoFactoryTierOne') === "1") {
        function autoFactoryTierOneF() {
            autoT1();
        }
    
        setInterval(autoFactoryTierOneF, 1000);
        autoFactoryTierOneF(); // Chama a função uma vez imediatamente após a definição
    
        const fT1 = document.getElementById('autoFactoryTierOne');
        fT1.classList.add('disabled');
        fT1.disabled = true;
        //console.log();
    }
    


    

    // Atualiza os recursos e exibe o dinheiro formatado
    updateResources();

    
    document.getElementById('money').textContent = formattedMoney;
};



/* Economy */
let money = localStorage.getItem('money') ? parseInt(localStorage.getItem('money')) : 0;

let autoCrafting = localStorage.getItem('autoCrafting') ? parseInt(localStorage.getItem('autoCrafting')) : false;

/* Raw Itens */
let cobblestone = localStorage.getItem('cobblestone') ? parseInt(localStorage.getItem('cobblestone')) : 0;
let rawIron = localStorage.getItem('rawIron') ? parseInt(localStorage.getItem('rawIron')) : 0;
let rawTin = localStorage.getItem('rawTin') ? parseInt(localStorage.getItem('rawTin')) : 0;
let rawCopper = localStorage.getItem('rawCopper') ? parseInt(localStorage.getItem('rawCopper')) : 0;
let rawLead = localStorage.getItem('rawLead') ? parseInt(localStorage.getItem('rawLead')) : 0;
let rawZinc = localStorage.getItem('rawZinc') ? parseInt(localStorage.getItem('rawZinc')) : 0;
let rawNickel = localStorage.getItem('rawNickel') ? parseInt(localStorage.getItem('rawNickel')) : 0;
let rawGold = localStorage.getItem('rawGold') ? parseInt(localStorage.getItem('rawGold')) : 0;
let rawPlatinum = localStorage.getItem('rawPlatinum') ? parseInt(localStorage.getItem('rawPlatinum')) : 0;
let rawDiamond = localStorage.getItem('rawDiamond') ? parseInt(localStorage.getItem('rawDiamond')) : 0;
let rawEmerald = localStorage.getItem('rawEmerald') ? parseInt(localStorage.getItem('rawEmerald')) : 0;
let rawObsidian = localStorage.getItem('rawObsidian') ? parseInt(localStorage.getItem('rawObsidian')) : 0;

/* Smelting Itens */
let stone = localStorage.getItem('stone') ? parseInt(localStorage.getItem('stone')) : 0;
let ironIngot = localStorage.getItem('ironIngot') ? parseInt(localStorage.getItem('ironIngot')) : 0;
let tinIngot = localStorage.getItem('tinIngot') ? parseInt(localStorage.getItem('tinIngot')) : 0;
let copperIngot = localStorage.getItem('copperIngot') ? parseInt(localStorage.getItem('copperIngot')) : 0;
let leadIngot = localStorage.getItem('leadIngot') ? parseInt(localStorage.getItem('leadIngot')) : 0;
let zincIngot = localStorage.getItem('zincIngot') ? parseInt(localStorage.getItem('zincIngot')) : 0;
let nickelIngot = localStorage.getItem('nickelIngot') ? parseInt(localStorage.getItem('nickelIngot')) : 0;
let goldIngot = localStorage.getItem('goldIngot') ? parseInt(localStorage.getItem('goldIngot')) : 0;
let platinumIngot = localStorage.getItem('platinumIngot') ? parseInt(localStorage.getItem('platinumIngot')) : 0;
let diamond = localStorage.getItem('diamond') ? parseInt(localStorage.getItem('diamond')) : 0;
let emerald = localStorage.getItem('emerald') ? parseInt(localStorage.getItem('emerald')) : 0;
let obsidian = localStorage.getItem('obsidian') ? parseInt(localStorage.getItem('obsidian')) : 0;


/* Plates */
let ironPlate = localStorage.getItem('ironPlate') ? parseInt(localStorage.getItem('ironPlate')) : 0;
let tinPlate = localStorage.getItem('tinPlate') ? parseInt(localStorage.getItem('tinPlate')) : 0;


/* Gear */
let ironGear = localStorage.getItem('ironGear') ? parseInt(localStorage.getItem('ironGear')) : 0;
let tinGear = localStorage.getItem('tinGear') ? parseInt(localStorage.getItem('tinGear')) : 0;


/* Casing */
let ironCasing = localStorage.getItem('ironCasing') ? parseInt(localStorage.getItem('ironCasing')) : 0;
let tinCasing = localStorage.getItem('tinCasing') ? parseInt(localStorage.getItem('tinCasing')) : 0;


/* CHIP */
let chipOne = localStorage.getItem('chipOne') ? parseInt(localStorage.getItem('chipOne')) : 0;
let chipT2 = localStorage.getItem('chipT2') ? parseInt(localStorage.getItem('chipT2')) : 0;


/* Research Capsule */
let capsuleOne = localStorage.getItem('capsuleOne') ? parseInt(localStorage.getItem('capsuleOne')) : 0;
let capsuleT2 = localStorage.getItem('capsuleT2') ? parseInt(localStorage.getItem('capsuleT2')) : 0;




/*Tools*/

let tool = localStorage.getItem('tool') ? parseInt(localStorage.getItem('tool')) : 0;
let autoSmelt = localStorage.getItem('autoSmelt') ? parseInt(localStorage.getItem('autoSmelt')) : 0;
let autoFactoryTierOne = localStorage.getItem('autoFactoryTierOne') ? parseInt(localStorage.getItem('autoFactoryTierOne')) : 0;




/* GET MONEY */
let formattedMoney = money.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

document.getElementById('money').textContent = formattedMoney;

/* GET ITENS */
document.getElementById('tool').textContent = tool;

document.getElementById('cobblestone').textContent = cobblestone;
document.getElementById('rawIron').textContent = rawIron;
document.getElementById('rawTin').textContent = rawTin;
document.getElementById('rawCopper').textContent = rawCopper;
document.getElementById('rawLead').textContent = rawLead;
document.getElementById('rawZinc').textContent = rawZinc;
document.getElementById('rawNickel').textContent = rawNickel;
document.getElementById('rawGold').textContent = rawGold;
document.getElementById('rawPlatinum').textContent = rawPlatinum;
document.getElementById('rawDiamond').textContent = rawDiamond;
document.getElementById('rawEmerald').textContent = rawEmerald;
document.getElementById('rawObsidian').textContent = rawObsidian;


document.getElementById('stone').textContent = stone;
document.getElementById('ironIngot').textContent = ironIngot;
document.getElementById('tinIngot').textContent = tinIngot;
document.getElementById('copperIngot').textContent = copperIngot;
document.getElementById('leadIngot').textContent = leadIngot;
document.getElementById('zincIngot').textContent = zincIngot;
document.getElementById('nickelIngot').textContent = nickelIngot;
document.getElementById('goldIngot').textContent = goldIngot;
document.getElementById('platinumIngot').textContent = platinumIngot;
document.getElementById('diamond').textContent = diamond;
document.getElementById('emerald').textContent = emerald;
document.getElementById('obsidian').textContent = obsidian;


document.getElementById('ironPlate').textContent = ironPlate;
document.getElementById('ironGear').textContent = ironGear;
document.getElementById('ironCasing').textContent = ironCasing;
document.getElementById('chipOne').textContent = chipOne;
document.getElementById('capsuleOne').textContent = capsuleOne;

document.getElementById('tinPlate').textContent = tinPlate;
document.getElementById('tinGear').textContent = tinGear;
document.getElementById('tinCasing').textContent = tinCasing;
document.getElementById('chipT2').textContent = chipT2;
document.getElementById('capsuleT2').textContent = capsuleT2;




/* Game Settings */
function resetProgress() {
    localStorage.clear();
    location.reload();
}

