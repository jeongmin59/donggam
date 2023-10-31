import Sidebuttons from './SideButtons';
import UserLocation from './UserLocation';

const MainArea = ({userCharacters}) => {
  return(
    <>
      <div className='mainArea flex-column justify-center ' style={{ height: 'calc(100% - 280px)' }}>
        <Sidebuttons />
        <UserLocation userCharacters={userCharacters}/>
      </div>  
    </>
  )
}
export default MainArea;