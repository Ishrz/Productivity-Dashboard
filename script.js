let allElems= document.querySelectorAll('.elem')
let allFullElemPage=document.querySelectorAll('.fullElem')
let allFullElemBackBtn=document.querySelectorAll('.fullElem .back')

allElems.forEach(elem =>{
    elem.addEventListener('click', (evt)=>{
        allFullElemPage[elem.id].style.display='block'
    })

    
})

allFullElemBackBtn.forEach(elem=>{
    elem.addEventListener("click",()=>{
        // console.log(elem.id)
    allFullElemPage[elem.id].style.display='none'
    })
})

