import React from 'react'
import Testimony from '../components/services/testimony/Testimony'
import Donation from '../components/services/donation/Donation'
import Scanner from '../components/services/scanner/Scanner'
import YGallery from '../components/services/yGallery/YGallery'
import YStory from '../components/services/yStory/YStory'
import MyYugaLibrary from '../components/services/myYugaLibrary/MyYugaLibrary'
import LearnHanumanChalisa from '../components/services/learnHanumanChalisa/LearnHanumanChalisa'

function ServicesPage() {
  return (
    <>
    <Testimony/>
    <Donation/>
    <Scanner/>
    <YGallery/>
    <YStory/>
    <MyYugaLibrary/>
    <LearnHanumanChalisa/>
    </>
  )
}

export default ServicesPage