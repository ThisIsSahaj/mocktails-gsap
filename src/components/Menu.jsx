'use client'
import { useRef, useState } from 'react';
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Menu = () => {

  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {

    // title animation
    gsap.fromTo('#title',

      // from
      {
        opacity: 0,
      },
      // to
      {
        opacity: 1,
        duration: 1
      }
    )

    // image animation
    gsap.fromTo('.cocktail img', {
      opacity: 0,
      xPercent: -100   //from out of screen
    },
      {
        xPercent: 0,  //to center
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut'
      })


    // details animation
    gsap.fromTo('.details h2, p', {
      yPercent: 100,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 100,
      ease: 'power1.inOut'
    })



  }, [currentIndex]) // whenever cuurentIndex changes, animation will re-run

  const totalCocktails = sliderLists.length;


  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    // E.g = (1 + 4)%4 = 1 -> therefore take me to index 1 element

    setCurrentIndex(newIndex)
  }


  // to get image of cocktail
  const getCocktailAt = (indexOffSet) => {
    return sliderLists[(currentIndex + indexOffSet + totalCocktails) % totalCocktails]
  }

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);


  return (
    <section id='menu' aria-labelledby='menu-heading'>
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id='m-left-leaf' />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id='m-right-leaf' />

      <h2 id='menu-heading' className='sr-only'>
        Cocktail Menu
      </h2>

      <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
        {sliderLists.map((cocktail, index) => {

          // check which tab is active
          const isActive = index === currentIndex;

          return (
            <button key={cocktail.id} className={`
            ${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}
            `}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          )
        })}

      </nav>

      <div className='content '>


        {/* Arrows */}
        <div className='arrows'>
          <button className='text-left' onClick={() => goToSlide(currentIndex - 1)}>
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden='true' />
          </button>

          <button className='text-left' onClick={() => goToSlide(currentIndex + 1)}>
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden='true' />
          </button>
        </div>

        {/* Cocktail Image */}
        <div className='cocktail'>
          <img src={currentCocktail.image} className='object-contain' />
        </div>

        <div className='recipe'>
          <div ref={contentRef} className='info'>
            <p>Recipe for:</p>
            <p id='title'>{currentCocktail.name}</p>
          </div>

          <div className='details'>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>

          </div>

        </div>




      </div>


    </section>
  )
}

export default Menu