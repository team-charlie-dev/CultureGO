import Logo from "../../Components/icons/tag-page-icons/Logo.svg"

export default function TagCard({image, text, xPosition, yPosition, clicked, handleClick}) {

  const clickedStyle = 'opacity-50 scale-[1.4]' 
  const clickedLogoStyle = 'opacity-100'

  return (
    <div className = 'overflow-hidden flex items-center justify-center' onClick={handleClick}>
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: `${xPosition}`, backgroundPositionY: `${yPosition}` }}
        className={`transition-all duration-500 w-full h-full ${clicked ? clickedStyle : ''}`}>
      </div>
      <div className={`transition-all duration-500 ${clicked ? '' : ''} absolute`}>
        <p className={`text-white font-inriaSans italic ${clicked ? '' : 'bg-black bg-opacity-50 rounded-full'} transition-all duration-500 px-3`}>{text}</p>
        <img src = {Logo} className={`${clicked ? clickedLogoStyle : 'opacity-0'} transition-all duration-500 mx-auto`} alt = 'Lightning-Logo'/>
      </div>
    </div>
  )
}

