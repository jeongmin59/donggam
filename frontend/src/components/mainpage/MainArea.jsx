import Sidebuttons from './SideButtons';
import UserLocation from './UserLocation';

const MainArea = ({aroundPeople}) => {
  return(
    <>
      <div className='mainArea flex-column justify-center ' style={{ height: 'calc(100% - 280px)' }}>
        <Sidebuttons />
        <UserLocation aroundPeople={aroundPeople}/>
      </div>  
    </>
  )
}
export default MainArea;