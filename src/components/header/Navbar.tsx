"use client"

import Link from "next/link"
import module from "./header.module.css";
import { GrTechnology } from "react-icons/gr";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { IoClose } from "react-icons/io5";

function Navbar() {
  
  const [toggle, setToggle] = useState(false);
  
  return (
    <nav className={module.navbar}>
      <div >
        <Link href={'/'} className={module.logo}>
          CLOUD
          <GrTechnology/>
          HOSTING
        </Link>
        <div className={module.menu} onClick={()=> setToggle(prev => !prev)}>
          {toggle ? <IoClose/> : <SlMenu/>}
        </div>
      </div>
      <div className={module.navLinksWrapper}
      style={{
        clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""
      }}>
        <ul  className={module.navlinks}>
          <Link onClick={() => setToggle(false)} className={module.navlink} href={'/'}>Home</Link>
          <Link onClick={() => setToggle(false)} className={module.navlink} href={'/articles'}>Articles</Link>
          <Link onClick={() => setToggle(false)} className={module.navlink} href={'/about'}>About</Link>
          <Link onClick={() => setToggle(false)} className={module.navlink} href={'/admin'}>Admin Dasboard</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar