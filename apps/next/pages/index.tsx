/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { HomeScreen } from 'app/features/home/screen'

export default function Home() {
  return (
    <>
      <div style={{ position: 'absolute', width: '100%' }}>
        <picture>
          <source media="(max-width: 485px)" srcSet="/bg-mobile-light.jpg" width='100%' />
          <img src='/bg-desktop-light.jpg' width='100%' alt='hero' style={{ height: 'max(30vh, 250px)', objectFit: 'cover' }}  />
        </picture>
      </div>
      <HomeScreen />
    </>
  )
}


