import React from 'react';
import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';
import Timer from './Timer';

export default function PrivateRoute() {

  return (
    <div className="row">
      <div className="container">
        <div className="col s12">
          <Timer />
        </div>
        <TwitchPlayer
          channel="notayogilee"
          id="notayogilee"
          height="60vh"
        />
      </div>
    </div>
  )
}
