import React from 'react'

import Card from './card'

const songs = [
  {
    title: "Shape of You",
    description: "Ed Sheeran - ÷ (Divide)",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
  },
  {
    title: "Blinding Lights",
    description: "The Weeknd - After Hours",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  },
  {
    title: "Dance Monkey",
    description: "Tones and I - The Kids Are Coming",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f5",
  },
];

export default function ListCards() {
  return (
    <div>
      {songs.map((song, index) => (
          <Card 
            key={index}
            title={song.title}
            description={song.description}
            imageUrl={song.imageUrl}
          />
        ))}
    </div>
  )
}
