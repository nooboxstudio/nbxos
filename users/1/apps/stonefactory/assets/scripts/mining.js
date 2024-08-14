/*############################################ OBTENÇÃO DE RECURSOS ############################################################### */

function mining(){ 

    if(tool == 0 || tool == ''){
        cobblestone += 1; // Adiciona 1 ao valor atual de stone
        localStorage.setItem('cobblestone', cobblestone); // Salva o novo valor de stone no localStorage
        document.getElementById('cobblestone').textContent = cobblestone; // Atualiza o texto na página com o novo valor de stone
       }

   if(tool == 1){
    cobblestone += 2;
    localStorage.setItem('cobblestone', cobblestone);
    document.getElementById('cobblestone').textContent = cobblestone;
   }

   if(tool == 2){
    cobblestone += 5;
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 0.5; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron; 
   }

   if(tool == 3){
    cobblestone += 10;
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 1; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 0.5; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin; 
   }
  }
function updateResources() {
   if(tool == 4){
    cobblestone += 15;
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 5; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 1; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 0.5; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 
   }

   if(tool == 5){
    cobblestone += 25;
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 10; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 5; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 1; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 0.5; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead; 
   }

   if(tool == 6){
    cobblestone += 35;
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 15; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 10; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 5; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 1; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 0.5; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc; 
   }

   if(tool == 7){
    cobblestone += 50; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 25; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 15; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 10; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper;  

    rawLead += 5; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 1; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 0.5; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel; 
   }

   if(tool == 8){
    cobblestone += 75; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 50; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 25; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 15; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 10; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 5; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 1; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 0.5; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;
   }

   if(tool == 9){
    cobblestone += 100; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 75; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 50; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 25; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper;  

    rawLead += 15; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 10; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 5; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 1; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 0.5; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;
   }


   if(tool == 10){
    cobblestone += 150; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 100; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 75; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 50; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 25; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 15; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 10; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 5; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 1; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 0.5; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;
   }

   if(tool == 11){
    cobblestone += 200; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 150; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 100; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 75; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 50; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 25; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 15; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 10; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 5; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 1; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 0.5; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;
   }

   if(tool == 12){
    cobblestone += 250; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 200; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 150; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 100; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 75; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 50; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 25; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 15; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 10; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 5; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 1; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;

    rawObsidian += 0.5; 
    localStorage.setItem('rawObsidian', rawObsidian); 
    document.getElementById('rawObsidian').textContent = rawObsidian;
   }

   if(tool == 13){
    cobblestone += 350; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 250; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 200; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 150; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 10; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 75; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 50; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 25; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 15; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 100; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 5; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;

    rawObsidian += 1; 
    localStorage.setItem('rawObsidian', rawObsidian); 
    document.getElementById('rawObsidian').textContent = rawObsidian;
   }

   if(tool == 14){
    cobblestone += 500; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 350; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 250; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 200; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 150; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 100; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 75; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 50; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 25; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 15; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 10; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;

    rawObsidian += 5; 
    localStorage.setItem('rawObsidian', rawObsidian); 
    document.getElementById('rawObsidian').textContent = rawObsidian;
   }

   if(tool == 15){
    cobblestone += 750; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 500; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 350; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 250; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 200; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 150; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 100; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 75; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 50; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 25; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 15; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;

    rawObsidian += 10; 
    localStorage.setItem('rawObsidian', rawObsidian); 
    document.getElementById('rawObsidian').textContent = rawObsidian;
   }
   if(tool == 16){
    cobblestone += 1000; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 750; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 500; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 350; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 250; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 200; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 150; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 100; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 75; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 50; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 25; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;

    rawObsidian += 15; 
    localStorage.setItem('rawObsidian', rawObsidian); 
    document.getElementById('rawObsidian').textContent = rawObsidian;
   }

   if(tool == 17){
    cobblestone += 1250; 
    localStorage.setItem('cobblestone', cobblestone); 
    document.getElementById('cobblestone').textContent = cobblestone; 

    rawIron += 1000; 
    localStorage.setItem('rawIron', rawIron); 
    document.getElementById('rawIron').textContent = rawIron;

    rawTin += 750; 
    localStorage.setItem('rawTin', rawTin); 
    document.getElementById('rawTin').textContent = rawTin;
    
    rawCopper += 500; 
    localStorage.setItem('rawCopper', rawCopper); 
    document.getElementById('rawCopper').textContent = rawCopper; 

    rawLead += 350; 
    localStorage.setItem('rawLead', rawLead); 
    document.getElementById('rawLead').textContent = rawLead;
    
    rawZinc += 250; 
    localStorage.setItem('rawZinc', rawZinc); 
    document.getElementById('rawZinc').textContent = rawZinc;

    rawNickel += 200; 
    localStorage.setItem('rawNickel', rawNickel); 
    document.getElementById('rawNickel').textContent = rawNickel;
    
    rawGold += 150; 
    localStorage.setItem('rawGold', rawGold); 
    document.getElementById('rawGold').textContent = rawGold;

    rawPlatinum += 100; 
    localStorage.setItem('rawPlatinum', rawPlatinum); 
    document.getElementById('rawPlatinum').textContent = rawPlatinum;

    rawDiamond += 75; 
    localStorage.setItem('rawDiamond', rawDiamond); 
    document.getElementById('rawDiamond').textContent = rawDiamond;

    rawEmerald += 50; 
    localStorage.setItem('rawEmerald', rawEmerald); 
    document.getElementById('rawEmerald').textContent = rawEmerald;

    rawObsidian += 25; 
    localStorage.setItem('rawObsidian', rawObsidian); 
    document.getElementById('rawObsidian').textContent = rawObsidian;
   }

}

// Atualizar os recursos a cada segundo
setInterval(updateResources, 1000); // 1000 milissegundos = 1 segundo


function miningAllStart() {
    temporizador = setInterval(function() {
        miningAll();
    }, 1000); // Intervalo de execução em milissegundos (neste caso, a cada 1000ms ou 1 segundo)
  }
  
  function miningAllEnd() {
    clearInterval(temporizador);
  }

  function miningAll(){
    mining();
  }
