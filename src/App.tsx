import Navbar from '../src/components/Navbar'
import Text from './components/Tetxt'
import CardGrid from './components/CardGrid'

function App() {

  return (
    <div className='h-screen bg-[#282828] relative z-0 pt-16'>
      <Navbar />
      <Text text='My Vehicles'/>
      <CardGrid />
    </div>
  )
}

export default App
