let allElems= document.querySelectorAll('.elem')
let allFullElem=document.querySelectorAll('.fullElem')
let allFullElemBackBtn=document.querySelectorAll('.fullElem .back')

allElems.forEach(elem =>{
    elem.addEventListener('click', (evt)=>{
        allFullElem[elem.id].style.display='block'
    })

    
})

allFullElemBackBtn.forEach(elem=>{
    elem.addEventListener("click",()=>{
        // console.log(elem.id)
    allFullElem[elem.id].style.display='none'
    })
})

// allFullElemBackBtn.addEventListener('click',()=>{
//     console.log(back)
// })