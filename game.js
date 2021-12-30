const textElement = document.getElementById('text');
const optionButtonElement = document.getElementById('option-buttons');

let state= {}; // main state object

const startGame = () => {   
    state = {}
    showTextNode(1);
}

const showTextNode = (textNodeIndex)=>{
    const texts = textNodes.find(textNode => textNode.id === textNodeIndex );
    textElement.innerText  = texts.text;

    // removing all the options 
    while(optionButtonElement.firstChild){
        optionButtonElement.removeChild(optionButtonElement.firstChild);
    }
    // getting the answer buttons
    texts.options?.forEach(option=>{
        if(showOption(option)){
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', ()=>{
                selectOption(option);
            })
            optionButtonElement.appendChild(button);
        }
    })
}

const showOption = (option)=>{
    return option.requiredState == null || option.requiredState(state)
}

const selectOption = (option)=>{
    const nextTextNodeId = option.nextText;
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and see a jar of blue goo near you',
        options:[
            {
                text: 'Take the goo',
                setState: {
                    blueGoo : true
                },
                nextText: 2
            },
            {
                text: 'Leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You are a beast',
        options:[
            {
                text:'trade the beast for a good',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, sword: true},
                nextText: 3
            },
            {
                
                text:'trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: {blueGoo: false, shield: true},
                nextText: 3
                
            },
            {
                
                text:'Ignore the beast',
                nextText: 3
                
            }
        ]
    }
]

startGame();

