import Header from './header/Header.jsx'
import Sidebar from './sidebar/Sidebar.jsx'
import Main from './main/Main.jsx'
import Footer from './footer/Footer.jsx'
function App() {
//  https://wcpwzxwmnbkecdunosgk.supabase.co/1uotes

  return (
    <div className='app-layout'>
       <Header />
       <Sidebar />
       <Main />
       <Footer />
    </div>
  )
}

export default App