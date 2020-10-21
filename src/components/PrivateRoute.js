import React from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';

export default function PrivateRoute() {
  return (
    <div className="row">
      {/* <TwitchEmbed
        channel="notayogilee"
        id="notayogilee"
        height="100%"
        muted
        onVideoPause={() => console.log(':(')}
      /> */}
      {/* <TwitchChat channel="notayogilee" theme="light" /> */}
      {/* <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" parent={['mycoolsite.com, anotherawesomesite.net']} /> */}
      <div className="container">
        <h4>Next live class on Monday at 6pm</h4>
        <TwitchPlayer
          channel="notayogilee"
          id="notayogilee"
          // height="60vh"
          allowFullScreen="true"
          overflow="hidden"

        />
      </div>
    </div>
  )
}
