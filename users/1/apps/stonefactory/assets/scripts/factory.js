/* ################################# FACTORY ######################################### */

/*T1 */
function craftIronPlate(){
    if(ironIngot >= 1){
        ironIngot = ironIngot - 1;
        localStorage.setItem('ironIngot', ironIngot);
        document.getElementById('ironIngot').textContent = ironIngot;

        ironPlate = ironPlate + 1;
        localStorage.setItem('ironPlate', ironPlate);
        document.getElementById('ironPlate').textContent = ironPlate;
       }else{
       }
}

function craftIronGear(){
    if(ironIngot >= 4){
        ironIngot = ironIngot - 4;
        localStorage.setItem('ironIngot', ironIngot);
        document.getElementById('ironIngot').textContent = ironIngot;

        ironGear = ironGear + 1;
        localStorage.setItem('ironGear', ironGear);
        document.getElementById('ironGear').textContent = ironGear;
       }else{
       }
}

function craftIronCase(){
    if(ironPlate >= 4 && ironGear >=1){
        ironPlate = ironPlate - 4;
        localStorage.setItem('ironPlate', ironPlate);
        document.getElementById('ironPlate').textContent = ironPlate;

        ironGear = ironGear - 1;
        localStorage.setItem('ironGear', ironGear);
        document.getElementById('ironGear').textContent = ironGear;
        
        ironCasing = ironCasing + 1;
        localStorage.setItem('ironCasing', ironCasing);
        document.getElementById('ironCasing').textContent = ironCasing;
       }else{
       }
}


function craftChipOne(){
    if(ironPlate >= 1){
        ironPlate = ironPlate - 1;
        localStorage.setItem('ironPlate', ironPlate);
        document.getElementById('ironPlate').textContent = ironPlate;

        chipOne = chipOne + 1;
        localStorage.setItem('chipOne', chipOne);
        document.getElementById('chipOne').textContent = chipOne;
       }else{
       }
}

function craftCapsuleOne(){
    if(ironCasing >= 1 && chipOne >=1){
        ironCasing = ironCasing - 1;
        localStorage.setItem('ironCasing', ironCasing);
        document.getElementById('ironCasing').textContent = ironCasing;

        chipOne = chipOne - 1;
        localStorage.setItem('chipOne', chipOne);
        document.getElementById('chipOne').textContent = chipOne;
        
        capsuleOne = capsuleOne + 1;
        localStorage.setItem('capsuleOne', capsuleOne);
        document.getElementById('capsuleOne').textContent = capsuleOne;
       }else{
       }
}
/*if(ironIngot >= 6){
        ironIngot = ironIngot - 6;
        localStorage.setItem('ironIngot', ironIngot);
        document.getElementById('ironIngot').textContent = ironIngot;

        capsuleOne = capsuleOne + 1;
        localStorage.setItem('capsuleOne', capsuleOne);
        document.getElementById('capsuleOne').textContent = capsuleOne;
        }*/
        function autoT1() {
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        
            function craftPlatesAndGear() {
                return Promise.all([
                    craftIronPlate(10),  // Produz 6 placas
                    delay(1000).then(() => craftIronGear())  // Atraso de 1 segundo antes de produzir a engrenagem
                ]);
            }
        
            function craftChipAndCapsule() {
                return delay(1000).then(() => Promise.all([
                    craftIronCase(),  // Produz a case
                    craftIronPlate(1),  // Produz 1 placa
                    craftChipOne(),  // Produz o chip
                    craftIronCase(),  // Produz outra case
                    craftCapsuleOne()  // Produz a cápsula
                ]));
            }
        
            return craftPlatesAndGear()
                .then(() => craftChipAndCapsule())
                .then(() => autoT1()); // Chama a função novamente para reiniciar o ciclo
        }
        
        

        
        
        
        
        



/*T2 */
function craftTinPlate(){
    if(tinIngot >= 1){
        tinIngot = tinIngot - 1;
        localStorage.setItem('tinIngot', tinIngot);
        document.getElementById('tinIngot').textContent = tinIngot;

        tinPlate = tinPlate + 1;
        localStorage.setItem('tinPlate', tinPlate);
        document.getElementById('tinPlate').textContent = tinPlate;
       }else{
       }
}

function craftTinGear(){
    if(tinIngot >= 4){
        tinIngot = tinIngot - 4;
        localStorage.setItem('tinIngot', tinIngot);
        document.getElementById('tinIngot').textContent = tinIngot;

        tinGear = tinGear + 1;
        localStorage.setItem('tinGear', tinGear);
        document.getElementById('tinGear').textContent = tinGear;
       }else{
       }
}

function craftTinCase(){
    if(tinPlate >= 4 && tinGear >=1){
        tinPlate = tinPlate - 4;
        localStorage.setItem('tinPlate', tinPlate);
        document.getElementById('tinPlate').textContent = tinPlate;

        tinGear = tinGear - 1;
        localStorage.setItem('tinGear', tinGear);
        document.getElementById('tinGear').textContent = tinGear;
        
        tinCasing = tinCasing + 1;
        localStorage.setItem('tinCasing', tinCasing);
        document.getElementById('tinCasing').textContent = tinCasing;
       }else{
       }
}


function craftChipT2(){
    if(tinPlate >= 1){
        tinPlate = tinPlate - 1;
        localStorage.setItem('tinPlate', tinPlate);
        document.getElementById('tinPlate').textContent = tinPlate;

        chipT2 = chipT2 + 1;
        localStorage.setItem('chipT2', chipT2);
        document.getElementById('chipT2').textContent = chipT2;
       }else{
       }
}

function craftCapsuleT2(){
    if(tinCasing >= 1 && chipT2 >=1){
        tinCasing = tinCasing - 1;
        localStorage.setItem('tinCasing', tinCasing);
        document.getElementById('tinCasing').textContent = tinCasing;

        chipT2 = chipT2 - 1;
        localStorage.setItem('chipT2', chipT2);
        document.getElementById('chipT2').textContent = chipT2;
        
        capsuleT2 = capsuleT2 + 1;
        localStorage.setItem('capsuleT2', capsuleT2);
        document.getElementById('capsuleT2').textContent = capsuleT2;
       }else{
       }
}