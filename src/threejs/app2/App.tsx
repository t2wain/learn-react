import React, { useRef, useEffect } from 'react'
// import { init } from './scene-setup'
import { init } from "./main";

export default function App() {
    var mount = useRef<HTMLDivElement>(null);
    useEffect(() => init(mount.current), []);
    return (
        <div ref={mount} />
    )
  }