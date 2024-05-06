import { useState } from 'react';
import  styles from'./home.module.css'
import { Link } from 'react-router-dom';
import svg from '../assets/search2.svg'
import Men from './men';




function Home() {

    const [helpHovering, sethelpHovering] = useState(false);
    const [menHovering, setmenHovering] = useState(false);

    const mouse_over = () => {
        sethelpHovering(true);
      };
    
      const mouse_leave = () => {
        setIsHovering(false);
      };


      const mouse_over_men = () => {
        setmenHovering(true);
      };
    
      const mouse_leave_men = () => {
        setmenHovering(false);
      };







    return (   
<>
        <div className={styles.top}>
        <span className={styles.top_nav}>



        <Link to="#" className={styles.links} onMouseOver={mouse_over} onMouseOut={mouse_leave}>   { helpHovering &&(
   
  
   
   <div className={styles.list_container}>
   <h2 className={styles.header_2}>Help</h2>
           <ul className={styles.list}>
            <Link to="#" className={styles.list_link1}><li>Order Status</li> </Link>
            <Link to="#" className={styles.list_link2}>      <li>Delivery</li> </Link>
            <Link to="#" className={styles.list_link3}>    <li>Returns</li> </Link>
            <Link to="#" className={styles.list_link4}>      <li>Contact Us</li> </Link>

         </ul> 
         </div>)


}
  Help 
        
        
            </Link>
        
        
          &nbsp;&nbsp;&nbsp;
      
        
  
          |&nbsp;&nbsp;&nbsp;
         <Link to="#"  className={styles.link}> Join</Link> &nbsp;&nbsp;&nbsp;
          |&nbsp;&nbsp;&nbsp;&nbsp;
         <Link to="#" className={styles.link}> Sign in</Link> &nbsp;&nbsp;&nbsp;
        </span>
      </div>


     <div>
      
      <span className={styles.product_nav}>

<Link to='#'  className={styles.men} onMouseOver={mouse_over_men} onMouseOut={mouse_leave_men}>

  
  Men</Link>
<Link to='#' className={styles.women}>Women</Link>
<Link to='#' className={styles.kid}> Kid</Link>
<Link to='#' className={styles.sports}>Sports</Link>
<Link to='#' className={styles.brand}>Brand</Link>

<input type='text' className={styles.search} />
<img src={svg} alt='image' className={styles.image_search}/>

</span>
      </div> 

<div className={styles.quotes}>
<p className={styles.quote} > Time For Take Risk </p>
</div>

      </>
     );
}

export default Home;