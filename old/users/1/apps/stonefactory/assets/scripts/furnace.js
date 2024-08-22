/*#################################### FURNACE ############################################### */

function smeltStone(){
    if(cobblestone >= 1){
        cobblestone = cobblestone - 1;
        localStorage.setItem('cobblestone', cobblestone);
        document.getElementById('cobblestone').textContent = cobblestone;

        stone = stone + 1;
        localStorage.setItem('stone', stone);
        document.getElementById('stone').textContent = stone;
       }else{
       }
}


function smeltIron(){
    if(rawIron >= 1){
        rawIron = rawIron - 1;
        localStorage.setItem('rawIron', rawIron);
        document.getElementById('rawIron').textContent = rawIron;

        ironIngot = ironIngot + 1;
        localStorage.setItem('ironIngot', ironIngot);
        document.getElementById('ironIngot').textContent = ironIngot;
       }else{
       }
} 


function smeltTin(){
    if(rawTin >= 1){
        rawTin = rawTin - 1;
        localStorage.setItem('rawTin', rawTin);
        document.getElementById('rawTin').textContent = rawTin;

        tinIngot = tinIngot + 1;
        localStorage.setItem('tinIngot', tinIngot);
        document.getElementById('tinIngot').textContent = tinIngot;
       }else{
       }
} 


function smeltCopper(){
    if(rawCopper >= 1){
        rawCopper = rawCopper - 1;
        localStorage.setItem('rawCopper', rawCopper);
        document.getElementById('rawCopper').textContent = rawCopper;

        copperIngot = copperIngot + 1;
        localStorage.setItem('copperIngot', copperIngot);
        document.getElementById('copperIngot').textContent = copperIngot;
       }else{
       }
} 


function smeltLead(){
    if(rawLead >= 1){
        rawLead = rawLead - 1;
        localStorage.setItem('rawLead', rawLead);
        document.getElementById('rawLead').textContent = rawLead;

        leadIngot = leadIngot + 1;
        localStorage.setItem('leadIngot', leadIngot);
        document.getElementById('leadIngot').textContent = leadIngot;
       }else{
       }
} 


function smeltZinc(){
    if(rawZinc >= 1){
        rawZinc = rawZinc - 1;
        localStorage.setItem('rawZinc', rawZinc);
        document.getElementById('rawZinc').textContent = rawZinc;

        zincIngot = zincIngot + 1;
        localStorage.setItem('zincIngot', zincIngot);
        document.getElementById('zincIngot').textContent = zincIngot;
       }else{
       }
} 


function smeltNickel(){
    if(rawNickel >= 1){
        rawNickel = rawNickel - 1;
        localStorage.setItem('rawNickel', rawNickel);
        document.getElementById('rawNickel').textContent = rawNickel;

        nickelIngot = nickelIngot + 1;
        localStorage.setItem('nickelIngot', nickelIngot);
        document.getElementById('nickelIngot').textContent = nickelIngot;
       }else{
       }
} 

function smeltGold(){
    if(rawGold >= 1){
        rawGold = rawGold - 1;
        localStorage.setItem('rawGold', rawGold);
        document.getElementById('rawGold').textContent = rawGold;

        goldIngot = goldIngot + 1;
        localStorage.setItem('goldIngot', goldIngot);
        document.getElementById('goldIngot').textContent = goldIngot;
       }else{
       }
}

function smeltPlatinum(){
    if(rawPlatinum >= 1){
        rawPlatinum = rawPlatinum - 1;
        localStorage.setItem('rawPlatinum', rawPlatinum);
        document.getElementById('rawPlatinum').textContent = rawPlatinum;

        platinumIngot = platinumIngot + 1;
        localStorage.setItem('platinumIngot', platinumIngot);
        document.getElementById('platinumIngot').textContent = platinumIngot;
       }else{
       }
}

function polishDiamond(){
    if(rawDiamond >= 1){
        rawDiamond = rawDiamond - 1;
        localStorage.setItem('rawDiamond', rawDiamond);
        document.getElementById('rawDiamond').textContent = rawDiamond;

        diamond = diamond + 1;
        localStorage.setItem('diamond', diamond);
        document.getElementById('diamond').textContent = diamond;
       }else{
       }
}

function polishEmerald(){
    if(rawEmerald >= 1){
        rawEmerald = rawEmerald - 1;
        localStorage.setItem('rawEmerald', rawEmerald);
        document.getElementById('rawEmerald').textContent = rawEmerald;

        emerald = emerald + 1;
        localStorage.setItem('emerald', emerald);
        document.getElementById('emerald').textContent = emerald;
       }else{
       }
}


function polishObsidian(){
    if(rawObsidian >= 1){
        rawObsidian = rawObsidian - 1;
        localStorage.setItem('rawObsidian', rawObsidian);
        document.getElementById('rawObsidian').textContent = rawObsidian;

        obsidian = obsidian + 1;
        localStorage.setItem('obsidian', obsidian);
        document.getElementById('obsidian').textContent = obsidian;
       }else{
       }
}



function smeltAllStart() {
    temporizador = setInterval(function() {
      smeltAll();
    }, 1000); // Intervalo de execução em milissegundos (neste caso, a cada 1000ms ou 1 segundo)
  }
  
  function smeltAllEnd() {
    clearInterval(temporizador);
  }
  


function smeltAll() {
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