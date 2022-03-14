const aboutText = document.querySelector('.about-container') 
const iconicShows = document.querySelector('.iconic-container')

const loadDiv = (entry,observer)=>{
      entry.forEach((entrada)=>{
          if(entrada.isIntersecting) {
              entrada.target.classList.add('visible')
          }else {
            entrada.target.classList.remove('visible')
          }
      })
}

const observer = new IntersectionObserver(loadDiv,{
    root:null,
    rootMargin:'0px 0px 0px 0px ',
    threshold:0.5
})

observer.observe(aboutText)
observer.observe(iconicShows) 


//CAROUSEL

const buttons = document.querySelectorAll('[data-carousel-button]')

buttons.forEach(button =>{
    button.addEventListener('click',()=>{
      //buttons change img
      const offset = button.dataset.carouselButton === 'next' ? 1 : -1
      console.log(offset)
      //ul
      const slides = button.closest('[data-carousel]').querySelector('[data-slides]')
      //from ul/slides select li with atrr [data-active]
      const activeslide = slides.querySelector('[data-active]')

      let newIndex = [...slides.children].indexOf(activeslide) + offset
      console.log(newIndex)
      if(newIndex < 0) newIndex = slides.children.length -=1
      //after click the last img, return to 0 index of slides array making a loop
      if(newIndex >= slides.children.length) newIndex = 0

      slides.children[newIndex].dataset.active = true 
      delete activeslide.dataset.active
    })
})


//NAV TO MATCH GAME 
const menuBtn = document.querySelector('.menu-bars')
const matchGameMenu = document.querySelector('.nav-matchgame')

menuBtn.addEventListener('click',()=>{
  matchGameMenu.classList.toggle('visible-menu')
})