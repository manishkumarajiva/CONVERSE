import { useState } from 'react';
import { Form, FormControl, Button, Image } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ChatLoader from '../loader/ChatLoader';
import { toast } from 'react-toastify';
import { FetchAllChats, AccessChats } from './APIs';
import { ChatState } from '../context/ChatProvider';
import logo from '../assests/converse.png';
import UserList from '../components/user/UserList';
import Loader from '../loader/Loader';
import "./XCSS.css";


function SideDrawer({show, drawerHandler}) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);

  const {chats, setChats, selectedChat, setSelectedChat} = ChatState();

  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  }

  const searchChatHandler = (e) => {
    e.preventDefault();

    if(!search){
      toast.warning('Please enter something');
      return;
    }

    try {
      setLoading(true);
      const searchChat = async () => {
        const response = await FetchAllChats(search);
        (response) ? setSearchResult(response.data) : setSearchResult([]);
        setLoading(false);
      }
      searchChat();
      
    } catch (error) {
      toast.error('Failed To Load');
      console.log("FAILED TO LOAD SEARCH :: ", error.message)
    }
  }


  const AccessChat = (userId) => {
    try {
      setLoadingChat(true);

      const accessChats = async() => {
        const response = await AccessChats(userId);
        console.log(Array.isArray(chats),'ppp')
        if(!chats.find(chat => chat._id === response._id)) setChats([response, ...chats]);
        setSelectedChat(response);
        setLoadingChat(false);
        drawerHandler();
      }
      accessChats();
    } catch (error) {
      toast.error('Failed Access Chat');
      console.error("ACCESS CHAT : ", error.message);
    }
  }

  return (
      <Offcanvas show={show} onHide={drawerHandler} style={{width:'500px'}}>
        <Offcanvas.Header className='d-flex justify-content-between'>
            <Image className='w-75' src={logo}/> 
            <span onClick={drawerHandler} id='close' role='button' tabIndex='0' className='px-2 text-center fw-bold fs-5 text-dark border border-5 border-start-0 border-end-0 border-info rounded-pill'> &#10005; </span>
        </Offcanvas.Header>
        <Offcanvas.Body> 
          <Form onSubmit={searchChatHandler} className='d-flex mb-4'>
          <FormControl
            type="text"
            name='search'
            value={search}
            onChange={searchInputHandler}
            placeholder="search users"
            style={{ width: "300px" }}
            className="rounded-pill border border-primary shadow-none me-2 "
          />
          <Button type='submit' className='rounded-circle border-0 p-2 bg-info'> GO </Button>
          <Button variant=''> { loadingChat && <Loader></Loader>}  </Button>
          </Form>
  
          {loading ? (<ChatLoader></ChatLoader>) : (<UserList users={searchResult} onAccessChat={AccessChat}></UserList>)}
        </Offcanvas.Body>
      </Offcanvas>
  );
}

export default SideDrawer;