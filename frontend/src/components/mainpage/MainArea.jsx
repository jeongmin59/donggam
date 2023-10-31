import Sidebuttons from './SideButtons';
import UserLocation from './UserLocation';

const MainArea = ({otherUserInfo}) => {
  return(
    <>
      <div className='mainArea flex-column justify-center ' style={{ height: 'calc(100% - 280px)' }}>
        <Sidebuttons />
        <UserLocation otherUserInfo={otherUserInfo}/>
      </div>  
    </>
  )
}
export default MainArea;