const TargetText = 'Xenophanes';
const TargetKey = 'Eleatics';
const Bin_TargetText = [];
const Bin_TargetKey = [];
Dec2Bin(TargetText, Bin_TargetText);
Dec2Bin(TargetKey, Bin_TargetKey);
// Test(TargetKey);
// function Test(TargetKey){
//     for(let i=0; i<TargetKey.length; i++){
//         console.log(TargetKey.charCodeAt(i).toString(16));
//     }
// }
console.log(Bin_TargetKey);
const encrypted = Encryptor(Bin_TargetText, Bin_TargetKey);
function Dec2Bin(Text, Array){
    for (let i=0; i<Text.length; i++){
        Array[i] = Text.charCodeAt(i).toString(2);
    }
}
function Bin2Hex(Array){
    const Converted = [];
    for (let i=0; i<Array.length; i++){
        Converted[i] = parseInt(Array[i], 2).toString(16).toUpperCase();
    }
    return Converted;
}
function Encryptor(Target, Key){
    const Encrypted = [];
    for (let i=0; i<Target.length; i++){
        Encrypted[i] = '';
        for (let j=0; j<Target[i].length; j++){
            Encrypted[i]+= Target[i][j] == Key[i%Key.length][j]? 0 : 1;
        }
    }
    return Encrypted;
}

OutputEncrypted(Bin2Hex(encrypted));
function OutputEncrypted(EncryptedHEX){
    const EncryptedContainer = document.querySelector('.shiper');
    let i = 0;
    for (let child of EncryptedContainer.children){
     child.textContent = EncryptedHEX[i++];
}
}

const input = document.querySelector('.key-area');
const DecryptArea = document.querySelector('.Decrypt');
function GetKey(){
    let i = 0, key = [];
    for (let item of input.children){
        if (item.children[0].value.length > 0){
            key[i++] = parseInt(item.children[0].value,16).toString(2);
        }
        else{
            return;
        }
    }
    for (let i=0; i<key.length; i++){
        let keyELEM = key[i].split("").reverse().join('');
        for (let j=keyELEM.length; j<7; j++){
            keyELEM+='0';
        }
        key[i] = keyELEM.split("").reverse().join('');
    }
    Decrypt(encrypted, key);
}

function Decrypt(EncryptedText, Key){
    let Decrypted = [], k=0;
    for (let i=0; i<EncryptedText.length; i++){
        Decrypted[i] = '';
        for (let j = 0; j<EncryptedText[i].length; j++){
            Decrypted[i]+= EncryptedText[i][j] == Key[i%Key.length][j]? '0' : '1';
        }
    }
    for (let item of DecryptArea.children){
        item.textContent = String.fromCharCode(parseInt(Decrypted[k++],2));
    }
}

let CalcTarget = null;
const Hex = document.getElementById('Hex');
const Bin = document.getElementById('Bin');
const Char = document.getElementById('Char');
function Calc(){
    let Type = CalcTarget.id;
    console.log(Type);
    switch (Type){
        case 'Hex':
        let bin = parseInt(CalcTarget.value,16).toString(2).split("").reverse().join("");
        while (bin.length<7){
            bin+=0;
        }
        Bin.value = bin.split("").reverse().join("");
        Char.value = String.fromCharCode(parseInt(CalcTarget.value,16));
        break;

        case 'Bin':
            Hex.value = parseInt(CalcTarget.value,2).toString(16);
            Char.value = String.fromCharCode(parseInt(CalcTarget.value,2));
            break;
        
        case 'Char':
            Hex.value = CalcTarget.value.charCodeAt(0).toString(16);
            Bin.value = CalcTarget.value.charCodeAt(0).toString(2);
    }
}
